# Event Scheduler - iStack

The project was created by following:
- [Next.js](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website)
- [Elixir](https://elixir-lang.org/install.html)
- [Phoenix](https://hexdocs.pm/phoenix/installation.html)
- [PostgreSql](https://www.postgresql.org/download/)

### Setup and Installation

- Install the Elixir. See the guide on this link (https://elixir-lang.org/install.html).
- After installing the elixir, install the phoenix. See the guide on this link (https://hexdocs.pm/phoenix/installation.html).
- Then setup your database with postgres. Link to for postgres installation (https://www.postgresql.org/download/).

### Start Application

Frontend
- Navigate to frontend path with `cd front-end/`
- Install dependencies with `npm install`
- Start with `npm dev`

> Note: You may also use `yarn`.

Backend
- Navigate to frontend path with `cd front-end/`
- Install dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.setup`
- Start Phoenix endpoint with mix `phx.server`
