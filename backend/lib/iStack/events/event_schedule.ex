defmodule IStack.Events.EventSchedule do
  use Ecto.Schema
  import Ecto.Changeset
  alias IStack.Events.Event

  schema "event_schedules" do
    field :time, :time
    belongs_to :event, Event, on_replace: :nilify

    timestamps()
  end

  @doc false
  def changeset(event_schedule, attrs) do
    event_schedule
    |> cast(attrs, [:time])
    |> validate_required([:time])
  end
end
