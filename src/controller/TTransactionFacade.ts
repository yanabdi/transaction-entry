import { TransactionRecord } from "../model/TransactionRecord";

export interface TTransaactionFacade {
    /**
     * Add a transaction to the application's map (by date {YYYYMMDD} 8-digit number)
     * 
    */
    addTransaction(): Promise<TransactionRecord[]>;

    /**
     * Removes a transaction from the list
     * 
     * @param id a number representing the date which is the key to a TransactionRecord
     * 
     * @return Promise<string> 
     * 
     * The promise should fulfill if the transaction is successfully removed.
     * It will reject if not.
     * 
     * an id is valid only if is within the range of 8-digit numbers [00000001, 99999999]
     */
    removeTransaction(id: number): Promise<string>;
    listTransactions();
}
