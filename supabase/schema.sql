-- Content store for the admin editor.
-- Run this once in the Supabase project's SQL Editor.
create table if not exists content (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Server-side code talks to this table with the service_role key, which
-- bypasses row level security. RLS is enabled with no policies so the
-- anon/public key (if ever exposed to the browser) cannot read or write it.
alter table content enable row level security;
