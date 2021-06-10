defmodule IStack.Events do
  @moduledoc """
  The Events context.
  """

  import Ecto.Query, warn: false
  alias IStack.Repo

  alias IStack.Events.Event
  alias IStack.Events.EventSchedule
  alias IStack.Events.ScheduleTopic

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

  def list_schedules(event_id) do
    event_schedule_query = from(
      es in EventSchedule,
      where: es.event_id == ^event_id,
      preload: [:schedule_topics],
      order_by: [es.time]
    )

    Repo.all(event_schedule_query)
  end

  defp remove_invalid_expression(string) do
    Regex.replace(~r/[*()+\[\]\/\?\\]/, string, "")
  end

  def list_schedules(event_id, list_of_keyword) do
    partial_format =
    if length(list_of_keyword) == 1 do
      data = List.first(list_of_keyword)
      remove_invalid_expression(data)
    else
      Enum.reduce(list_of_keyword, fn res, acc -> 
        replaced_inval_exp = remove_invalid_expression(res)
        if replaced_inval_exp == "" do
          acc
        else
          "#{acc}|#{replaced_inval_exp}"
        end
      end)
    end

    final_format = ~s|%(#{partial_format})%|

    topic_query = from(
      st in ScheduleTopic,
      where: fragment("lower(?) similar to ?", st.title, ^final_format)
        or fragment("lower(?) similar to ?", st.author_name, ^final_format)
        or fragment("lower(?) similar to ?", st.track_type, ^final_format)
    )

    event_schedule_query = from(
      es in EventSchedule,
      where: es.event_id == ^event_id,
      preload: [schedule_topics: ^topic_query],
      order_by: [es.time]
    )

    Repo.all(event_schedule_query)
  end


  def list_events_without_assoc do
    Repo.all(Event)
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

  def get_event_by_date(date) do
    from(
      e in Event,
      where: e.date == ^date
    ) |> Repo.one()
  end

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

  def get_event_schedule_by_time(time, event_id) do
    from(
      e in EventSchedule,
      where: e.time == ^time
        and e.event_id == ^ event_id
    ) |> Repo.one()
  end

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

  def fetch_schedule_topics(event_schedule_id) do
    query = from(
      st in ScheduleTopic,
      where: st.event_schedule_id == ^event_schedule_id,
    )
    
    Repo.all(query)
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
  def get_schedule_topic_by_stage(stage, event_sched_id) do 
    from(
      st in ScheduleTopic,
      where: st.stage == ^stage
        and st.event_schedule_id == ^event_sched_id,
    )|> Repo.one()
  end

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
  def update_schedule_topic(%ScheduleTopic{} = schedule_topic, attrs, track_type) do
    schedule_topic
    |> ScheduleTopic.update_changeset(attrs, track_type)
    |> Repo.update()
  end

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
