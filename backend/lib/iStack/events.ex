defmodule IStack.Events do
  @moduledoc """
  The Events context.
  """

  import Ecto.Query, warn: false
  alias IStack.Repo

  alias IStack.Events.Event

  @doc """
  Returns the list of events.

  ## Examples

      iex> list_events()
      [%Event{}, ...]

  """
  def list_events do
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

  alias IStack.Events.EventSchedule

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
end
