import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  console.log({ session });

  return (
    <main className="flex flex-col content-start  p-16">
      <h1>Search Gutenberg books by ID</h1>
    </main>
  );
}
