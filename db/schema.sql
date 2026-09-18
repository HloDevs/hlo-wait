create table if not exists waitlist_accounts (id uuid primary key default gen_random_uuid(), email text not null unique, handle text unique check (handle is null or handle ~ '^[a-z0-9]{3,}$'), verified_at timestamptz, created_at timestamptz not null default now());
create table if not exists waitlist_codes (email text primary key, code text not null, attempts integer not null default 0, expires_at timestamptz not null);
create table if not exists waitlist_sessions (token text primary key, account_id uuid not null references waitlist_accounts(id) on delete cascade, expires_at timestamptz not null);
create index if not exists waitlist_sessions_expiry_idx on waitlist_sessions(expires_at);
