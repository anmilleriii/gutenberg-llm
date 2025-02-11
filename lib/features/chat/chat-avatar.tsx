"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";

interface AgentAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
}

export function AgentAvatar({ fallback, name, src }: AgentAvatarProps) {
  return (
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarImage
        src={src}
        alt={name}
        className="object-cover h-10 w-10 p-1 rounded-lg bg-sidebar-accent"
      />
      <AvatarFallback className="rounded-lg uppercase">
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
}

export function UserAvatar() {
  const { data } = useSession();
  const { image, name, email } = data?.user ?? {};

  return (
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarImage
        src={image ?? undefined}
        alt={name ?? undefined}
        className="object-cover h-10 w-10 p-1 rounded-lg bg-sidebar-accent"
      />
      <AvatarFallback className="rounded-lg uppercase">
        {email?.[0]}
      </AvatarFallback>
    </Avatar>
  );
}
