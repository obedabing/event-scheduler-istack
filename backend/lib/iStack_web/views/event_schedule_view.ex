defmodule IStackWeb.EventScheduleView do
  use IStackWeb, :view
  alias IStackWeb.EventScheduleView
  alias IStackWeb.ScheduleTopicView

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

  def render("show_with_assoc.json", %{event_schedule: event_schedule}) do
    %{data: render_one(event_schedule, EventScheduleView, "event_schedule_with_assoc.json")}
  end

  def render("event_schedule_with_assoc.json", %{event_schedule: event_schedule}) do
    %{
      id: event_schedule.id,
      time: event_schedule.time,
      eventId: event_schedule.event_id,
      scheduleTopics: render_many(event_schedule.schedule_topics, ScheduleTopicView, "schedule_topic_with_assoc.json")
    }
  end

  def render("event_schedule_with_topics.json", %{event_schedule: event_schedule}) do
    %{
      id: event_schedule.id,
      time: event_schedule.time,
      eventId: event_schedule.event_id,
      scheduleTopics: render_many(event_schedule.schedule_topics, ScheduleTopicView, "schedule_topic_with_assoc.json"),
    }
  end
end
