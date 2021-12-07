defmodule Main do
  def run() do
    input = parse()

    IO.puts("One: ")
    solve(input, &Function.identity/1)

    IO.puts("Two: ")
    solve(input, &(div(&1 * (&1 + 1), 2)))
  end

  defp solve(input, sum_fn) do
    0..length(input)-1
    |> Enum.map(fn i ->
      input
      |> Enum.map(fn c -> sum_fn.(abs(i - c)) end)
      |> Enum.sum
    end)
    |> Enum.min
    |> IO.inspect
  end

  defp parse() do
    File.read!("./input.txt")
    |> String.trim
    |> String.split(",")
    |> Enum.map(&String.to_integer/1)
  end
end

Main.run()
