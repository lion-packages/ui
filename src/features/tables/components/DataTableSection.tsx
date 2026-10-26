import { useMemo, useState, useCallback, Fragment } from "react";
import { Button, Badge, Row, Col, Form, InputGroup } from "react-bootstrap";
import DataTable from "../../../components/tables/DataTable.tsx";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import VariantList from "../../VariantList.tsx";

interface MockUser {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

export default function DataTableSection() {
    const [selectedRows, setSelectedRows] = useState<MockUser[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<string>(VariantTypes.PRIMARY);

    const rows = useMemo(() => {
        const names = ["Lion Alpha", "Lion Beta", "Lion Gamma", "Lion Delta", "Lion Omega", "John Doe", "Jane Smith", "Carlos Ruiz", "Ana Gómez", "Lucía Pérez"];
        const roles = ["Developer", "Designer", "Manager", "Tester", "DevOps"];
        const statuses = ["Active", "Pending", "Inactive"];

        const generatedData: MockUser[] = [];

        for (let i = 1; i <= 1000; i++) {
            const randomName = `${names[(i - 1) % names.length]} ${i}`;
            const randomEmail = `user${i}@lionlib.test`;
            const randomRole = roles[(i - 1) % roles.length];
            const randomStatus = statuses[(i - 1) % statuses.length];

            generatedData.push({
                id: i,
                name: randomName,
                email: randomEmail,
                role: randomRole,
                status: randomStatus,
            });
        }

        return generatedData;
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "ID",
                cell: ({ getValue }: { getValue: () => any }) => getValue(),
            },
            {
                accessorKey: "name",
                header: "NAME",
                cell: ({ getValue }: { getValue: () => any }) => (
                    <span className="fw-semibold">{getValue()}</span>
                ),
            },
            {
                accessorKey: "email",
                header: "EMAIL",
                cell: ({ getValue }: { getValue: () => any }) => getValue(),
            },
            {
                accessorKey: "role",
                header: "ROLE",
                cell: ({ getValue }: { getValue: () => any }) => {
                    const role = getValue();
                    return <Badge bg="secondary">{role}</Badge>;
                },
            },
            {
                accessorKey: "status",
                header: "STATUS",
                cell: ({ getValue }: { getValue: () => any }) => {
                    const status = getValue();
                    const variant = status === "Active" ? "success" : status === "Pending" ? "warning" : "danger";
                    return <Badge bg={variant}>{status}</Badge>;
                },
            },
        ],
        []
    );

    const handleSelectionChange = useCallback((rows: MockUser[]) => {
        setSelectedRows(rows);

        console.log(rows)
    }, []);

    const handleRowClick = useCallback((row: MockUser) => {
        console.log(row);
    }, []);

    const handleBulkClick = () => {
        alert(`Currently selected rows: ${selectedRows.length}`);

        console.log(selectedRows);
    };

    return (
        <Fragment>
            <h2 className={"mb-3"}>
                DataTable Performance & Features Test (1000 Rows)
            </h2>

            <p className={"text-muted mb-4"}>
                Interactive section to validate block pagination, global text filtering, column sorting, row clicks, variant themes, and multi-row selection.
            </p>

            <div className="card p-3 mb-4 bg-light">
                <Row className="g-3 align-items-center">
                    <Col xs={12} sm={12} md={8} lg={6} xl={4}>
                        <InputGroup>
                            <InputGroup.Text className="fw-bold">Table Variant</InputGroup.Text>
                            <Form.Select
                                value={selectedVariant}
                                onChange={(e) => setSelectedVariant(e.target.value)}
                            >
                                {VariantList.map((variantName) => (
                                    <option key={variantName} value={variantName}>
                                        {variantName.charAt(0).toUpperCase() + variantName.slice(1)}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                </Row>
            </div>

            <DataTable
                className={"text-center"}
                searchPlaceholder={"Searching..."}
                data={rows}
                columns={columns}
                getRowId={(row) => String(row.id)}
                selectable={true}
                rowsPerPage={25}
                variant={selectedVariant}
                onSelectionChange={handleSelectionChange}
                customButtons={
                    <Button
                        variant={selectedVariant}
                        onClick={handleBulkClick}
                    >
                        Bulk Action ({selectedRows.length})
                    </Button>
                }
                onRowClick={handleRowClick}
            />
        </Fragment>
    );
}