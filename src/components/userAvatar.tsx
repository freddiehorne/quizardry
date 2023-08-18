import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { User } from "next-auth";

export default function UserAvatar({
  user,
}: {
  user: Pick<User, "name" | "image">;
}) {
  return (
    <Avatar>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            src={user.image}
            fill
            alt={`${user.name} profile picture`}
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
}
