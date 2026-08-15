import {beforeAll, beforeEach, it, describe, expect, afterAll, afterEach} from "vitest";
import { TransactionRecord } from "../src/model/TransactionRecord.ts";
import { TransactionFacade } from "../src/controller/TransactionFacade.ts";

describe("TransactionFacade", () => {
	let transactionOctA: TransactionRecord;
	let transactionOctB: TransactionRecord;
	let transactionNov: TransactionRecord;
	let facade: TransactionFacade;

	beforeAll(() => {
		transactionOctA = {
			entry: 1, 
			date: 
			{
				day: 12, 
				month: 10, 
				year: 2003
			}, 
			category: "Food", 
			amount: 20, 
			name: "sushi w/ friends", 
			vendor: "Itosugi Sushi", 
			desc: "", 
			notes: ""
		};

		transactionOctB = {
			entry: 2, 
			date: 
			{
				day: 15, 
				month: 10, 
				year: 2003
			}, 
			category: "Misc.", 
			amount: 20, 
			name: "", 
			vendor: "Popular", 
			desc: "", 
			notes: ""
		};

		transactionNov = {
			entry: 1, 
			date: 
			{
				day: 12, 
				month: 11, 
				year: 2003
			}, 
			category: "Food", 
			amount: 20, 
			name: "subway sandwich", 
			vendor: "Subway", 
			desc: "", 
			notes: ""
		};
	});

    describe("addTransaction", () => {
		let result: Promise<TransactionRecord> | undefined;

		beforeEach(() => {
			facade = new TransactionFacade();
			result = undefined;
		}); 

		afterEach(() => {
			expect(result).toBeInstanceOf(Promise<TransactionRecord>);
		});
		
		it("should create a new array before adding the first transaction to a month", () => {
			let map = facade.listMap();
			expect(map.size).toEqual(0);

			result = facade.addTransaction(200310, transactionOctA);
			map = facade.listMap();
			expect(map.size).toEqual(1);

			expect(map.has(200310)).toBe(true);

			let month = map.get(200310);
			expect(month).toBeDefined();
			expect(month).toBeInstanceOf(Array);
			expect(month).toHaveLength(1);
			expect(month?.[0]).toEqual(transactionOctA);
		});

		it("should create a new array in a different map key if it has a different month", () => {
			facade.addTransaction(200310, transactionOctA);
			result = facade.addTransaction(200311, transactionNov);

			let map = facade.listMap();
			expect(map.size).toEqual(2);
			expect(map.has(200310)).toBe(true);
			expect(map.has(200311)).toBe(true);

			let oct = map.get(200310);
			expect(oct).toBeDefined();
			expect(oct).toBeInstanceOf(Array);
			expect(oct).toHaveLength(1);
			expect(oct?.[0]).toEqual(transactionOctA);

			let nov = map.get(200311);
			expect(nov).toBeDefined();
			expect(nov).toBeInstanceOf(Array);
			expect(nov).toHaveLength(1);
			expect(nov?.[0]).toEqual(transactionNov);
		});

		it("should add to an existing array if it has a different day but not month", () => {
			facade.addTransaction(200310, transactionOctA);
			result = facade.addTransaction(200310, transactionOctB);

			let map = facade.listMap();
			expect(map.size).toEqual(1);
			expect(map.has(200310)).toBe(true);

			let oct = map.get(200310);
			expect(oct).toBeDefined();
			expect(oct).toBeInstanceOf(Array);
			expect(oct).toHaveLength(2);
			expect(oct?.[0]).toEqual(transactionOctA);
		});

		it("should allow duplicate transactions to be added", () => {
			facade.addTransaction(200310, transactionOctA);
			result = facade.addTransaction(200310, transactionOctA);

			let map = facade.listMap();
			expect(map.size).toEqual(1);
			expect(map.has(200310)).toBe(true);

			let oct = map.get(200310);
			expect(oct).toBeDefined();
			expect(oct).toBeInstanceOf(Array);
			expect(oct).toHaveLength(2);
			expect(oct?.[0]).toEqual(transactionOctA);
			expect(oct?.[1]).toEqual(transactionOctA);
		});
	});

	describe("removeTransaction", () => {
		let result: Promise<String> | undefined;

		beforeEach(async () => {
			facade = new TransactionFacade();
			await facade.addTransaction(200310, transactionOctA);
			result = undefined;
		});

		it("should throw an error if the transaction month does not exist", async () => {
			await expect(facade.removeTransaction(200311, 10)).rejects.toThrow("Month not found.");
		});

		it("should successfully remove an existing transaction", async () => {
			const result = await facade.removeTransaction(200310, 12);
			console.log(result);
			expect(result).toBeDefined();
			expect(result).toEqual("Transaction day: 12 deleted");
		});

		it("should throw an error if there are no transactions in a month", async () => {
			await facade.removeTransaction(200310, 12);
			await expect(facade.removeTransaction(200310, 12)).rejects.toThrow("No transactions found for this month.");
		}); 

		it("should return an unsuccessful deletion message when transaction day doesn't exist", async () => {
			const result = await facade.removeTransaction(200310, 15);
			expect(result).toBeDefined();
			expect(result).toEqual("Unsuccessful deletion. Transaction day: 15 not found.");
		});
	});

	describe("listTransactions", () => {
		let result: any;

		beforeEach(() => {
			facade = new TransactionFacade();
			result = undefined;
		});

		it("should return a 2D array of the transaction map", () => {
				result = facade.listTransactions();
				expect(result).toBeDefined();
				expect(result).toBeInstanceOf(Array);
		});
	});
});