defmodule IStackWeb.Router do
  use IStackWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", IStackWeb do
    pipe_through :api

    resources "/users", UserController
  end
end
