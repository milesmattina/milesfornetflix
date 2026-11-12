create table if not exists public.site_events (
  id bigint generated always as identity primary key,
  event_name text not null check (event_name in ('resume_open', 'why_card_view', 'section_navigation')),
  page_path text not null check (length(page_path) <= 200),
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.site_events enable row level security;
revoke all on public.site_events from anon, authenticated;
grant insert (event_name, page_path, detail, created_at) on public.site_events to anon;
grant usage, select on sequence public.site_events_id_seq to anon;
create policy "Visitors can log limited portfolio events"
  on public.site_events for insert to anon
  with check (
    event_name in ('resume_open', 'why_card_view', 'section_navigation')
    and length(page_path) <= 200
    and jsonb_typeof(detail) = 'object'
  );
