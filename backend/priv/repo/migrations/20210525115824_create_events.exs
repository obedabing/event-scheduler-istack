defmodule IStack.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :date, :naive_datetime
      add :name, :string

      timestamps()
    end

  end
end
