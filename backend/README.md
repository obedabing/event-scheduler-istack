# Event Scheduler - iStack (Backend)

This was created by following:
- [Elixir](https://elixir-lang.org/install.html)
- [Phoenix 1.5](https://hexdocs.pm/phoenix/installation.html)
- [PostgreSQL](https://www.postgresql.org/download/)

### Setup and Installation
Make sure to install the following in your machine properly.
- Install the Elixir. See the guide on this link (https://elixir-lang.org/install.html).
- After installing the elixir, install the phoenix. See the guide on this link (https://hexdocs.pm/phoenix/installation.html).
- Setup your database with postgresql. Link for postgresql installation (https://www.postgresql.org/download/).

> Note:
> 
> Postgresql credentials must be:
> - username: postgres
> - password: postgres
>
> But if you already have existing postgresql installed in your machine, you may change the credentials of backend 
> config located at `backend/config/dev.exs`. Then replace it with the credentials of your existing postgresql.

### Start your Phoenix server

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
