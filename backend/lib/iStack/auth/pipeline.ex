defmodule IStack.Auth.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :iStack,
    error_handler: IStack.Auth.ErrorHandler,
    module: IStack.Auth.Guardian

  # If there is a session token, restrict it to an access token and validate it
  plug Guardian.Plug.VerifySession, claims: %{"typ" => "access"}
  # If there is an authorization header, restrict it to an access token and validate it
  plug Guardian.Plug.VerifyHeader, claims: %{"typ" => "access"}
  plug(Guardian.Plug.EnsureAuthenticated)
  # Load the user if either of the verifications worked
  plug Guardian.Plug.LoadResource, allow_blank: true
end