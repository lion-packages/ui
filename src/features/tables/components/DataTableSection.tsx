import { useMemo, useState, useCallback, Fragment } from "react";
import { Button, Badge, Row, Col, Form, InputGroup, Card } from "react-bootstrap";
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
    const [currentLocale, setCurrentLocale] = useState<string>("es");

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
    }, []);

    const handleRowClick = useCallback((row: MockUser) => {
        console.log(row);
    }, []);

    const handleBulkClick = () => {
        alert(`Currently selected rows: ${selectedRows.length}`);
    };

    const getEnumKey = (enumObject: Record<string, any>, value: any): string => {
        return Object.keys(enumObject).find((key) => enumObject[key] === value) || value;
    };

    const variantEnumName = getEnumKey(VariantTypes, selectedVariant);

    const generatedCodeSnippet = `import { useMemo, useState, useCallback } from "react";
import { Button, Badge } from "react-bootstrap";
import { DataTable, VariantTypes } from "@lion-npm/ui";

interface MockUser {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

export default function MyDataTableScreen() {
    const [selectedRows, setSelectedRows] = useState<MockUser[]>([]);

    const rows = useMemo(() => [
        { id: 1, name: "Lion Alpha 1", email: "user1@lionlib.test", role: "Developer", status: "Active" },
        { id: 2, name: "Lion Beta 2", email: "user2@lionlib.test", role: "Designer", status: "Pending" }
    ], []);

    const columns = useMemo(() => [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "NAME" },
        { accessorKey: "email", header: "EMAIL" },
        { accessorKey: "role", header: "ROLE" },
        { accessorKey: "status", header: "STATUS" }
    ], []);

    const handleSelectionChange = useCallback((rows: MockUser[]) => {
        setSelectedRows(rows);
    }, []);

    return (
        <DataTable
            locale="${currentLocale}"
            data={rows}
            columns={columns}
            getRowId={(row) => String(row.id)}
            selectable={true}
            rowsPerPage={25}
            variant={VariantTypes.${variantEnumName}}
            onSelectionChange={handleSelectionChange}
            customButtons={
                <Button
                    variant={VariantTypes.${variantEnumName}}
                    onClick={() => alert(\`Selected: \${selectedRows.length}\")}
                >
                    Bulk Action ({selectedRows.length})
                </Button>
            }
        />
    );
}`;

    return (
        <Fragment>
            <h2 className={"mb-3"}>
                DataTable Performance & Features Test (1000 Rows)
            </h2>

            <p className={"text-muted mb-4"}>
                Interactive section and live documentation to validate block pagination, global text filtering, column sorting, row clicks, variant themes, and multi-row selection.
            </p>

            <Card className="mb-4 shadow-sm">
                <Card.Header className="bg-light py-3">
                    <h5 className="mb-0 text-secondary">Interactive Playground & Code Documentation</h5>
                </Card.Header>
                <Card.Body>
                    <Row className="g-3 mb-4">
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <InputGroup>
                                <InputGroup.Text className="fw-bold">Table Variant</InputGroup.Text>
                                <Form.Select
                                    value={selectedVariant}
                                    onChange={(e) => setSelectedVariant(e.target.value)}
                                >
                                    {VariantList.map((variantName) => (
                                        <option key={variantName} value={variantName}>
                                            {variantName.charAt(0) + variantName.slice(1)}
                                        </option>
                                    ))}
                                </Form.Select>
                            </InputGroup>
                        </Col>

                        <Col xs={12} sm={12} md={6} lg={6}>
                            <InputGroup>
                                <InputGroup.Text className="fw-bold">Language (Locale)</InputGroup.Text>
                                <Form.Select
                                    value={currentLocale}
                                    onChange={(e) => setCurrentLocale(e.target.value)}
                                >
                                    <option value="es">Español (ES)</option>
                                    <option value="en">English (EN)</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row>

                    {/* Layout de 2 columnas: Columna izquierda para el Componente DataTable y Columna derecha para el Código */}
                    <Row className="g-4 align-items-start">
                        <Col xs={12} lg={6}>
                            <div className="p-3 border rounded bg-white">
                                <span className="d-block text-muted small mb-2 fw-bold">LIVE COMPONENT PREVIEW</span>
                                <DataTable
                                    className={"text-center"}
                                    locale={currentLocale}
                                    data={rows}
                                    columns={columns}
                                    getRowId={(row) => String(row.id)}
                                    selectable={true}
                                    rowsPerPage={10}
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
                            </div>
                        </Col>

                        <Col xs={12} lg={6}>
                            <div className="p-3 bg-dark text-light rounded position-relative h-100">
                                <span className="d-block text-muted small mb-2 fw-bold">GENERATED CODE SNIPPET (COPY & PASTE READY)</span>
                                <pre className="mb-0 text-light bg-transparent p-0" style={{ fontSize: "0.78rem", overflowX: "auto", maxHeight: "600px" }}>
                                    <code>{generatedCodeSnippet}</code>
                                </pre>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Fragment>
    );
}