"use client";

import D3WordCloud from "react-d3-cloud";
import { useTheme } from "next-themes";

const data = [
  { text: "Hey", value: 2 },
  { text: "lol", value: 5 },
  { text: "first impression", value: 6 },
  { text: "very cool", value: 7 },
  { text: "duck", value: 56 },
  { text: "dog", value: 65 },
  { text: "cat", value: 4 },
  { text: "pig", value: 6 },
  { text: "coffee", value: 48 },
  { text: "tea", value: 2 },
  { text: "milk", value: 23 },
  { text: "water", value: 6 },
  { text: "juice", value: 17 },
  { text: "soda", value: 27 },
  { text: "wine", value: 48 },
  { text: "beer", value: 92 },
];

const getFontSize = (word: { value: number }) => Math.log2(word.value) * 6 + 15;

export default function WordCloud() {
  const theme = useTheme();
  return (
    <D3WordCloud
      data={data}
      padding={10}
      font="Times"
      fontSize={getFontSize}
      fill={theme.theme === "light" ? "black" : "white"}
      rotate={0}
    />
  );
}
