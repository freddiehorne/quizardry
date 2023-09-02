import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secs = Math.floor(seconds - hours * 3600 - minutes * 60);
  const timeString = [];
  if (hours > 0) timeString.push(`${hours}h`);
  if (minutes > 0) timeString.push(`${minutes}m`);
  if (secs > 0) timeString.push(`${secs}s`);

  return timeString.join(" ");
};
