defmodule IStackWeb.AuthController do
  use IStackWeb, :controller

  alias IStack.Account
  alias IStack.Auth.Guardian

  def verify_platform_token(conn, %{"token" => token}) do
    with {:ok, claims} <- Guardian.decode_and_verify(token),
      %{"sub" => id} = claims do
      case Account.get_user!(id) do
        nil ->
          conn
          |> put_status(400)
          |> render("error.json", error: "Bad Request", message: "User not found")
        user ->
 
          conn
          |> put_status(200)
          |> render("token_response.json", user: user, access_token: token)
      end
    else
      {:error, _} ->
        {:error, :invalid_token}
    end
  end

  def verify_email_password(conn, %{"name" => name, "password" => password } = params) do
    case Account.get_user_by_name(name) do
      nil ->
        conn
        |> put_status(400)
        |> render("error.json", error: "Bad Request", message: "User not found")
      user ->
        with {:ok, _} <- Argon2.check_pass(user, password, hash_key: :password) do

          {:ok, jwt, _} = Guardian.encode_and_sign(user)
          conn
          |> put_status(200)
          |> render("token_response.json", user: user, access_token: jwt)
        end
    end
  end
end
