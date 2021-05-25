defmodule IStack.Repo.Migrations.CreateEventSchedules do
  use Ecto.Migration

  def change do
    create table(:event_schedules) do
      add :time, :time
      add :event_id, references(:events, on_delete: :nothing)

      timestamps()
    end

    create index(:event_schedules, [:event_id])
  end
end
