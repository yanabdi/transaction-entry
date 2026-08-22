async function loadTransactions(year, month) {
  try {
    const response = await fetch(
      `/transactions?year=${year}&month=${month}`
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const transactions = await response.json();
    console.log(transactions);

    return transactions;
  } catch (error) {
    console.error("Unable to load transactions:", error);
    return [];
  }
}

loadTransactions(2026, 8);