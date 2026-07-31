import { TransactionRecord } from "../model/TransactionRecord.js";
import { TTransactionFacade } from "./TTransactionFacade.js";

export default class TransactionFacade implements TTransactionFacade {
    private transactions: Map<number, Array<TransactionRecord>> = new Map();

    public async addTransaction(id: number, transaction: TransactionRecord): Promise<TransactionRecord> {
        let value;
        if (this.transactions.has(id)) {
            value = this.transactions.get(id);
            value.push(transaction);
        } else {
            this.transactions.set(id, new Array<TransactionRecord>());
            value = this.transactions.get(id);
            value.push(transaction);
        }

        // !!! NEED TO HANDLE DUPLICATE TRANSACTIONS OR AT LEAST FLAG IT OUT

        return transaction;
    }

    // !!! NEEDS TO BE REFACTORED BELOW
    public async removeTransaction(id: number): Promise<string> {
        const deleted = this.transactions.delete(id);
        if (!deleted) {
            throw new Error("Transaction not found");
        }

        return `Transaction ${id} deleted`;
    }

    listTransactions(): TransactionRecord[] {
        return Array.from(this.transactions.values());
    }
}


export const transactionFacade = new TransactionFacade();
