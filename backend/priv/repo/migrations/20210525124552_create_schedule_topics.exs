defmodule IStack.Repo.Migrations.CreateScheduleTopics do
  use Ecto.Migration

  def change do
    create table(:schedule_topics) do
      add :title, :text
      add :description, :text
      add :stage, :string
      add :track_type, :string
      add :author_name, :string
      add :author_title, :string
      add :event_schedule_id, references(:event_schedules, on_delete: :delete_all)

      timestamps()
    end

    create index(:schedule_topics, [:event_schedule_id])
  end
end
