"use client";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { mockedList } from "./api/list/items";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SignInPage() {
  const [list, setList] = useState<typeof mockedList>(mockedList);
  const { data, status } = useSession();

  return (
    <main className="w-full flex flex-col bg-slate-950 h-dvh">
      <section className="w-[70%] bg-slate-200 flex container justify-end">
        {status === "unauthenticated" ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Add new item</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>You must be logged to add 😀</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button asChild>
            <Link href="/register">Add new Item</Link>
          </Button>
        )}
      </section>
      <section className="container text-white">
        <Table className="grow">
          <TableCaption>
            <h2 className="text-white">Listing your items</h2>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Items</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((items, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{items.name}</TableCell>
                <TableCell>{items.type}</TableCell>
                <TableCell>{items.price}</TableCell>
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
    </main>
  );
}
