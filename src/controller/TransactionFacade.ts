import { TransactionRecord } from "../model/TransactionRecord.js";
import { TTransactionFacade } from "./TTransactionFacade.js";

export default class TransactionFacade implements TTransactionFacade {
    private transactions: Map<number, TransactionRecord> = new Map();

    public async addTransaction(id: number, transaction: TransactionRecord): Promise<TransactionRecord> {
         if (this.transactions.has(id)) {
            throw new Error("Transaction already exists");
        }

        this.transactions.set(id, transaction);

        return transaction;
    }

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
