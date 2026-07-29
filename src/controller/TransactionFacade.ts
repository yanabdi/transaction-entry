import { TransactionRecord } from "../model/TransactionRecord";
import { TTransaactionFacade } from "./TTransactionFacade";

export class TransactionFacade implements TTransaactionFacade {
    private transactions: Map<number, TransactionRecord> = new Map<number, TransactionRecord>;

    async addTransaction(id: number, transaction: TransactionRecord): Promise<Map<number, TransactionRecord>> {
        
        return;
    }

    async removeTransaction(id: number): Promise<string> {
        return;
    }

    listTransactions() {
        
    }
}