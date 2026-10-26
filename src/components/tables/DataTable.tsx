import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
    type RowSelectionState,
    type RowData,
} from "@tanstack/react-table";
import {
    Table,
    Form,
    InputGroup,
    Pagination,
    Row,
    Col,
} from "react-bootstrap";
import BootstrapInput from "../../components/inputs/BootstrapInput.tsx";
import { InputTypes } from "../../types/InputTypes.tsx";
import { BootstrapInputStyleTypes } from "../../types/Web/BootstrapInputStyleTypes.tsx";
import { BootstrapInputShapeTypes } from "../../types/Web/BootstrapInputShapeTypes.tsx";
import { defaultDictionary, type DataTableDictionary, type SupportedLanguage } from "./DataTable.i18n";

const EMPTY_ARRAY: any[] = [];

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

type TableFeaturesType = typeof features;

export interface DataTableProps<TData extends RowData> {
    id?: string;
    columns?: ColumnDef<TableFeaturesType, TData, any>[];
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
    locale?: SupportedLanguage;
    dictionary?: Partial<DataTableDictionary>;
}

export default function DataTable<TData extends RowData>({
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
                                                             searchPlaceholder,
                                                             className = "",
                                                             variant = "primary",
                                                             locale = "es",
                                                             dictionary = {},
                                                         }: DataTableProps<TData>) {

    const t = useMemo((): DataTableDictionary => {
        const baseLang = defaultDictionary[locale] ?? defaultDictionary["es"];
        return {
            ...baseLang,
            ...dictionary,
            searchPlaceholder: searchPlaceholder ?? dictionary.searchPlaceholder ?? baseLang.searchPlaceholder,
        };
    }, [locale, dictionary, searchPlaceholder]);

    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: rowsPerPage,
    });
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const onSelectionChangeRef = useRef(onSelectionChange);
    useEffect(() => {
        onSelectionChangeRef.current = onSelectionChange;
    }, [onSelectionChange]);

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
            return {};
        }

        const selection: RowSelectionState = {};

        rowsSelectionList.forEach((row) => {
            const rowId = getRowId(row);

            if (rowId !== undefined && rowId !== null) {
                selection[String(rowId)] = true;
            }
        });

        return selection;
    }, [rowsSelectionList, getRowId, selectable]);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current && rowsSelectionList.length > 0) {
            isInitialMount.current = false;
            setRowSelection(externalRowSelection);
        }
    }, [externalRowSelection, rowsSelectionList.length]);

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
                header: ({ table: tbl }: { table: any }) => (
                    <Form.Check
                        type="checkbox"
                        checked={tbl.getIsAllPageRowsSelected()}
                        ref={(element: HTMLInputElement | null) => {
                            if (element) {
                                element.indeterminate =
                                    tbl.getIsSomePageRowsSelected() &&
                                    !tbl.getIsAllPageRowsSelected();
                            }
                        }}
                        onChange={tbl.getToggleAllPageRowsSelectedHandler()}
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
        ] as ColumnDef<TableFeaturesType, TData, any>[];
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
            onRowSelectionChange: setRowSelection,
            enableRowSelection: selectable,
            ...(getRowId ? { getRowId } : {}),
            globalFilterFn: "includesString" as any,
            enableRowRangeSelection: false,
        },
        (state: any) => state
    );

    const lastSelectionKeysRef = useRef<string>("");

    useEffect(() => {
        if (!selectable) {
            return;
        }

        const selectedRows = table
            .getSelectedRowModel()
            .rows
            .map((row: any) => row.original);

        const currentKeys = Object.keys(rowSelection)
            .filter((k) => rowSelection[k])
            .sort()
            .join(",");

        if (currentKeys !== lastSelectionKeysRef.current) {
            lastSelectionKeysRef.current = currentKeys;
            onSelectionChangeRef.current(selectedRows);
        }
    }, [rowSelection, selectable, table]);

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
    const filteredRowsCount = table.getFilteredRowModel().rows.length;

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
                        md={12}
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
                    md={6}
                    lg={customButtons ? 3 : 4}
                    xl={customButtons ? 2 : 4}
                >
                    <InputGroup className="mb-1">
                        <InputGroup.Text>
                            {t.rowsLabel}
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
                    md={6}
                    lg={customButtons ? 3 : 8}
                    xl={customButtons ? 4 : 8}
                >
                    <BootstrapInput
                        type={InputTypes.SEARCH}
                        styleType={BootstrapInputStyleTypes.STANDARD}
                        shape={BootstrapInputShapeTypes.ROUNDED}
                        variant={variant}
                        className={"mb-1 float-end"}
                        placeholder={t.searchPlaceholder}
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
                    overflowX: "auto",
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                <Table
                    hover
                    responsive={false}
                    className={combinedTableClasses}
                    style={{ width: "100%", minWidth: "max-content" }}
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
                                {t.noResultsLabel}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-2">
                <div className="text-muted">
                    {t.totalRowsLabel}{" "}
                    <strong>{filteredRowsCount}</strong>
                    {filteredRowsCount !== data.length && (
                        <span className="ms-1 text-muted small">
                            ({t.ofLabel} {data.length})
                        </span>
                    )}
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