import { beforeEach, describe, expect, it, vi } from "vitest";
import { TransactionFacade } from "../src/controller/TransactionFacade.ts";
import type { TransactionRecord } from "../src/model/TransactionRecord.ts";
import type { TransactionRepository } from "../src/repository/TransactionRepository.ts";

vi.mock("../src/repository/TransactionRepository.js", () => ({
  TransactionRepository: class TransactionRepository {}
}));

type NewTransaction = Omit<TransactionRecord, "id">;

describe("TransactionFacade", () => {
  const newTransaction: NewTransaction = {
    date: "2003-10-12",
    category: "Food",
    amountCents: 2000,
    name: "sushi w/ friends",
    vendor: "Itosugi Sushi",
    description: "",
    notes: ""
  };

  const savedTransaction: TransactionRecord = {
    id: "transaction-1",
    ...newTransaction
  };

  let repository: {
    create: ReturnType<typeof vi.fn>;
    findByMonth: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
  };
  let facade: TransactionFacade;

  beforeEach(() => {
    repository = {
      create: vi.fn(),
      findByMonth: vi.fn(),
      remove: vi.fn()
    };

    facade = new TransactionFacade(
      repository as unknown as TransactionRepository
    );
  });

  describe("addTransaction", () => {
    it("creates a transaction through the repository", async () => {
      repository.create.mockResolvedValue(savedTransaction);

      const result = await facade.addTransaction(newTransaction);

      expect(repository.create).toHaveBeenCalledOnce();
      expect(repository.create).toHaveBeenCalledWith(newTransaction);
      expect(result).toEqual(savedTransaction);
    });

    it("propagates repository errors", async () => {
      repository.create.mockRejectedValue(new Error("Database unavailable"));

      await expect(facade.addTransaction(newTransaction)).rejects.toThrow(
        "Database unavailable"
      );
    });
  });

  describe("listTransactions", () => {
    it("retrieves transactions for the requested year and month", async () => {
      repository.findByMonth.mockResolvedValue([savedTransaction]);

      const result = await facade.listTransactions(2003, 10);

      expect(repository.findByMonth).toHaveBeenCalledOnce();
      expect(repository.findByMonth).toHaveBeenCalledWith(2003, 10);
      expect(result).toEqual([savedTransaction]);
    });

    it("returns an empty array when the month has no transactions", async () => {
      repository.findByMonth.mockResolvedValue([]);

      const result = await facade.listTransactions(2003, 11);

      expect(result).toEqual([]);
    });

    it("propagates repository errors", async () => {
      repository.findByMonth.mockRejectedValue(
        new Error("Unable to list transactions")
      );

      await expect(facade.listTransactions(2003, 10)).rejects.toThrow(
        "Unable to list transactions"
      );
    });
  });

  describe("removeTransaction", () => {
    it("removes a transaction by its unique ID", async () => {
      repository.remove.mockResolvedValue(undefined);

      await expect(
        facade.removeTransaction(savedTransaction.id)
      ).resolves.toBeUndefined();

      expect(repository.remove).toHaveBeenCalledOnce();
      expect(repository.remove).toHaveBeenCalledWith(savedTransaction.id);
    });

    it("propagates repository errors", async () => {
      repository.remove.mockRejectedValue(
        new Error("Unable to delete transaction")
      );

      await expect(
        facade.removeTransaction(savedTransaction.id)
      ).rejects.toThrow("Unable to delete transaction");
    });
  });
});
