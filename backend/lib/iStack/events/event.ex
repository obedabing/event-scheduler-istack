defmodule IStack.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset
  alias IStack.Events.EventSchedule

  schema "events" do  
    field :date, :naive_datetime
    field :name, :string
    has_many :event_schedules, EventSchedule, on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:date, :name])
    |> validate_required([:date])
  end
end
