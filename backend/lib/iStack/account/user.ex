defmodule IStack.Account.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :password, :string
    field :type, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :type, :password])
    |> validate_required([:name, :type, :password])
  end
end
