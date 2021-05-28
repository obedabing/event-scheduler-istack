defmodule IStackWeb.EventController do
  use IStackWeb, :controller

  alias IStack.Events
  alias IStack.Events.Event

  action_fallback IStackWeb.FallbackController

  def index(conn, _params) do
    events = Events.list_events()
    render(conn, "index_with_sched.json", events: events)
  end

  def create(conn, %{"event" => event_params}) do
    %{"date" => date} = event_params
    existing_events = Events.list_events_without_assoc()
    existing_date = Events.get_event_by_date(date)
    
    with {:events_exceeded, false} <- {:events_exceeded, length(existing_events) === 3},
      {:event_date_existing, false} <- {:event_date_existing, not is_nil(existing_date)},
      {:ok, %Event{} = event} <- Events.create_event(event_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.event_path(conn, :show, event))
      |> render("show.json", event: event)
    end
  end

  def show(conn, %{"id" => id}) do
    event = Events.get_event!(id)
    render(conn, "show.json", event: event)
  end

  def update(conn, %{"id" => id, "event" => event_params}) do
    event = Events.get_event!(id)

    with {:ok, %Event{} = event} <- Events.update_event(event, event_params) do
      render(conn, "show.json", event: event)
    end
  end

  def delete(conn, %{"id" => id}) do
    event = Events.get_event!(id)

    with {:ok, %Event{}} <- Events.delete_event(event) do
      send_resp(conn, :no_content, "")
    end
  end
end
