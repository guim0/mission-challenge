import { Button } from "@/components/ui/button";
import GithubLogo from "@/public/github.svg";
import GoogleLogo from "@/public/google.svg";

import Image from "next/image";
import { Input } from "./ui/input";

const SignInCard = () => {
  return (
    <main className="container rounded-sm my-0 mx-auto flex flex-col w-[320px] border-slate-300 border-[1px] h-[320px] gap-5">
      <h1 className="text-gray-600 text-center text-3xl my-3">
        Welcome to the Dashboard
      </h1>

      <section>
        <Input />
      </section>
      <section className=" flex flex-col gap-3">
        <div className="flex justify-center">
          <Button className="flex align-middle">
            <div className="w-[28px] h-[28px] bg-white rounded-sm flex justify-center items-center mr-2">
              <Image src={GithubLogo} className="w-[95%]" alt="Github" />
            </div>
            Continue with Github
          </Button>
        </div>
        <div className="flex justify-center">
          <Button className="flex align-middle">
            <div className="w-[28px] h-[28px] bg-white rounded-sm flex justify-center items-center mr-2">
              <Image src={GoogleLogo} className="w-[95%]" alt="Github" />
            </div>
            Continue with Google
          </Button>
        </div>
      </section>
    </main>
  );
};

export default SignInCard;
