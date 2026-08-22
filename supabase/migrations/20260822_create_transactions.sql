create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  transaction_date date not null,
  category text not null,
  amount_cents bigint not null check (amount_cents >= 0),
  name text not null,
  vendor text not null default '',
  description text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index transactions_date_idx
  on public.transactions (transaction_date);