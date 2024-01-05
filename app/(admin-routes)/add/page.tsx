"use client";

import { mockedList } from "@/lib/mocked/list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputMoney from "@/components/InputMoney";

const RegisterPage = () => {
  const [nameItem, setNameItem] = useState<string>("");
  const [typeItem, setTypeItem] = useState<string>("Default");
  const [priceItem, setPriceItem] = useState<string>("default");

  const { push, back } = useRouter();
  const handleNewItem = () => {
    if (nameItem.length <= 2) {
      return toast({
        title: "Please insert a longer name",
      });
    }
    const newItem = {
      name: nameItem,
      type: typeItem,
      price: priceItem,
    };
    toast({
      title: "New Item Added!",
      description: "Check your listing",
    });

    mockedList.push(newItem);
    push("/");
  };

  return (
    <main className="w-full  bg-slate-950 h-dvh px-6">
      <div className="py-3">
        <Button onClick={() => back()}>Return</Button>
      </div>
      <section className="container max-w-[550px] pt-12">
        <form className="bg-gray-700 w-full p-5 rounded-sm flex flex-col gap-6">
          <h2 className="text-2xl font-medium text-white">Create new item</h2>
          <div>
            <Label className="text-white" htmlFor="item">
              Item Name
            </Label>
            <Input
              name="item"
              placeholder="Name of the item"
              type="text"
              maxLength={35}
              onChange={(e) => setNameItem(e.currentTarget.value)}
            />
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Type of product</h3>
            <RadioGroup defaultValue="default" className="text-white">
              <div
                className="flex items-center space-x-2"
                onClick={() => {
                  setTypeItem("Default");
                }}
              >
                <RadioGroupItem value="default" id="default" />
                <Label htmlFor="default">Default</Label>
              </div>
              <div
                className="flex items-center space-x-2"
                onClick={() => {
                  setTypeItem("Limited");
                }}
              >
                <RadioGroupItem value="limited" id="limited" />
                <Label htmlFor="limited">Limited</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label className="text-white" htmlFor="Price">
              Item Price
            </Label>
            <InputMoney
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Price of the item"
              onChange={(e) => setPriceItem(e.currentTarget.value)}
            />
          </div>
          <Button type="button" onClick={() => handleNewItem()}>
            Submit
          </Button>
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;
