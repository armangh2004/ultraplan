-- Keep-alive table for Supabase free-tier pause prevention.
-- Project ref: aibatbdqkklkuoxdyjis
--
-- Two independent schedulers write to this table so the database always sees
-- activity within the 7-day free-tier pause window:
--   1. GitHub Actions (.github/workflows/supabase-keepalive.yml) — anon key,
--      PATCH /rest/v1/keep_alive?id=eq.1 every 2 days.
--   2. Vercel Cron (ddm-website /api/keepalive) — service role via supabase-js,
--      daily.
--
-- No migration pipeline exists in this repo; apply via the Supabase Dashboard
-- SQL Editor (project aibatbdqkklkuoxdyjis) or `supabase db push`. This file is
-- the in-repo source of record.

create table if not exists public.keep_alive (
  id int primary key default 1 check (id = 1),
  last_ping timestamptz not null default now()
);

comment on table public.keep_alive is
  'Single-row heartbeat; external crons update last_ping to keep the free-tier project active.';

insert into public.keep_alive (id, last_ping)
values (1, now())
on conflict (id) do nothing;

alter table public.keep_alive enable row level security;

-- Supabase default privileges grant ALL on new public tables to anon and
-- authenticated. Strip that down: anon may only (a) read id — Postgres requires
-- SELECT on columns used in the WHERE id=eq.1 filter — and (b) update last_ping.
revoke all on table public.keep_alive from anon, authenticated;
grant select (id) on public.keep_alive to anon;
grant update (last_ping) on public.keep_alive to anon;

-- RLS: anon may update only the singleton row. No SELECT/INSERT/DELETE policies
-- exist, so nothing else is possible even with the grants above. PATCH with the
-- default Prefer: return=minimal needs no SELECT policy; the FOR UPDATE policy's
-- USING clause filters the target row.
create policy "anon keep-alive ping"
  on public.keep_alive
  for update
  to anon
  using (id = 1)
  with check (id = 1);
