defmodule IStackWeb.Router do
  use IStackWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :auth do
    plug IStack.Auth.Pipeline
  end

  pipeline :api do
    plug CORSPlug

    plug :accepts, ["json"]
  end

  scope "/api", IStackWeb do
    pipe_through :api

    scope "/auth" do
      post "/login", AuthController, :verify_name_password
      post "/token/verify", AuthController, :verify_platform_token
    end

    pipe_through :auth

    resources "/users", UserController
  end
end
