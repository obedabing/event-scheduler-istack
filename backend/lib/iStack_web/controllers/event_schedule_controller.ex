defmodule IStackWeb.EventScheduleController do
  use IStackWeb, :controller
  
  alias IStack.Events
  alias IStack.Events.EventSchedule

  action_fallback IStackWeb.FallbackController

  def index(conn, _params) do
    event_schedules = Events.list_event_schedules()
    render(conn, "index.json", event_schedules: event_schedules)
  end

  def is_thirty_minutes_interva(minutes), do: Enum.member?([00, 30], minutes)

  def create(conn, %{"event_schedule" => event_schedule_params, "event_id" => event_id}) do
    event = Events.get_event!(event_id)
    %{ "time" => time } = event_schedule_params
    {:ok, transformed_time} = Time.from_iso8601(time)
    {:ok, timeDate} = Time.new(transformed_time.hour, transformed_time.minute, 0 ,0)
    minutes_interval = is_thirty_minutes_interva(transformed_time.minute)
    existing_sched = Events.get_event_schedule_by_time(timeDate, event_id)

    data = %{
      "time" => timeDate
    }

    with {:event_sched_existing, false} <- {:event_sched_existing, not is_nil(existing_sched)},
      {:interval_not_valid, false} <- {:interval_not_valid, not is_nil(minutes_interval)},
      {:ok, %EventSchedule{} = event_schedule} <- 
      Events.create_event_schedule_with_assoc(data, event) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.event_schedule_path(conn, :show, event_schedule))
      |> render("show_with_assoc.json", event_schedule: event_schedule)
    end
  end

  def create(conn, %{"event_schedule" => event_schedule_params}) do
    with {:ok, %EventSchedule{} = event_schedule} <- Events.create_event_schedule(event_schedule_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.event_schedule_path(conn, :show, event_schedule))
      |> render("show.json", event_schedule: event_schedule)
    end
  end

  def show(conn, %{"id" => id}) do
    event_schedule = Events.get_event_schedule!(id)
    render(conn, "show_with_assoc.json", event_schedule: event_schedule)
  end

  def update(conn, %{"id" => id, "event_schedule" => event_schedule_params}) do
    event_schedule = Events.get_event_schedule!(id)

    with {:ok, %EventSchedule{} = event_schedule} <- Events.update_event_schedule(event_schedule, event_schedule_params) do
      render(conn, "show_with_assoc.json", event_schedule: event_schedule)
    end
  end

  def delete(conn, %{"id" => id}) do
    event_schedule = Events.get_event_schedule!(id)

    with {:ok, %EventSchedule{}} <- Events.delete_event_schedule(event_schedule) do
      send_resp(conn, :no_content, "")
    end
  end
end
