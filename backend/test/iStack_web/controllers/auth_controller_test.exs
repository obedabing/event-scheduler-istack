defmodule IStackWeb.AuthControllerTest do
  use IStackWeb.ConnCase

  alias IStack.Account
  alias IStack.Auth.Guardian

  @create_attrs %{
    name: "some name",
    password: "some password",
    type: "some type"
  }

  def fixture(:user) do
    {:ok, user} = Account.create_user(@create_attrs)
    user
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "login user" do
    setup [:create_user]

    test "name and password", %{conn: conn} do
      conn = post(conn, Routes.auth_path(conn, :verify_email_password), name: "some name", password: "some password")
       
      assert %{
        "jwt" => jwt,
        "user" => _,
      } = json_response(conn, 200)

      assert not is_nil jwt
    end

    test "verify platform token", %{conn: conn, user: user} do
      {:ok, token, _} = Guardian.encode_and_sign(user)
      conn = post(conn, Routes.auth_path(conn, :verify_platform_token), token: token)

      assert %{
        "jwt" => jwt,
        "user" => _,
      } = json_response(conn, 200)

      assert not is_nil jwt
    end
  end

  defp create_user(_) do
    user = fixture(:user)
    {:ok, user: user}
  end
end
