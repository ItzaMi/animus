"use client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseUserNameIntoInitials = (name: string) => {
  const names = name.split(" ");
  const initials = names.map((name) => name[0]);
  return initials.join("");
};
