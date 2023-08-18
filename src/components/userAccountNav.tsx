"use client";

import Link from "next/link";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import UserAvatar from "./userAvatar";
import { LogOut } from "lucide-react";

export default function UserAccountNav({
  user,
}: {
  user: Pick<User, "id" | "name" | "email" | "image">;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">Hello</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600"
          onClick={(e) => {
            e.preventDefault();
            signOut().catch(console.error);
          }}
        >
          Sign Out <LogOut className="ml-1 h-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
