# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :iStack,
  ecto_repos: [IStack.Repo]

# Configures the endpoint
config :iStack, IStackWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "DAKlTLgRfVfTTBQe+seU1w0yVKxuON3W3itz569qGYKRWI1AjrKi2DX4txEtTYc3",
  render_errors: [view: IStackWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: IStack.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :iStack, IStack.Auth.Guardian,
  issuer: "IStack",
  secret_key: "RZtKvFBZJOAwSAIVS5fwV3N9/rsCuGa75iXGa3l+zri5Mhly+GB+Aq1IxV5Zy0n1"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
