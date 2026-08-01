import { TransactionRecord } from "../model/TransactionRecord.js";
import { TTransactionFacade } from "./TTransactionFacade.js";

export default class TransactionFacade implements TTransactionFacade {
    private transactions: Map<number, Array<TransactionRecord>> = new Map();

    public async addTransaction(id: number, transaction: TransactionRecord): Promise<TransactionRecord> {
        let dayOfTransactions = this.transactions.get(id);

        if (dayOfTransactions === undefined) {
            dayOfTransactions = [];

            transaction.entry = 1;

            dayOfTransactions.push(transaction);

            this.transactions.set(id, dayOfTransactions);
        }
        else {
            const lastTransaction = dayOfTransactions[dayOfTransactions.length - 1];

            transaction.entry = lastTransaction.entry + 1;

            dayOfTransactions.push(transaction);
        } 
        // below is old version, originally if map didnt contain ID array creation would not happen.
        // if (this.transactions.has(id)) { let dayOfTransactions = this.transactions.get(id);
        //     let dayOfTransactions = this.transactions.get(id);
        //     if (dayOfTransactions === undefined) {
        //         let array = new Array<TransactionRecord>();
        //         this.transactions.set(id, array);
        //         transaction.entry = 1;
        //         array.push(transaction);
        //     } else {
        //         let lastAdded = dayOfTransactions[dayOfTransactions.length - 1];
        //         transaction.entry = lastAdded.entry + 1;
        //         dayOfTransactions.push(transaction);
        //     }
        // }

        return transaction;
    }

    public async removeTransaction(id: number, entry: number): Promise<string> {
        const dayOfTransactions = this.transactions.get(id);
        if (!dayOfTransactions) {
            throw new Error("Day not found.");
        }
        if (dayOfTransactions.length === 0) {
            throw new Error("No transactions found for this day.");
        }
        for (const transaction of dayOfTransactions) {
            if (transaction.entry === entry) {
                dayOfTransactions.splice(dayOfTransactions.indexOf(transaction), 1);
                return `Transaction entry: ${entry} deleted`;
            }
        }

        return `Unsuccessful deletion. Transaction entry: ${entry} not found.`;
    }

    listTransactions(): TransactionRecord[][] {
        return Array.from(this.transactions.values());
    }
}


export const transactionFacade = new TransactionFacade();
