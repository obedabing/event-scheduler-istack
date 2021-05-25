defmodule IStackWeb.EventScheduleControllerTest do
  use IStackWeb.ConnCase

  alias IStack.Events
  alias IStack.Events.EventSchedule

  @create_attrs %{
    time: ~T[14:00:00]
  }
  @update_attrs %{
    time: ~T[15:01:01]
  }
  @invalid_attrs %{time: nil}

  def fixture(:event_schedule) do
    {:ok, event_schedule} = Events.create_event_schedule(@create_attrs)
    event_schedule
  end


  @event_attrs %{
    date: ~N[2010-04-17 14:00:00],
    name: "some name"
  }

  def fixture(:event) do
    {:ok, event} = Events.create_event(@event_attrs)
    event
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all event_schedules", %{conn: conn} do
      conn = get(conn, Routes.event_schedule_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create event_schedule" do
    test "renders event_schedule when data is valid", %{conn: conn} do
      conn = post(conn, Routes.event_schedule_path(conn, :create), event_schedule: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.event_schedule_path(conn, :show, id))

      assert %{
               "id" => id,
               "time" => "14:00:00"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.event_schedule_path(conn, :create), event_schedule: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "create event_schedule with assoc" do
    test "renders event_schedule when data is valid", %{conn: conn} do
      event = fixture(:event)
      conn = post(conn, Routes.event_schedule_path(conn, :create), event_schedule: @create_attrs, event_id: event.id)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.event_schedule_path(conn, :show, id))
      event_id = event.id
      test = json_response(conn, 200)["data"]

      assert %{
          "id" => id,
          "time" => "14:00:00",
          "eventId" => event_id
        } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.event_schedule_path(conn, :create), event_schedule: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end


  describe "update event_schedule" do
    setup [:create_event_schedule]

    test "renders event_schedule when data is valid", %{conn: conn, event_schedule: %EventSchedule{id: id} = event_schedule} do
      conn = put(conn, Routes.event_schedule_path(conn, :update, event_schedule), event_schedule: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.event_schedule_path(conn, :show, id))

      assert %{
               "id" => id,
               "time" => "15:01:01"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, event_schedule: event_schedule} do
      conn = put(conn, Routes.event_schedule_path(conn, :update, event_schedule), event_schedule: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete event_schedule" do
    setup [:create_event_schedule]

    test "deletes chosen event_schedule", %{conn: conn, event_schedule: event_schedule} do
      conn = delete(conn, Routes.event_schedule_path(conn, :delete, event_schedule))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.event_schedule_path(conn, :show, event_schedule))
      end
    end
  end

  defp create_event_schedule(_) do
    event_schedule = fixture(:event_schedule)
    {:ok, event_schedule: event_schedule}
  end
end
