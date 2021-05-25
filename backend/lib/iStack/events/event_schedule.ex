defmodule IStack.Events.EventSchedule do
  use Ecto.Schema
  import Ecto.Changeset

  schema "event_schedules" do
    field :time, :time
    field :event_id, :id

    timestamps()
  end

  @doc false
  def changeset(event_schedule, attrs) do
    event_schedule
    |> cast(attrs, [:time])
    |> validate_required([:time])
  end
end
