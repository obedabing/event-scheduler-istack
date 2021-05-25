defmodule IStack.Events.ScheduleTopic do
  use Ecto.Schema
  import Ecto.Changeset

  schema "schedule_topics" do
    field :author_name, :string
    field :author_title, :string
    field :description, :string
    field :stage, :string
    field :title, :string
    field :track_type, :string
    field :event_schedule_id, :id

    timestamps()
  end

  @doc false
  def changeset(schedule_topic, attrs) do
    schedule_topic
    |> cast(attrs, [:title, :description, :stage, :track_type, :author_name, :author_title])
    |> validate_required([:title, :description, :stage, :track_type, :author_name, :author_title])
  end
end
