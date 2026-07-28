export interface TransactionRecord {
    id: string; 
    date: TransactionDate;
    category: string;
    amount: number;
    name: string;
    vendor: string; 
    desc: string;
    notes: string;
}

interface TransactionDate {
    day: number;
    month: number;
    year: number;
}