import {beforeAll, beforeEach, it, describe, expect} from "vitest";
import { TransactionRecord } from "../src/model/TransactionRecord.ts";
import { TransactionFacade } from "../src/controller/TransactionFacade.ts";

describe("addTransaction", () => {
    let transaction: TransactionRecord;
    let facade: TransactionFacade;

    beforeAll(() => {
        transaction = {
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

        facade = new TransactionFacade();
    }); 

    it("should create a new array before adding the first transaction", () => {
        let map = facade.listMap();
        expect(map.size === 0);

        facade.addTransaction(20031012, transaction);
        map = facade.listMap();

        expect(map.has(20031012)).toBe(true);

        let day = map.get(20031012);
        expect(day).toBeDefined();
        expect(day).toBeInstanceOf(Array);
        expect(day).toHaveLength(1);
        expect(day?.[0]).toEqual(transaction);
    });
});