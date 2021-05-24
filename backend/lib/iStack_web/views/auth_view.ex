defmodule IStackWeb.AuthView do
  use IStackWeb, :view

  def render("token_response.json", %{user: user, access_token: jwt}) do
    %{
      user: render_one(user, IStackWeb.UserView, "user.json"),
      jwt: jwt
    }
  end

  def render("error.json", %{error: error, message: message}) do
    %{
      message: message,
      error: error
    }
  end
end
