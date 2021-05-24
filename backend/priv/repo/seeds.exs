# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     IStack.Repo.insert!(%IStack.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias IStack.Account

Account.create_user(%{
  name: "istack",
  password: "istack",
  type: "ADMIN",
})
