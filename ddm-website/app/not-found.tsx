import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="font-headline italic text-5xl text-on-surface mb-4">
          Page Not Found
        </h1>
        <p className="text-on-surface-variant text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary text-on-primary px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
