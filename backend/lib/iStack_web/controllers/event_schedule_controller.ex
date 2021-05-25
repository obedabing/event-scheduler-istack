defmodule IStackWeb.EventScheduleController do
  use IStackWeb, :controller

  alias IStack.Events
  alias IStack.Events.EventSchedule

  action_fallback IStackWeb.FallbackController

  def index(conn, _params) do
    event_schedules = Events.list_event_schedules()
    render(conn, "index.json", event_schedules: event_schedules)
  end

  def create(conn, %{"event_schedule" => event_schedule_params, "event_id" => event_id}) do
    event = Events.get_event!(event_id)

    with {:ok, %EventSchedule{} = event_schedule} <- 
      Events.create_event_schedule_with_assoc(event_schedule_params, event) do
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
      render(conn, "show.json", event_schedule: event_schedule)
    end
  end

  def delete(conn, %{"id" => id}) do
    event_schedule = Events.get_event_schedule!(id)

    with {:ok, %EventSchedule{}} <- Events.delete_event_schedule(event_schedule) do
      send_resp(conn, :no_content, "")
    end
  end
end
