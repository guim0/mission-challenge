"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

import { toast } from "@/components/ui/use-toast";
import { IProducts, cartList } from "@/lib/mocked/list";
import { useSession } from "next-auth/react";
import { useState } from "react";

const CartPage = () => {
  const { status } = useSession();
  const [clear, setClear] = useState(false);

  const totalValue = () => {
    const values = cartList.map((i) => i.price);
    return values
      .map(Number)
      .reduce((acc, total) => acc + total, 0)
      .toFixed(2);
  };

  const clearCart = () => {
    toast({
      title: "Cart Cleared!",
      description: "Go back to listing to add more!",
      duration: 3000,
    });

    setClear(true);

    return cartList.splice(0, cartList.length);
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
            <h3 className="text-white text-2xl font-medium border-b-[1px] border-gray-700">
              This is your Cart
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
                Add new item
              </Button>
            ) : (
              <div className="flex align-baseline gap-5">
                <Button asChild>
                  <Link href="/">Return to Listing</Link>
                </Button>

                <Button
                  onClick={() => {
                    clearCart();
                  }}
                >
                  Clear cart
                </Button>
              </div>
            )}
          </section>

          <Table className="text-white w-[80%] my-5 mx-auto">
            <TableHeader className="bg-gray-300 w-full">
              <TableRow>
                <TableHead>Items</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>

            {clear ? (
              <></>
            ) : (
              <TableBody>
                {cartList.map((items: IProducts, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{1 + idx}</TableCell>
                    <TableCell className="font-medium">{items.name}</TableCell>
                    <TableCell>{items.type}</TableCell>
                    <TableCell>${items.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}

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
};

export default CartPage;
