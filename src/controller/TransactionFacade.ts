import { TransactionRecord } from "../model/TransactionRecord.js";
import { TTransaactionFacade } from "./TTransactionFacade.js";

export class TransactionFacade implements TTransaactionFacade {
    private transactions: Map<number, TransactionRecord> = new Map<number, TransactionRecord>;

    async addTransaction(id: number, transaction: TransactionRecord): Promise<Map<number, TransactionRecord>> {
        // @ts-ignore
        return;
        }

    async removeTransaction(id: number): Promise<string> {
        // @ts-ignore
        return;
        }

    listTransactions() {
        
    }
}