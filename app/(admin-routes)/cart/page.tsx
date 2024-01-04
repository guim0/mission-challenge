"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

import { toast } from "@/components/ui/use-toast";
import { mockedList } from "@/app/api/list/items";
import { useSession } from "next-auth/react";

const CartPage = () => {
  const { status } = useSession();
  return (
    <main className="w-full flex flex-col bg-slate-950 h-dvh">
      {status === "loading" ? (
        <section className="w-full items-center flex flex-col gap-6 my-[25vh]">
          <Skeleton className="h-4 w-[800px]" />
          <Skeleton className="h-4 w-[800px]" />
          <Skeleton className="h-4 w-[800px]" />
          <Skeleton className="h-4 w-[800px]" />
          <Skeleton className="h-4 w-[800px]" />
          <Skeleton className="h-4 w-[800px]" />
        </section>
      ) : (
        <>
          <section className="flex container justify-end mt-8">
            {status === "unauthenticated" ? (
              <Button
                variant="secondary"
                onClick={() => {
                  toast({
                    title: "You must be logged to create/add an item!",
                    description: "Please click on Sign in to create a new item",
                    action: (
                      <ToastAction altText="Log in" asChild>
                        <Link href={"/api/auth/signin"}>Log in</Link>
                      </ToastAction>
                    ),
                  });
                }}
              >
                Add new item
              </Button>
            ) : (
              <Button asChild>
                <Link href="/add">Add new Item</Link>
              </Button>
            )}
          </section>
          <section className="container text-white">
            <Table>
              <TableCaption>
                <h2 className="text-white">Listing your items</h2>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Items</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockedList.map((items, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{1 + idx}</TableCell>
                    <TableCell className="font-medium">{items.name}</TableCell>
                    <TableCell>{items.type}</TableCell>
                    <TableCell>${items.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">
                    $
                    {mockedList.reduce(
                      (total, items) =>
                        total + parseFloat(+`${items.price}` as any),
                      0
                    )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </section>
        </>
      )}
    </main>
  );
};

export default CartPage;
