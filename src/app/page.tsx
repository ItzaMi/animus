"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addEmailToWaitingList, loginUser } from "@/lib/appwrite";
import { useMutation } from "@tanstack/react-query";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNotify = async () => {
    setIsLoading(true);
    addEmailToWaitingList(email)
      .then((res) => {
        if (!res) return;

        if (res.status === "200") {
          setIsEmailSent(true);
          setEmail("");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };

  const mutation = useMutation({
    mutationFn: loginUser,
  });

  const handleLogin = () => {
    mutation.mutateAsync().then((res) => {
      console.log(res);
    });
  };

  return (
    <main className="flex relative h-screen flex-col md:flex-row items-center md:justify-between">
      <div className="absolute right-3 bottom-3 text-gray-400 text-sm">
        Being built by{" "}
        <a
          href="https://twitter.com/HeyItzaMi"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Rui Sousa
        </a>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center md:flex-1 bg-hero-gradient md:h-full w-full py-10">
        <div>
          <h1 className="text-6xl font-bold text-gray-800">
            Welcome to
            <br />
            Animus
          </h1>
          <p className="text-xl mt-2">
            A day-to-day event tracker for
            <br />
            anticipatory anxiety
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center justify-center md:flex-1 p-5 md:p-10">
        <div className="max-w-lg flex flex-col gap-2">
          <p className="text-xl">
            For someone with depression or anxiety, the thought of doing
            something can be worse than the actual task itself.
          </p>
          <p className="text-xl">
            Designed for those battling depression or anxiety, Animus is being
            built as a tool to help you identify triggers and track progress.
          </p>
          {!isEmailSent && (
            <div className="mt-4 flex flex-col gap-2">
              <p>
                If this sounds valuable to you, consider leaving your email
                below to get notified when we launch!
              </p>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  if (error) {
                    setError("");
                  }
                  setEmail(e.target.value);
                }}
              />
              {error && <p className="text-red-500">{error}</p>}
              <Button onClick={handleNotify} disabled={isLoading}>
                I want to get news from Animus!
              </Button>
            </div>
          )}
          {isEmailSent && (
            <div className="text-emerald-600">
              <p>Thanks for your support!</p>
              <p>
                Feel free to follow the developments on{" "}
                <a
                  href="https://twitter.com/HeyItzaMi"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Twitter
                </a>
              </p>
            </div>
          )}
          <Button onClick={handleLogin}>Login with Google</Button>
        </div>
      </div>
    </main>
  );
}
