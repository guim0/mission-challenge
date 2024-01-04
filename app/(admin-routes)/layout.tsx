import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

interface PrivateLayoutProps {
  children: React.ReactNode;
}
export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect("/");
  }

  return <>{children} </>;
}
