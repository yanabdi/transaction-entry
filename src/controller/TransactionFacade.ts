import { TransactionRecord } from "../model/TransactionRecord.js";
import { TransactionRepository } from "../repository/TransactionRepository.js";

export class TransactionFacade {
  constructor(
    private readonly repository = new TransactionRepository()
  ) {}

  addTransaction(
    transaction: Omit<TransactionRecord, "id">
  ): Promise<TransactionRecord> {
    return this.repository.create(transaction);
  }

  listTransactions(
    year: number,
    month: number
  ): Promise<TransactionRecord[]> {
    return this.repository.findByMonth(year, month);
  }

  removeTransaction(id: string): Promise<void> {
    return this.repository.remove(id);
  }
}

export const transactionFacade = new TransactionFacade;