defmodule IStackWeb.ScheduleTopicControllerTest do
  use IStackWeb.ConnCase

  alias IStack.Events
  alias IStack.Events.ScheduleTopic

  @create_attrs %{
    author_name: "some author_name",
    author_title: "some author_title",
    description: "some description",
    stage: "some stage",
    title: "some title",
    track_type: "some track_type"
  }
  @update_attrs %{
    author_name: "some updated author_name",
    author_title: "some updated author_title",
    description: "some updated description",
    stage: "some updated stage",
    title: "some updated title",
    track_type: "some updated track_type"
  }
  @invalid_attrs %{author_name: nil, author_title: nil, description: nil, stage: nil, title: nil, track_type: nil}

  def fixture(:schedule_topic) do
    {:ok, schedule_topic} = Events.create_schedule_topic(@create_attrs)
    schedule_topic
  end

  def event_fixture() do
    event_attrs = %{
      date: ~N[2010-04-17 14:00:00],
      name: "some name"
    }

    {:ok, event} = Events.create_event(event_attrs)
    event
  end

  def event_schedule_with_assoc_fixture(attrs \\ %{}) do
    event = event_fixture()
    sched_attrs = %{time: ~T[14:00:00]}
    {:ok, event_schedule} = Events.create_event_schedule_with_assoc(sched_attrs, event)
 
    event_schedule
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all schedule_topics", %{conn: conn} do
      conn = get(conn, Routes.schedule_topic_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create schedule_topic" do
    test "renders schedule_topic when data is valid", %{conn: conn} do
      conn = post(conn, Routes.schedule_topic_path(conn, :create), schedule_topic: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.schedule_topic_path(conn, :show, id))

      assert %{
               "id" => id,
               "authorName" => "some author_name",
               "authorTitle" => "some author_title",
               "description" => "some description",
               "stage" => "some stage",
               "title" => "some title",
               "trackType" => "some track_type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.schedule_topic_path(conn, :create), schedule_topic: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end


  describe "create schedule_topic with assoc" do
    test "renders schedule_topic when data is valid", %{conn: conn} do
      event_sched = event_schedule_with_assoc_fixture()
      conn = post(
        conn,
        Routes.schedule_topic_path(conn, :create),
        schedule_topic: @create_attrs,
        event_sched_id: event_sched.id
      )
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.schedule_topic_path(conn, :show, id))
      event_sched_id = event_sched.id
      assert %{
               "id" => id,
               "authorName" => "some author_name",
               "authorTitle" => "some author_title",
               "description" => "some description",
               "stage" => "some stage",
               "title" => "some title",
               "trackType" => "some track_type",
               "eventScheduleId" => event_sched_id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.schedule_topic_path(conn, :create), schedule_topic: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update schedule_topic" do
    setup [:create_schedule_topic]

    test "renders schedule_topic when data is valid", %{conn: conn, schedule_topic: %ScheduleTopic{id: id} = schedule_topic} do
      conn = put(conn, Routes.schedule_topic_path(conn, :update, schedule_topic), schedule_topic: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.schedule_topic_path(conn, :show, id))

      assert %{
               "id" => id,
               "authorName" => "some updated author_name",
               "authorTitle" => "some updated author_title",
               "description" => "some updated description",
               "stage" => "some updated stage",
               "title" => "some updated title",
               "trackType" => "some updated track_type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, schedule_topic: schedule_topic} do
      conn = put(conn, Routes.schedule_topic_path(conn, :update, schedule_topic), schedule_topic: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete schedule_topic" do
    setup [:create_schedule_topic]

    test "deletes chosen schedule_topic", %{conn: conn, schedule_topic: schedule_topic} do
      conn = delete(conn, Routes.schedule_topic_path(conn, :delete, schedule_topic))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.schedule_topic_path(conn, :show, schedule_topic))
      end
    end
  end

  defp create_schedule_topic(_) do
    schedule_topic = fixture(:schedule_topic)
    {:ok, schedule_topic: schedule_topic}
  end
end
