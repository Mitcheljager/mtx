create table categories (
 id uuid default uuid_generate_v4() primary key,
 created_at timestamp default now() not null,
 title text not null,
 type text not null
);

create table games (
 id uuid default uuid_generate_v4() primary key,
 created_at timestamp default now() not null,
 title text not null,
 publisher text,
 slug text not null,
 year_of_release smallint,
 image_url text,
 description text
);

create table game_category (
 id uuid default uuid_generate_v4() primary key,
 created_at timestamp default now() not null,
 game_id uuid references games (id),
 category_id uuid references categories (id)
);
