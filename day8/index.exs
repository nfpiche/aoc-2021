defmodule Main do
  def run() do
    input = parse()
    solve(input)
  end

  defp solve(input) do
    input |> Enum.map(fn line -> String.split(line, " | ") end) |> Enum.map(fn [segments, digits] ->
      segments
      |> String.split(" ")
      |> Enum.frequencies_by(&String.graphemes/1)
      |> IO.inspect
    end)
  end

  defp parse() do
    File.read!("./input.txt")
    |> String.trim
    |> String.split("\n")
  end
end

Main.run()
