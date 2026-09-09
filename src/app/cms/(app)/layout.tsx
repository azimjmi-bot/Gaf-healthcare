import { redirect } from "next/navigation";
import { CmsShell } from "@/components/cms/cms-shell";
import { isCmsSession } from "@/lib/cms/auth";

export const dynamic = "force-dynamic";

export default async function CmsAppLayout({ children }: { children: React.ReactNode }) {
  if (!(await isCmsSession())) {
    redirect("/cms/login");
  }
  return <CmsShell>{children}</CmsShell>;
}
