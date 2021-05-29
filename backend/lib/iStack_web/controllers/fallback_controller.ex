defmodule IStackWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use IStackWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(IStackWeb.ChangesetView)
    |> render("error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(IStackWeb.ErrorView)
    |> render(:"404")
  end

  def call(conn, {:event_date_existing, true}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(IStackWeb.AuthView)
    |> render("error.json", error: "events", message: "Event date already existing.")
  end

  def call(conn, {:event_sched_existing, true}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(IStackWeb.AuthView)
    |> render("error.json", error: "eventSched", message: "Schedule already existing.")
  end

  def call(conn, {:events_exceeded, true}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(IStackWeb.AuthView)
    |> render("error.json", error: "events", message: "You already have three events created.")
  end

  def call(conn, {:topics_exceeded, true}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(IStackWeb.AuthView)
    |> render("error.json", error: "topics", message: "You already have three topics created.")
  end

  def call(conn, {:stage_existing, true}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(IStackWeb.AuthView)
    |> render("error.json", error: "stage", message: "The stage already existing.")
  end
end
