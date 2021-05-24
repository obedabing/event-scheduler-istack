defmodule IStackWeb.PageController do
  use IStackWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
