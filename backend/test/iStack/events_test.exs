defmodule IStack.EventsTest do
  use IStack.DataCase

  alias IStack.Events

  describe "events" do
    alias IStack.Events.Event

    @valid_attrs %{date: ~N[2010-04-17 14:00:00], name: "some name"}
    @update_attrs %{date: ~N[2011-05-18 15:01:01], name: "some updated name"}
    @invalid_attrs %{date: nil, name: nil}

    def event_fixture(attrs \\ %{}) do
      {:ok, event} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Events.create_event()

      event
    end

    test "list_events/0 returns all events" do
      event = event_fixture()
      assert Events.list_events() == [event]
    end

    test "get_event!/1 returns the event with given id" do
      event = event_fixture()
      assert Events.get_event!(event.id) == event
    end

    test "create_event/1 with valid data creates a event" do
      assert {:ok, %Event{} = event} = Events.create_event(@valid_attrs)
      assert event.date == ~N[2010-04-17 14:00:00]
      assert event.name == "some name"
    end

    test "create_event/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Events.create_event(@invalid_attrs)
    end

    test "update_event/2 with valid data updates the event" do
      event = event_fixture()
      assert {:ok, %Event{} = event} = Events.update_event(event, @update_attrs)
      assert event.date == ~N[2011-05-18 15:01:01]
      assert event.name == "some updated name"
    end

    test "update_event/2 with invalid data returns error changeset" do
      event = event_fixture()
      assert {:error, %Ecto.Changeset{}} = Events.update_event(event, @invalid_attrs)
      assert event == Events.get_event!(event.id)
    end

    test "delete_event/1 deletes the event" do
      event = event_fixture()
      assert {:ok, %Event{}} = Events.delete_event(event)
      assert_raise Ecto.NoResultsError, fn -> Events.get_event!(event.id) end
    end

    test "change_event/1 returns a event changeset" do
      event = event_fixture()
      assert %Ecto.Changeset{} = Events.change_event(event)
    end
  end

  describe "event_schedules" do
    alias IStack.Events.EventSchedule

    @valid_attrs %{time: ~T[14:00:00]}
    @update_attrs %{time: ~T[15:01:01]}
    @invalid_attrs %{time: nil}

    def event_schedule_fixture(attrs \\ %{}) do
      {:ok, event_schedule} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Events.create_event_schedule()

      event_schedule
    end

    test "list_event_schedules/0 returns all event_schedules" do
      event_schedule = event_schedule_fixture()
      assert Events.list_event_schedules() == [event_schedule]
    end

    test "get_event_schedule!/1 returns the event_schedule with given id" do
      event_schedule = event_schedule_fixture()
      assert Events.get_event_schedule!(event_schedule.id) == event_schedule
    end

    test "create_event_schedule/1 with valid data creates a event_schedule" do
      assert {:ok, %EventSchedule{} = event_schedule} = Events.create_event_schedule(@valid_attrs)
      assert event_schedule.time == ~T[14:00:00]
    end

    test "create_event_schedule/1 with event" do
      event = event_fixture()
      assert {:ok, %EventSchedule{} = event_schedule} = Events.create_event_schedule_with_assoc(@valid_attrs, event)
   
      assert event_schedule.event_id == event.id
      assert event_schedule.time == ~T[14:00:00]
    end

    test "create_event_schedule/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Events.create_event_schedule(@invalid_attrs)
    end

    test "update_event_schedule/2 with valid data updates the event_schedule" do
      event_schedule = event_schedule_fixture()
      assert {:ok, %EventSchedule{} = event_schedule} = Events.update_event_schedule(event_schedule, @update_attrs)
      assert event_schedule.time == ~T[15:01:01]
    end

    test "update_event_schedule/2 with invalid data returns error changeset" do
      event_schedule = event_schedule_fixture()
      assert {:error, %Ecto.Changeset{}} = Events.update_event_schedule(event_schedule, @invalid_attrs)
      assert event_schedule == Events.get_event_schedule!(event_schedule.id)
    end

    test "delete_event_schedule/1 deletes the event_schedule" do
      event_schedule = event_schedule_fixture()
      assert {:ok, %EventSchedule{}} = Events.delete_event_schedule(event_schedule)
      assert_raise Ecto.NoResultsError, fn -> Events.get_event_schedule!(event_schedule.id) end
    end

    test "change_event_schedule/1 returns a event_schedule changeset" do
      event_schedule = event_schedule_fixture()
      assert %Ecto.Changeset{} = Events.change_event_schedule(event_schedule)
    end
  end

  describe "schedule_topics" do
    alias IStack.Events.ScheduleTopic

    @valid_attrs %{author_name: "some author_name", author_title: "some author_title", description: "some description", stage: "some stage", title: "some title", track_type: "some track_type"}
    @update_attrs %{author_name: "some updated author_name", author_title: "some updated author_title", description: "some updated description", stage: "some updated stage", title: "some updated title", track_type: "some updated track_type"}
    @invalid_attrs %{author_name: nil, author_title: nil, description: nil, stage: nil, title: nil, track_type: nil}

    def schedule_topic_fixture(attrs \\ %{}) do
      {:ok, schedule_topic} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Events.create_schedule_topic()

      schedule_topic
    end

    test "list_schedule_topics/0 returns all schedule_topics" do
      schedule_topic = schedule_topic_fixture()
      assert Events.list_schedule_topics() == [schedule_topic]
    end

    test "get_schedule_topic!/1 returns the schedule_topic with given id" do
      schedule_topic = schedule_topic_fixture()
      assert Events.get_schedule_topic!(schedule_topic.id) == schedule_topic
    end

    test "create_schedule_topic/1 with valid data creates a schedule_topic" do
      assert {:ok, %ScheduleTopic{} = schedule_topic} = Events.create_schedule_topic(@valid_attrs)
      assert schedule_topic.author_name == "some author_name"
      assert schedule_topic.author_title == "some author_title"
      assert schedule_topic.description == "some description"
      assert schedule_topic.stage == "some stage"
      assert schedule_topic.title == "some title"
      assert schedule_topic.track_type == "some track_type"
    end

    test "create_schedule_topic/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Events.create_schedule_topic(@invalid_attrs)
    end

    test "update_schedule_topic/2 with valid data updates the schedule_topic" do
      schedule_topic = schedule_topic_fixture()
      assert {:ok, %ScheduleTopic{} = schedule_topic} = Events.update_schedule_topic(schedule_topic, @update_attrs)
      assert schedule_topic.author_name == "some updated author_name"
      assert schedule_topic.author_title == "some updated author_title"
      assert schedule_topic.description == "some updated description"
      assert schedule_topic.stage == "some updated stage"
      assert schedule_topic.title == "some updated title"
      assert schedule_topic.track_type == "some updated track_type"
    end

    test "update_schedule_topic/2 with invalid data returns error changeset" do
      schedule_topic = schedule_topic_fixture()
      assert {:error, %Ecto.Changeset{}} = Events.update_schedule_topic(schedule_topic, @invalid_attrs)
      assert schedule_topic == Events.get_schedule_topic!(schedule_topic.id)
    end

    test "delete_schedule_topic/1 deletes the schedule_topic" do
      schedule_topic = schedule_topic_fixture()
      assert {:ok, %ScheduleTopic{}} = Events.delete_schedule_topic(schedule_topic)
      assert_raise Ecto.NoResultsError, fn -> Events.get_schedule_topic!(schedule_topic.id) end
    end

    test "change_schedule_topic/1 returns a schedule_topic changeset" do
      schedule_topic = schedule_topic_fixture()
      assert %Ecto.Changeset{} = Events.change_schedule_topic(schedule_topic)
    end
  end
end
