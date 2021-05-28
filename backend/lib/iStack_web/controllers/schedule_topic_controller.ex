defmodule IStackWeb.ScheduleTopicController do
  use IStackWeb, :controller

  alias IStack.Events
  alias IStack.Events.ScheduleTopic

  action_fallback IStackWeb.FallbackController

  def index(conn, _params) do
    schedule_topics = Events.list_schedule_topics()
    render(conn, "index.json", schedule_topics: schedule_topics)
  end

  def create(conn, %{"schedule_topic" => schedule_topic_params, "event_sched_id" => event_sched_id}) do
    %{"stage" => stage} = schedule_topic_params
    topics = Events.fetch_schedule_topics(event_sched_id)
    event_sched = Events.get_event_schedule!(event_sched_id)
    existing_topic = Events.get_schedule_topic_by_stage(stage, event_sched_id)
    
    with {:topics_exceeded, false} <- {:topics_exceeded, length(topics) == 3},
      {:stage_existing, false} <- {:stage_existing, not is_nil(existing_topic)},
      {:ok, %ScheduleTopic{} = schedule_topic} <- 
      Events.create_schedule_topic_with_assoc(schedule_topic_params, event_sched) do

      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.schedule_topic_path(conn, :show, schedule_topic))
      |> render("show_with_assoc.json", schedule_topic: schedule_topic)
    end
  end

  def create(conn, %{"schedule_topic" => schedule_topic_params}) do
    with {:ok, %ScheduleTopic{} = schedule_topic} <- Events.create_schedule_topic(schedule_topic_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.schedule_topic_path(conn, :show, schedule_topic))
      |> render("show.json", schedule_topic: schedule_topic)
    end
  end

  def show(conn, %{"id" => id}) do
    schedule_topic = Events.get_schedule_topic!(id)
    render(conn, "show_with_assoc.json", schedule_topic: schedule_topic)
  end

  def update(conn, %{"id" => id, "schedule_topic" => schedule_topic_params}) do
    schedule_topic = Events.get_schedule_topic!(id)

    with {:ok, %ScheduleTopic{} = schedule_topic} <- Events.update_schedule_topic(schedule_topic, schedule_topic_params) do
      render(conn, "show_with_assoc.json", schedule_topic: schedule_topic)
    end
  end

  def delete(conn, %{"id" => id}) do
    schedule_topic = Events.get_schedule_topic!(id)

    with {:ok, %ScheduleTopic{}} <- Events.delete_schedule_topic(schedule_topic) do
      send_resp(conn, :no_content, "")
    end
  end
end
