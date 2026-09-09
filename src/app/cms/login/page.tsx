import { Suspense } from "react";
import CmsLoginForm from "./login-form";

export default function CmsLoginPage() {
  return (
    <Suspense fallback={<div className="cms-login">Loading…</div>}>
      <CmsLoginForm />
    </Suspense>
  );
}

