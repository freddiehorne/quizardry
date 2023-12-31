"use client";

import Loading from "./loading";
import axios from "axios";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { BookOpen, CopyCheck } from "lucide-react";
import { newQuizSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type FormValues = z.infer<typeof newQuizSchema>;

type GameId = {
  gameId: string;
};

export default function NewQuiz({ topicParam }: { topicParam: string }) {
  const router = useRouter();
  const [isFinished, setIsFinished] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  const {
    mutate: getQuestions,
    isLoading,
  }: UseMutationResult<GameId, Error, FormValues> = useMutation({
    mutationFn: async ({
      amount,
      topic,
      type,
    }: FormValues): Promise<GameId> => {
      const { data } = await axios.post("api/game", {
        amount,
        topic,
        type,
      });

      return data;
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(newQuizSchema),
    defaultValues: {
      topic: topicParam,
      type: "multipleChoice",
      amount: 3,
    },
  });

  const onSubmit = (values: FormValues) => {
    setQuestionsLoading(true);
    getQuestions(
      {
        amount: values.amount,
        topic: values.topic,
        type: values.type,
      },
      {
        onSuccess: ({ gameId }) => {
          setIsFinished(true);
          setTimeout(() => {
            if (form.getValues("type") === "multipleChoice") {
              router.push(`/play/multiple-choice/${gameId}`);
            } else if (form.getValues("type") === "openEnded") {
              router.push(`/play/open-ended/${gameId}`);
            }
          }, 800);
        },
        onError: (error) => {
          setQuestionsLoading(false);
          console.error(error);
        },
      },
    );
  };

  // rerender to update the form state
  form.watch();

  if (questionsLoading) {
    return <Loading finished={isFinished} />;
  }

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className="min-w-[380px]">
        <CardHeader>
          <CardTitle>Create a New Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of questions</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          if (e.target.value === "") {
                            return form.setValue("amount", 0);
                          }
                          form.setValue("amount", parseInt(e.target.value, 10));
                        }}
                        placeholder="Enter a amount"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Type of quiz</FormLabel>
                <div className="flex justify-between">
                  <Button
                    className="w-1/2 rounded-none rounded-l-lg"
                    variant={
                      form.getValues("type") === "multipleChoice"
                        ? "default"
                        : "secondary"
                    }
                    onClick={() => form.setValue("type", "multipleChoice")}
                    type="button"
                  >
                    <CopyCheck className="mr-2 h-4 w-4" />
                    Multiple Choice
                  </Button>
                  <Separator orientation="vertical" />
                  <Button
                    className="w-1/2 rounded-none rounded-r-lg"
                    variant={
                      form.getValues("type") === "openEnded"
                        ? "default"
                        : "secondary"
                    }
                    onClick={() => form.setValue("type", "openEnded")}
                    type="button"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Open Ended
                  </Button>
                </div>
              </FormItem>

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
