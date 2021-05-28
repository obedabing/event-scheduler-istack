defmodule IStack.Events.ScheduleTopic do
  use Ecto.Schema
  import Ecto.Changeset
  alias IStack.Events.EventSchedule

  @derive {
    Jason.Encoder,
    only: [:title, :description, :stage, :track_type, :author_name, :author_title],
  }
  schema "schedule_topics" do
    field :author_name, :string
    field :author_title, :string
    field :description, :string
    field :stage, :string
    field :title, :string
    field :track_type, :string
    belongs_to :event_schedule, EventSchedule, on_replace: :nilify

    timestamps()
  end

  @doc false
  def validate(changeset) do
    validate_required(changeset, [:title, :description, :stage, :track_type, :author_name, :author_title])
    |> validate_inclusion(:stage, ["stage_one", "stage_two", "stage_three"])
    |> validate_inclusion(:track_type, [
      "advertising_101",
      "advertising_agencies",
      "afilliate_marketing",
      "content_marketing",
      "coversion_optimization",
      "design_for_growth",
      "ecommerce_d2c",
      "influencer_marketing",
      "lead_generation",
      "media_buying",
      "seo_sem",
      "future_advertising",      
    ])
  end

  def changeset(schedule_topic, attrs) do
    changeset = schedule_topic
      |> cast(attrs, [:title, :description, :stage, :track_type, :author_name, :author_title])

    existing = Map.has_key?(changeset.changes, :track_type)

    if existing do 
      %{track_type: track_type} = changeset.changes
      case track_type do
        "stage_break" -> changeset
        _ -> validate(changeset)
      end
    else
      validate(changeset)
    end
  end
end
