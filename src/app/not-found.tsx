import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-32 text-center md:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-heading text-5xl">This page is not on the itinerary.</h1>
      <p className="mt-4 text-muted-foreground">
        Return home, or open a dossier and we will chart the rest.
      </p>
      <Link href="/" className="mt-8 inline-block text-sm underline-offset-4 hover:underline">
        Back to Velora
      </Link>
    </section>
  );
}
