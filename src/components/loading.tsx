import Image from "next/image";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

const loadingTexts = [
  "Generating questions...",
  "Unleashing the power of curiosity...",
  "Diving deep into the ocean of questions..",
  "Harnessing the collective knowledge of the cosmos...",
  "Igniting the flame of wonder and exploration...",
];

export default function Loading({ finished }: { finished: boolean }) {
  const [progress, setProgress] = useState(10);
  const [loadingText, setLoadingText] = useState(loadingTexts[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setLoadingText(loadingTexts[randomIndex]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100;
        if (prev === 100) {
          return 0;
        }
        if (Math.random() < 0.1) {
          return prev + 2;
        }
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [finished]);
  return (
    <div className="absolute left-1/2 top-1/2 flex w-[70vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center md:w-[60vw]">
      <Image src={"/loading.gif"} width={400} height={400} alt="loading" />
      <Progress value={progress} className="mt-4 w-full" />
      <h1 className="mt-2 text-xl">{loadingText}</h1>
    </div>
  );
}
