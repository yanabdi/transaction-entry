import { TransactionRecord } from "../model/TransactionRecord.js";
import { TTransactionFacade } from "./TTransactionFacade.js";

export class TransactionFacade implements TTransactionFacade {
    private transactions: Map<number, Array<TransactionRecord>> = new Map();

    public async addTransaction(id: number, transaction: TransactionRecord): Promise<TransactionRecord> {
        let monthOfTransactions = this.transactions.get(id);

        if (monthOfTransactions === undefined) {
            monthOfTransactions = [];
            transaction.entry = 1;
            monthOfTransactions.push(transaction);
            this.transactions.set(id, monthOfTransactions);
        }
        else {
            const lastTransaction = monthOfTransactions[monthOfTransactions.length - 1];
            transaction.entry = lastTransaction.entry + 1;
            monthOfTransactions.push(transaction);
        } 

        return transaction;
    }

    public async removeTransaction(id: number, day: number): Promise<string> {
        const monthOfTransactions = this.transactions.get(id);
        if (!monthOfTransactions) {
            throw new Error("Month not found.");
        }
        if (monthOfTransactions.length === 0) {
            throw new Error("No transactions found for this month.");
        }
        for (const transaction of monthOfTransactions) {
            if (transaction.date.day === day) {
                monthOfTransactions.splice(monthOfTransactions.indexOf(transaction), 1);
                return `Transaction day: ${day} deleted`;
            }
        }

        return `Unsuccessful deletion. Transaction day: ${day} not found.`;
    }

    public listTransactions(): TransactionRecord[][] {
        return Array.from(this.transactions.values());
    }

    public listMap(): Map<number, Array<TransactionRecord>> {
        return this.transactions;
    }
}


export const transactionFacade = new TransactionFacade();
