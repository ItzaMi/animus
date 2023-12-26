"use client";
import { useEffect, useState } from "react";

import { getUser } from "@/lib/appwrite";
import { parseUserNameIntoInitials } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const DashboardLayout: React.FC<{ children: React.ReactNode[] }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      await getUser().then((user) => {
        console.log(user);
        setUser(user);
      });
    };

    fetchUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="">
      <div className="px-4 py-2 border-b border-solid border-zinc-200 flex items-center justify-between">
        <Link href="/dashboard">Animus</Link>
        <Avatar>
          <AvatarFallback>
            {parseUserNameIntoInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
