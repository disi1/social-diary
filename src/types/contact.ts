export interface Contact {
    id: number,
    name: string,
    relationship: string,
    location: string,
    category: string,
    priority: string,
    lastEntry: string,
}

export type CustomAlert = "information" | "warning" | "error" | "success";
