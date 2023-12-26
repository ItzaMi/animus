"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mood, getMoods, saveMood } from "@/lib/appwrite";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const MoodPage = () => {
  const [chosenMood, setChosenMood] = useState<Mood | null>(null);
  const [why, setWhy] = useState<string | null>(null);

  const {
    isLoading,
    isError,
    data: moodsData,
    error,
  } = useQuery({
    queryKey: ["moods"],
    queryFn: getMoods,
  });

  const mutation = useMutation({
    mutationFn: saveMood,
  });

  const handleSubmit = async () => {
    if (!chosenMood) return;

    try {
      await mutation.mutateAsync({
        mood: chosenMood,
        reason: why,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-4 border-slate-200 border rounded-xl mx-4 shadow-md">
      {moodsData && moodsData.documents.length > 0 && (
        <div>
          <p>How are you feeling today?</p>
          <div className="flex gap-2 flex-wrap">
            {moodsData.documents.map((mood: Mood) => {
              return (
                <button
                  key={mood.$id}
                  className={cn(
                    "px-2 py-1 text-sm border-slate-500 border rounded-md text-center hover:bg-slate-900 hover:text-white cursor-pointer transition duration-200 ease-in-out",
                    chosenMood === mood ? "bg-slate-900 text-white" : ""
                  )}
                  onClick={() => {
                    if (chosenMood === mood) {
                      setChosenMood(null);
                    } else if (mood !== chosenMood) {
                      setChosenMood(mood);
                    } else if (chosenMood === null) {
                      setChosenMood(mood);
                    }
                  }}
                >
                  {mood.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <p>Do you know why you are feeling like that?</p>
        <Textarea onChange={(e) => setWhy(e.target.value)} />
      </div>

      <div className="flex flex-row w-full justify-end" onClick={handleSubmit}>
        <Button>Log</Button>
      </div>
    </div>
  );
};

export default MoodPage;
