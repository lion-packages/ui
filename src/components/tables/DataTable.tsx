import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
    useTable,
    tableFeatures,
    columnFilteringFeature,
    globalFilteringFeature,
    rowPaginationFeature,
    rowSelectionFeature,
    rowSortingFeature,
    createFilteredRowModel,
    createPaginatedRowModel,
    createSortedRowModel,
    filterFn_includesString,
    type ColumnDef,
    type SortingState,
} from "@tanstack/react-table";
import {
    Table,
    Form,
    InputGroup,
    Pagination,
    Row,
    Col,
} from "react-bootstrap";
import { InputTypes } from "../../types/InputTypes.tsx";
import BootstrapInput from "../inputs/BootstrapInput.tsx";
import {BootstrapInputStyleTypes} from "../../types/Web/BootstrapInputStyleTypes.tsx";
import {BootstrapInputShapeTypes} from "../../types/Web/BootstrapInputShapeTypes.tsx";

const EMPTY_ARRAY: any[] = [];
const EMPTY_OBJECT: Record<string, any> = {};

const features = tableFeatures({
    columnFilteringFeature,
    globalFilteringFeature,
    rowSortingFeature,
    rowPaginationFeature,
    rowSelectionFeature,
    filteredRowModel: createFilteredRowModel(),
    sortedRowModel: createSortedRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
    filterFns: {
        includesString: filterFn_includesString,
    },
});

export interface DataTableProps<TData> {
    id?: string;
    columns?: ColumnDef<TData, any>[];
    getRowId?: (row: TData) => string;
    selectable?: boolean;
    onSelectionChange?: (selectedRows: TData[]) => void;
    data?: TData[];
    onRowClick?: (row: TData) => void;
    customButtons?: ReactNode;
    rowsPerPage?: number;
    rowsSelectionList?: TData[];
    searchPlaceholder?: string;
    className?: string;
    variant?: string;
}

