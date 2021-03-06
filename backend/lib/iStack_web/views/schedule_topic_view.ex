defmodule IStackWeb.ScheduleTopicView do
  use IStackWeb, :view
  alias IStackWeb.ScheduleTopicView

  def render("index.json", %{schedule_topics: schedule_topics}) do
    %{data: render_many(schedule_topics, ScheduleTopicView, "schedule_topic.json")}
  end

  def render("show.json", %{schedule_topic: schedule_topic}) do
    %{data: render_one(schedule_topic, ScheduleTopicView, "schedule_topic.json")}
  end

  def render("schedule_topic.json", %{schedule_topic: schedule_topic}) do
    %{id: schedule_topic.id,
      title: schedule_topic.title,
      description: schedule_topic.description,
      stage: schedule_topic.stage,
      track_type: schedule_topic.track_type,
      author_name: schedule_topic.author_name,
      author_title: schedule_topic.author_title}
  end

  def render("show_with_assoc.json", %{schedule_topic: schedule_topic}) do
    %{data: render_one(schedule_topic, ScheduleTopicView, "schedule_topic_with_assoc.json")}
  end

  def render("schedule_topic_with_assoc.json", %{schedule_topic: schedule_topic}) do
    %{
      id: schedule_topic.id,
      title: schedule_topic.title,
      description: schedule_topic.description,
      stage: schedule_topic.stage,
      trackType: schedule_topic.track_type,
      authorName: schedule_topic.author_name,
      authorTitle: schedule_topic.author_title,
      eventScheduleId: schedule_topic.event_schedule_id
    }
  end
end
