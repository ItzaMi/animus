"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUser } from "@/lib/appwrite";
import { parseUserNameIntoInitials } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const DashboardLayout: React.FC<{ children: React.ReactNode[] }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      await getUser()
        .then((user) => {
          console.log("3", user);
          if (!user) {
            router.push("/");
          } else {
            setUser(user);
          }
        })
        .catch(() => {
          router.push("/");
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false when the fetch ends
        });
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="px-4 h-12 border-b border-solid border-zinc-200 flex items-center justify-between">
        <Link href="/dashboard">Animus</Link>
        {user && (
          <Avatar>
            <AvatarFallback>
              {parseUserNameIntoInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      <div className="p-4 h-[calc(100vh-40px)]">{children}</div>
    </div>
  );
};

export default DashboardLayout;