export default function DataTable<TData>({
                                             id,
                                             columns: inputColumns = EMPTY_ARRAY,
                                             getRowId,
                                             selectable = false,
                                             onSelectionChange = () => {},
                                             data = EMPTY_ARRAY,
                                             onRowClick = () => {},
                                             customButtons = null,
                                             rowsPerPage = 10,
                                             rowsSelectionList = EMPTY_ARRAY,
                                             searchPlaceholder = "Search...",
                                             className = "",
                                             variant = "primary",
                                         }: DataTableProps<TData>) {
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: rowsPerPage,
    });
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>(EMPTY_OBJECT);

    useEffect(() => {
        setPagination((previous) => {
            if (previous.pageSize === rowsPerPage) {
                return previous;
            }

            return {
                ...previous,
                pageSize: rowsPerPage,
                pageIndex: 0,
            };
        });
    }, [rowsPerPage]);

    const externalRowSelection = useMemo(() => {
        if (!selectable || !getRowId || rowsSelectionList.length === 0) {
            return EMPTY_OBJECT;
        }

        const selection: Record<string, boolean> = {};

        rowsSelectionList.forEach((row) => {
            const rowId = getRowId(row);

            if (rowId !== undefined && rowId !== null) {
                selection[rowId] = true;
            }
        });

        return selection;
    }, [rowsSelectionList, getRowId, selectable]);

    useEffect(() => {
        setRowSelection((previous) => {
            const previousKeys = Object.keys(previous);
            const externalKeys = Object.keys(externalRowSelection);

            if (previousKeys.length !== externalKeys.length) {
                return externalRowSelection;
            }

            const hasChanged = externalKeys.some(
                (key) => previous[key] !== externalRowSelection[key]
            );

            return hasChanged ? externalRowSelection : previous;
        });
    }, [externalRowSelection]);

    const pageSizeOptions = useMemo(() => {
        const defaultOptions = [10, 15, 30, 50, 100, 200, 500];

        if (!defaultOptions.includes(rowsPerPage)) {
            return [...defaultOptions, rowsPerPage].sort(
                (a, b) => a - b
            );
        }

        return defaultOptions;
    }, [rowsPerPage]);

    const columns = useMemo(() => {
        const normalizedColumns = inputColumns.map(
            (column, index) => {
                if (!column.id && !("accessorKey" in column)) {
                    return {
                        ...column,
                        id: `col-${index}`,
                    };
                }

                return column;
            }
        );

        if (!selectable) {
            return normalizedColumns;
        }

        return [
            {
                id: "selection",

                header: ({ table }: { table: any }) => (
                    <Form.Check
                        type="checkbox"
                        checked={table.getIsAllPageRowsSelected()}
                        ref={(element: HTMLInputElement | null) => {
                            if (element) {
                                element.indeterminate =
                                    table.getIsSomePageRowsSelected() &&
                                    !table.getIsAllPageRowsSelected();
                            }
                        }}
                        onChange={table.getToggleAllPageRowsSelectedHandler()}
                        onClick={(event: React.MouseEvent) => {
                            event.stopPropagation();
                        }}
                    />
                ),

                cell: ({ row }: { row: any }) => (
                    <Form.Check
                        type="checkbox"
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                        onClick={(event: React.MouseEvent) => {
                            event.stopPropagation();
                        }}
                    />
                ),
            },
            ...normalizedColumns,
        ] as ColumnDef<TData, any>[];
    }, [inputColumns, selectable]);

    const table = useTable(
        {
            features,

            data,
            columns,

            state: {
                globalFilter,
                sorting,
                pagination,
                rowSelection,
            },

            onGlobalFilterChange: setGlobalFilter,

            onSortingChange: setSorting,

            onPaginationChange: setPagination,

            onRowSelectionChange: (updater: any) => {
                setRowSelection((previous) => {
                    const newSelection =
                        typeof updater === "function"
                            ? updater(previous)
                            : updater;

                    return newSelection;
                });
            },

            enableRowSelection: selectable,

            ...(getRowId ? { getRowId } : {}),

            globalFilterFn: "includesString",

            enableRowRangeSelection: false,
        },
        (state: any) => state
    );

    useEffect(() => {
        if (!selectable) {
            return;
        }

        const selectedRows = table
            .getSelectedRowModel()
            .rows
            .map((row: any) => row.original);

        onSelectionChange(selectedRows);
    }, [
        rowSelection,
        selectable,
        onSelectionChange,
        table,
    ]);

    const handleGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setGlobalFilter(value);

        setPagination((previous) => ({
            ...previous,
            pageIndex: 0,
        }));
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const pageSize = Number(event.target.value);

        setPagination({
            pageIndex: 0,
            pageSize,
        });
    };

    const handleRowClick = (row: any) => {
        onRowClick(row.original);
    };

    const rows = table.getRowModel().rows;

    const tableVariantClass = `table-variant-${variant}`;
    const combinedTableClasses = [className, tableVariantClass].filter(Boolean).join(" ");
    const paginationVariantClass = `pagination-variant-${variant}`;

    return (
        <div
            className="p-3 bg-white rounded"
            id={id}
        >
            <Row className="p-0">
                {customButtons && (
                    <Col
                        xs={12}
                        sm={12}
                        md={4}
                        lg={6}
                        xl={6}
                    >
                        <div className="mb-1">
                            {customButtons}
                        </div>
                    </Col>
                )}

                <Col
                    xs={customButtons ? 12 : 6}
                    sm={customButtons ? 12 : 6}
                    md={customButtons ? 4 : 6}
                    lg={customButtons ? 2 : 4}
                    xl={customButtons ? 2 : 4}
                >
                    <InputGroup className="mb-1">
                        <InputGroup.Text>
                            Filas
                        </InputGroup.Text>

                        <Form.Select
                            value={table.state.pagination.pageSize}
                            onChange={handlePageSizeChange}
                        >
                            {pageSizeOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Form.Select>
                    </InputGroup>
                </Col>

                <Col
                    xs={customButtons ? 12 : 6}
                    sm={customButtons ? 12 : 6}
                    md={customButtons ? 4 : 6}
                    lg={customButtons ? 4 : 8}
                    xl={customButtons ? 4 : 8}
                >
                    <BootstrapInput
                        type={InputTypes.SEARCH}
                        styleType={BootstrapInputStyleTypes.STANDARD}
                        shape={BootstrapInputShapeTypes.ROUNDED}
                        variant={variant}
                        className={"mb-1 float-end"}
                        placeholder={searchPlaceholder}
                        autoComplete={"off"}
                        value={table.state.globalFilter ?? ""}
                        onChange={handleGlobalFilterChange}
                    />
                </Col>
            </Row>

            <div
                className="table-responsive"
                style={{
                    maxHeight: "60vh",
                    overflowY: "auto",
                }}
            >
                <Table
                    hover
                    responsive
                    className={combinedTableClasses}
                >
                    <thead className="table-tbody table-glam">
                    {table
                        .getHeaderGroups()
                        .map((headerGroup: any) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(
                                    (header: any) => (
                                        <th
                                            key={header.id}
                                            role={
                                                header.column.getCanSort()
                                                    ? "button"
                                                    : undefined
                                            }
                                            onClick={header.column.getToggleSortingHandler()}
                                            style={{
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : (
                                                    <table.FlexRender
                                                        header={header}
                                                    />
                                                )}

                                            {header.column.getIsSorted() ===
                                            "asc"
                                                ? " ▲"
                                                : header.column.getIsSorted() ===
                                                "desc"
                                                    ? " ▼"
                                                    : ""}
                                        </th>
                                    )
                                )}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="table-tbody">
                    {rows.length > 0 ? (
                        rows.map((row: any) => (
                            <tr
                                key={row.id}
                                onClick={() =>
                                    handleRowClick(row)
                                }
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                {row
                                    .getAllCells()
                                    .map((cell: any) => (
                                        <td
                                            key={cell.id}
                                            style={{
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            <table.FlexRender
                                                cell={cell}
                                            />
                                        </td>
                                    ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="text-center text-muted py-4"
                            >
                                No hay resultados
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-2">
                <div className="text-muted">
                    Total filas:{" "}
                    <strong>{data.length}</strong>
                </div>

                <Pagination className={`mb-0 ${paginationVariantClass}`}>
                    <Pagination.Prev
                        onClick={() => table.previousPage()}
                        disabled={
                            !table.getCanPreviousPage()
                        }
                    />

                    <Pagination.Item active>
                        {table.state.pagination.pageIndex + 1}
                    </Pagination.Item>

                    <Pagination.Next
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    />
                </Pagination>
            </div>
        </div>
    );
}