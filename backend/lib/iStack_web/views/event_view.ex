defmodule IStackWeb.EventView do
  use IStackWeb, :view
  alias IStackWeb.EventView
  alias IStackWeb.EventScheduleView

  def render("index.json", %{events: events}) do
    %{data: render_many(events, EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, EventView, "event.json")}
  end

  def render("event.json", %{event: event}) do
    %{id: event.id,
      date: event.date}
  end

  def render("index_with_sched.json", %{events: events}) do
    %{data: render_many(events, EventView, "event_with_sched.json")}
  end

  def render("event_with_sched.json", %{event: event}) do
    %{
      id: event.id,
      date: event.date,
      eventSchedules: render_many(event.event_schedules, EventScheduleView, "event_schedule_with_topics.json"),
    }
  end

end
