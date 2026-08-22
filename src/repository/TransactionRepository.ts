import { supabase } from "../backend/supabase.js";
import { TransactionRecord } from "../model/TransactionRecord.js";

interface TransactionRow {
  id: string;
  transaction_date: string;
  category: string;
  amount_cents: number;
  name: string;
  vendor: string;
  description: string;
  notes: string;
}

function toTransaction(row: TransactionRow): TransactionRecord {
  return {
    id: row.id,
    date: row.transaction_date,
    category: row.category,
    amountCents: row.amount_cents,
    name: row.name,
    vendor: row.vendor,
    description: row.description,
    notes: row.notes
  };
}

export class TransactionRepository {
  async create(
    transaction: Omit<TransactionRecord, "id">
  ): Promise<TransactionRecord> {
    const { data, error } = await supabase
      .from("transactions")
      .insert({
        transaction_date: transaction.date,
        category: transaction.category,
        amount_cents: transaction.amountCents,
        name: transaction.name,
        vendor: transaction.vendor,
        description: transaction.description,
        notes: transaction.notes
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Unable to create transaction: ${error.message}`);
    }

    return toTransaction(data);
  }

  async findByMonth(
    year: number,
    month: number
  ): Promise<TransactionRecord[]> {
    const paddedMonth = String(month).padStart(2, "0");
    const start = `${year}-${paddedMonth}-01`;

    const nextYear = month === 12 ? year + 1 : year;
    const nextMonth = month === 12 ? 1 : month + 1;
    const end = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`;

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .gte("transaction_date", start)
      .lt("transaction_date", end)
      .order("transaction_date", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(`Unable to list transactions: ${error.message}`);
    }

    return (data as TransactionRow[]).map(toTransaction);
  }

  async remove(id: string): Promise<void> {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Unable to delete transaction: ${error.message}`);
    }
  }
}