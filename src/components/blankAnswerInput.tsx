import keyword_extractor from "keyword-extractor";
import { useMemo } from "react";

export default function BlankAnswerInput({ answer }: { answer: string }) {
  const BLANK = "_______";

  const keywords = useMemo(() => {
    const words = keyword_extractor.extract(answer, {
      language: "english",
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: false,
    });
    const shuffledWords = words.sort(() => Math.random() - 0.5);
    return shuffledWords.slice(0, 2);
  }, [answer]);

  const blankedOutAnswer = useMemo(() => {
    const answerWithBlanks = keywords.reduce((acc, keyword) => {
      return acc.replace(keyword, BLANK);
    }, answer);
    return answerWithBlanks;
  }, [answer, keywords]);

  return (
    <div className="mt-4 flex w-full justify-start">
      <p className="text-xl font-semibold">
        {blankedOutAnswer.split(BLANK).map((part, i) => {
          return (
            <span key={i}>
              {part}
              {i !== blankedOutAnswer.split(BLANK).length - 1 && (
                <input
                  type="text"
                  className="mx-1 h-8 w-32 border-b-2 border-black text-center focus:border-2 focus:border-b-4 focus:outline-none dark:border-white"
                />
              )}
            </span>
          );
        })}
      </p>
    </div>
  );
}
