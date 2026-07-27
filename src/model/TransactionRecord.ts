export interface TransactionRecord {
    date: Date;
    category: string;
    amount: number;
}

interface Date {
    day: number;
    month: number;
    year: number;
}