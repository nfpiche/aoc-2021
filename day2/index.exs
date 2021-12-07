defmodule Helper do
  def string_stream() do
    File.stream!("./input.txt") |> Stream.map(&String.trim/1)
  end

  def line_to_record(line) do
    [direction, amount] = String.split(line, " ")
    {direction, String.to_integer(amount)}
  end

  def count(record, {horizontal, vertical, depth}) do
    case record do
      {"up", x} ->
        {horizontal, vertical - x, depth}
      {"down", x} ->
        {horizontal, vertical + x, depth}
      {"forward", x} ->
        {horizontal + x, vertical, depth + (vertical * x)}
    end
  end

  def display({horizontal, vertical, depth}) do
    %{one: horizontal * vertical, two: horizontal * depth}
  end
end

Helper.string_stream()
|> Stream.map(&Helper.line_to_record/1)
|> Enum.reduce({0, 0, 0}, &Helper.count/2)
|> Helper.display()
|> IO.inspect()
