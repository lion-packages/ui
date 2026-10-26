export type SupportedLanguage = "es" | "en" | string;

export interface DataTableDictionary {
    rowsLabel: string;
    searchPlaceholder: string;
    totalRowsLabel: string;
    noResultsLabel: string;
    ofLabel: string;
}

export const defaultDictionary: Record<string, DataTableDictionary> = {
    es: {
        rowsLabel: "Filas",
        searchPlaceholder: "Buscar...",
        totalRowsLabel: "Total filas:",
        noResultsLabel: "No hay resultados",
        ofLabel: "de",
    },
    en: {
        rowsLabel: "Rows",
        searchPlaceholder: "Search...",
        totalRowsLabel: "Total rows:",
        noResultsLabel: "No results found",
        ofLabel: "of",
    },
};