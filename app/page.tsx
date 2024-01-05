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

export default function ListingPage() {
  const { status } = useSession();
  const { toast } = useToast();

  const totalValue = () => {
    const values = mockedList.map((i) => i.price);
    const refined = values.map((i) => i.includes("$").replace("$", ""));
    console.log(refined);

    console.log(values);
    return values
      .map(Number)
      .reduce((acc, total) => acc + total, 0)
      .toFixed(2);
  };

  const handleAdd = (item: IProducts) => {
    if (status === "unauthenticated") {
      return toast({
        title: "You must be logged to create/add an item!",
        description: "Please click on Sign in to create a new item",
        action: (
          <ToastAction altText="Log in" asChild>
            <Link href={"/api/auth/signin"}>Log in</Link>
          </ToastAction>
        ),
      });
    }
    toast({
      title: `${item.name} has been added to cart`,
      description: "Check the Cart!",
    });
    cartList.push(item);
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
            <h3 className="text-white text-2xl font-medium border-b-[1px] border-gray-700 ">
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

          <Table className="text-white w-[80%] my-5 mx-auto">
            <TableHeader className="bg-gray-300">
              <TableRow>
                <TableHead>Item ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockedList?.map((items: IProducts, idx) => (
                <TableRow key={idx}>
                  <TableCell>{1 + idx}</TableCell>
                  <TableCell>{items.name}</TableCell>
                  <TableCell>{items.type}</TableCell>
                  <TableCell>
                    {items.price.includes("$")
                      ? `${items.price}`
                      : `$${items.price}`}
                  </TableCell>
                  <TableCell className="text-right">
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
        </>
      )}
    </main>
  );
}
