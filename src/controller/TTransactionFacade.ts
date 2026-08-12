import { TransactionRecord } from "../model/TransactionRecord.js";

export interface TTransactionFacade {
    /**
     * Add a transaction to the application's map
     * 
     * @param id 8-digit number that serves as a date and a unique identifier
     * @param transaction the relevant data to store, refer to TransactionRecord.ts
     * 
     * a valid id is an 8-digit number representing a date in the range [00000001, 99999999]
    */
    addTransaction(id: number, transaction: TransactionRecord): Promise<TransactionRecord>;

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
    removeTransaction(id: number, entry: number): Promise<string>;
    listTransactions(): TransactionRecord[][];
}
