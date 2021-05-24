defmodule IStack.Repo do
  use Ecto.Repo,
    otp_app: :iStack,
    adapter: Ecto.Adapters.Postgres
end
