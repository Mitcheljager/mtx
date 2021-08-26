# Macrotransactions.org

This is the repository for Macrotransactions.org. Macrotransactions.org highlights monetisation practices in popular games. The website is open source and anyone is open to contribute.

## Setup

The website runs on [SvelteKit](https://kit.svelte.dev/) and [Supabase](https://supabase.io/).

To get started;
1. Clone the repository.
2. Run `yarn` to install all dependancies.
3. Create a free account at [Supabase](https://supabase.io/). This is used to run the database.
4. Follow their steps for create a database.
5. Create a `.env.development` file in the root folder.
    - Add the follow ENV variables:
        - VITE_SUPABASE_URL
        - VITE_SUPABASE_ANON_KEY
    - Both of these are obtained from your Supabase account.
6. Run the contents of `schema.sql` in the SQL editor in Supabase.
7. Run the server using `yarn dev`.

The HTML and SCSS are structured according to [BEM](http://getbem.com/naming/). TypeScript is used where relevant, but it's not followed particularly strictly.
