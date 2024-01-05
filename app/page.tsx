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
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { IProducts, cartList, mockedList } from "../lib/mocked/list";
import { useEffect, useState } from "react";

export default function ListingPage() {
  const [listing, setListing] = useState(mockedList);
  const { status } = useSession();
  const { toast } = useToast();

  const totalValue = () => {
    const values = mockedList.map((i) => i.price);
    return values
      .map(Number)
      .reduce((acc, total) => acc + total, 0)
      .toFixed(2);
  };

  const handleAdd = (handleAdd: IProducts) => {
    cartList.push(handleAdd);
  };

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
          <section className="flex container justify-between mt-8">
            <h3 className="text-white text-2xl font-medium border-b-[1px] border-gray-700 border-bot">
              Add Items to your card or Create a new one
            </h3>
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
                Add More Items
              </Button>
            ) : (
              <div className="flex align-baseline gap-5">
                <Button asChild>
                  <Link href="/add">Create new Item</Link>
                </Button>

                <Button asChild>
                  <Link href="/cart">Go to Cart</Link>
                </Button>
              </div>
            )}
          </section>
          <section className="container text-white">
            <Table>
              <TableCaption>
                <h2 className="text-white">Preview of your list</h2>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Item ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listing?.map((items: IProducts, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{1 + idx}</TableCell>
                    <TableCell className="font-medium">{items.name}</TableCell>
                    <TableCell>{items.type}</TableCell>
                    <TableCell>${items.price}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleAdd(...[items])}>
                        Add to Card
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell className="text-right">${totalValue()}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </section>
        </>
      )}
    </main>
  );
}
