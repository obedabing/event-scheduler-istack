defmodule IStack.Events do
  @moduledoc """
  The Events context.
  """

  import Ecto.Query, warn: false
  alias IStack.Repo

  alias IStack.Events.Event
  alias IStack.Events.EventSchedule

  @doc """
  Returns the list of events.

  ## Examples

      iex> list_events()
      [%Event{}, ...]

  """
  def list_events do

    event_schedule_query = from(
      es in EventSchedule,
      preload: [:schedule_topics],
      order_by: [es.time]
    )

    query = from(
      e in Event,
      preload: [event_schedules: ^event_schedule_query],
      order_by: [e.date]
    )

    Repo.all(query)
  end

  @doc """
  Gets a single event.

  Raises `Ecto.NoResultsError` if the Event does not exist.

  ## Examples

      iex> get_event!(123)
      %Event{}

      iex> get_event!(456)
      ** (Ecto.NoResultsError)

  """
  def get_event!(id), do: Repo.get!(Event, id)

  @doc """
  Creates a event.

  ## Examples

      iex> create_event(%{field: value})
      {:ok, %Event{}}

      iex> create_event(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_event(attrs \\ %{}) do
    %Event{}
    |> Event.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a event.

  ## Examples

      iex> update_event(event, %{field: new_value})
      {:ok, %Event{}}

      iex> update_event(event, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_event(%Event{} = event, attrs) do
    event
    |> Event.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a event.

  ## Examples

      iex> delete_event(event)
      {:ok, %Event{}}

      iex> delete_event(event)
      {:error, %Ecto.Changeset{}}

  """
  def delete_event(%Event{} = event) do
    Repo.delete(event)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking event changes.

  ## Examples

      iex> change_event(event)
      %Ecto.Changeset{source: %Event{}}

  """
  def change_event(%Event{} = event) do
    Event.changeset(event, %{})
  end

  @doc """
  Returns the list of event_schedules.

  ## Examples

      iex> list_event_schedules()
      [%EventSchedule{}, ...]

  """
  def list_event_schedules do
    Repo.all(EventSchedule)
  end

  @doc """
  Gets a single event_schedule.

  Raises `Ecto.NoResultsError` if the Event schedule does not exist.

  ## Examples

      iex> get_event_schedule!(123)
      %EventSchedule{}

      iex> get_event_schedule!(456)
      ** (Ecto.NoResultsError)

  """
  def get_event_schedule!(id), do: Repo.get!(EventSchedule, id)

  @doc """
  Creates a event_schedule.

  ## Examples

      iex> create_event_schedule(%{field: value})
      {:ok, %EventSchedule{}}

      iex> create_event_schedule(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_event_schedule_with_assoc(attrs \\ %{}, event) do
    %EventSchedule{}
    |> EventSchedule.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:event, event)
    |> Repo.insert()
    |> case do
      {:ok, res} ->
        {:ok, Repo.preload(res, [:schedule_topics])}
      _ = res -> res
    end
  end

  def create_event_schedule(attrs \\ %{}) do
    %EventSchedule{}
    |> EventSchedule.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a event_schedule.

  ## Examples

      iex> update_event_schedule(event_schedule, %{field: new_value})
      {:ok, %EventSchedule{}}

      iex> update_event_schedule(event_schedule, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_event_schedule(%EventSchedule{} = event_schedule, attrs) do
    event_schedule
    |> EventSchedule.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a event_schedule.

  ## Examples

      iex> delete_event_schedule(event_schedule)
      {:ok, %EventSchedule{}}

      iex> delete_event_schedule(event_schedule)
      {:error, %Ecto.Changeset{}}

  """
  def delete_event_schedule(%EventSchedule{} = event_schedule) do
    Repo.delete(event_schedule)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking event_schedule changes.

  ## Examples

      iex> change_event_schedule(event_schedule)
      %Ecto.Changeset{source: %EventSchedule{}}

  """
  def change_event_schedule(%EventSchedule{} = event_schedule) do
    EventSchedule.changeset(event_schedule, %{})
  end

  alias IStack.Events.ScheduleTopic

  @doc """
  Returns the list of schedule_topics.

  ## Examples

      iex> list_schedule_topics()
      [%ScheduleTopic{}, ...]

  """
  def list_schedule_topics do
    Repo.all(ScheduleTopic)
  end

  @doc """
  Gets a single schedule_topic.

  Raises `Ecto.NoResultsError` if the Schedule topic does not exist.

  ## Examples

      iex> get_schedule_topic!(123)
      %ScheduleTopic{}

      iex> get_schedule_topic!(456)
      ** (Ecto.NoResultsError)

  """
  def get_schedule_topic!(id), do: Repo.get!(ScheduleTopic, id)

  @doc """
  Creates a schedule_topic.

  ## Examples

      iex> create_schedule_topic(%{field: value})
      {:ok, %ScheduleTopic{}}

      iex> create_schedule_topic(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_schedule_topic_with_assoc(attrs \\ %{}, event_schedule) do
    %ScheduleTopic{}
    |> ScheduleTopic.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:event_schedule, event_schedule)
    |> Repo.insert()
  end

  def create_schedule_topic(attrs \\ %{}) do
    %ScheduleTopic{}
    |> ScheduleTopic.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a schedule_topic.

  ## Examples

      iex> update_schedule_topic(schedule_topic, %{field: new_value})
      {:ok, %ScheduleTopic{}}

      iex> update_schedule_topic(schedule_topic, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_schedule_topic(%ScheduleTopic{} = schedule_topic, attrs) do
    schedule_topic
    |> ScheduleTopic.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a schedule_topic.

  ## Examples

      iex> delete_schedule_topic(schedule_topic)
      {:ok, %ScheduleTopic{}}

      iex> delete_schedule_topic(schedule_topic)
      {:error, %Ecto.Changeset{}}

  """
  def delete_schedule_topic(%ScheduleTopic{} = schedule_topic) do
    Repo.delete(schedule_topic)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking schedule_topic changes.

  ## Examples

      iex> change_schedule_topic(schedule_topic)
      %Ecto.Changeset{source: %ScheduleTopic{}}

  """
  def change_schedule_topic(%ScheduleTopic{} = schedule_topic) do
    ScheduleTopic.changeset(schedule_topic, %{})
  end
end
