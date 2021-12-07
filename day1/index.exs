defmodule Helper do
  def int_stream() do
    File.stream!("./input.txt") |> Stream.map(&String.trim/1) |> Stream.map(&String.to_integer/1)
  end

  def count_smaller([a, b]) do
    a < b
  end
end

Helper.int_stream()
  |> Stream.chunk_every(2, 1, :discard)
  |> Enum.count(&Helper.count_smaller/1)
  |> IO.inspect()

Helper.int_stream()
  |> Stream.chunk_every(3, 1, :discard)
  |> Stream.map(&Enum.sum/1)
  |> Stream.chunk_every(2, 1, :discard)
  |> Enum.count(&Helper.count_smaller/1)
  |> IO.inspect()
