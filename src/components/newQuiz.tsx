"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { BookOpen, CopyCheck } from "lucide-react";
import { Separator } from "./ui/separator";
import { newQuizSchema } from "@/schemas";

type FormValues = z.infer<typeof newQuizSchema>;

export default function NewQuiz() {
  const form = useForm<FormValues>({
    resolver: zodResolver(newQuizSchema),
    defaultValues: {
      topic: "",
      type: "multipleChoice",
      amount: 3,
    },
  });

  const onSubmit = (values: FormValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  // rerender to update the form state
  form.watch();

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
