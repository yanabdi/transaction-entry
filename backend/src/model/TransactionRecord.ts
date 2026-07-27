export interface TransactionRecord {
    id: string; //for data management
    date: TransactionDate;
    category: string;
    amount: number;
    vendor: string; //to say where you spent the money
}

interface TransactionDate {
    day: number;
    month: number;
    year: number;
}