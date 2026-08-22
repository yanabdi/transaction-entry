export interface TransactionRecord {
    id: string;
    date: string;
    category: string;
    amountCents: number;
    name: string;
    vendor: string; 
    description: string;
    notes: string;
}

export interface TransactionMonth {
    month: number;
    transactions: TransactionRecord[];
}