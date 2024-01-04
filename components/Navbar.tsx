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
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

import { AvatarImage, Avatar } from "./ui/avatar";

const Navbar = () => {
  const { data, status } = useSession();
  return (
    <main className="grow px-10 bg-slate-900 border-b-[1px] border-gray-200 py-4 text-white">
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

        <div className="mr-8">
          {status === "unauthenticated" ? (
            <Button variant="secondary" asChild>
              <Link href={"/api/auth/signin"}>Entrar</Link>
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
                <DropdownMenuItem>Register Item</DropdownMenuItem>
                <DropdownMenuItem>List Items</DropdownMenuItem>
                <DropdownMenuItem>Card</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button variant="destructive" asChild>
                    <Link href={"/api/auth//signout"}>Sair</Link>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </section>
    </main>
  );
};

export default Navbar;
