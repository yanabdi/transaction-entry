export interface TransactionRecord {
    id: string; //for data management
    date: TransactionDate;
    category: string;
    amount: number;
    name: string;
    vendor: string; //to say where you spent the money
    desc: string;
    notes: string;
}

interface TransactionDate {
    day: number;
    month: number;
    year: number;
}