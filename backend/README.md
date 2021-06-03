# Event Scheduler - iStack (Backend)

### Setup and Installation
Make sure to install the following in your machine properly.
- Setup your database with postgresql. Link for postgresql installation (https://www.postgresql.org/download/).
- Install the Elixir. See the guide on this link (https://elixir-lang.org/install.html).
- After installing the elixir, install the phoenix. See the guide on this link (https://hexdocs.pm/phoenix/installation.html).

> Note:
> 
> Postgresql credentials must be:
> - username: postgres
> - password: postgres
>
> But if you already have existing postgres installed in your machine, you may change the credentials of backend 
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
