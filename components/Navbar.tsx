"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BurgerIcon from "@/public/burger-menu.svg";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";

import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

import { AvatarImage, Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { cartList } from "@/lib/mocked/list";

const Navbar = () => {
  const { data, status } = useSession();

  return (
    <main className="grow px-10 bg-slate-950 border-b-[1px] border-gray-200 py-4 text-white">
      <section className="flex justify-between  items-center">
        <div>
          {status === "unauthenticated" ? (
            <h2 className="text-xl">Welcome!</h2>
          ) : status !== "loading" ? (
            <div className="flex items-center gap-2">
              <div>Welcome, {data?.user?.name}</div>
              <Avatar>
                <AvatarImage src={data?.user?.image ?? ""} alt="user" />
              </Avatar>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-[20px] w-[20px] rounded" />
            </div>
          )}
        </div>

        {status === "loading" ? (
          <Skeleton className="h-4 w-[330px]" />
        ) : (
          <div className="mr-8">
            {status === "unauthenticated" ? (
              <Button variant="secondary" asChild>
                <Link href={"/api/auth/signin"}>Log in</Link>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="secondary" size="icon">
                    <Image src={BurgerIcon} alt="Menu" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Where to go?</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {status === "authenticated" && (
                    <DropdownMenuItem asChild>
                      <Link href="/add">Register Item</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/">List Items</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex align-middle gap-3">
                    <Link href={"/cart"}>
                      Card <Badge>{cartList.length}</Badge>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button variant="destructive" asChild>
                      <Link href={"/api/auth/signout"}>Sign out</Link>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Navbar;
