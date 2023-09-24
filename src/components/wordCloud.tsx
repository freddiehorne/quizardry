"use client";

import D3WordCloud from "react-d3-cloud";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const getFontSize = (word: { value: number }) => Math.log2(word.value) * 6 + 15;

export default function WordCloud({
  topics,
}: {
  topics: { text: string; value: number }[];
}) {
  const router = useRouter();
  const theme = useTheme();
  return (
    <D3WordCloud
      data={topics}
      padding={10}
      font="Times"
      fontSize={getFontSize}
      fill={theme.theme === "light" ? "black" : "white"}
      rotate={0}
      onWordClick={(event, word) => {
        router.push(`/quiz?topic=${word.text}`);
      }}
    />
  );
}
