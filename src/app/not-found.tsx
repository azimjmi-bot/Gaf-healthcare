import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-32 text-center md:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-heading text-5xl">This page is not on the itinerary.</h1>
      <p className="mt-4 text-muted-foreground">
        GAF Healthcare has four rooms: doctors, hospitals, treatment cost, and blogs.
      </p>
      <nav className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <Link href="/doctors" className="underline-offset-4 hover:underline">
          Doctors
        </Link>
        <Link href="/hospitals" className="underline-offset-4 hover:underline">
          Hospitals
        </Link>
        <Link href="/costs" className="underline-offset-4 hover:underline">
          Treatment Cost
        </Link>
        <Link href="/blogs" className="underline-offset-4 hover:underline">
          Blogs
        </Link>
      </nav>
    </section>
  );
}
