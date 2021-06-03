# Event Scheduler - iStack

The project was created by following:
- [Next.js](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website)
- [Elixir](https://elixir-lang.org/install.html)
- [Phoenix 1.5](https://hexdocs.pm/phoenix/installation.html)
- [PostgreSQL](https://www.postgresql.org/download/)

---

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

---

### Start Application

**Frontend**
- Navigate to frontend path with `cd frontend/`
- Install dependencies with `npm install`
- Start with `npm run dev`
- You may now be able to access it on [`localhost:3000`](http://localhost:3000)

> Note: You may also use `yarn`.

**Backend**
- Navigate to backend path with `cd backend/`
- Install dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.setup`
- Start Phoenix endpoint with `mix phx.server`

> Note:
> 
> - In order for the application to work properly, make sure both ***frontend*** and ***backend*** are running.
> - Running the `mix ecto.setup` will automatically include the data seeds.
> - If you wish to reset the data, run `mix ecto.reset`. And `mix ecto.drop` for deleting all the data.

