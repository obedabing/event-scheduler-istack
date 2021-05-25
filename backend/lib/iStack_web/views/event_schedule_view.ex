defmodule IStackWeb.EventScheduleView do
  use IStackWeb, :view
  alias IStackWeb.EventScheduleView

  def render("index.json", %{event_schedules: event_schedules}) do
    %{data: render_many(event_schedules, EventScheduleView, "event_schedule.json")}
  end

  def render("show.json", %{event_schedule: event_schedule}) do
    %{data: render_one(event_schedule, EventScheduleView, "event_schedule.json")}
  end

  def render("event_schedule.json", %{event_schedule: event_schedule}) do
    %{id: event_schedule.id,
      time: event_schedule.time}
  end
end
