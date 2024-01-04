import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface PrivateLayoutProps {
  children: React.ReactNode;
}
export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <>{children}</>;
}
