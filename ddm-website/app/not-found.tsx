import MonogramOverlay from "@/components/ui/MonogramOverlay";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div id="main-content" className="bg-background min-h-screen flex items-center justify-center relative overflow-hidden">
      <MonogramOverlay
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        opacity={0.03}
        size="text-[30rem]"
      />

      <div className="relative z-10 text-center px-6">
        <h1 className="font-headline italic text-6xl text-on-surface">
          Lost in the Collection
        </h1>
        <p className="text-on-surface-variant text-lg mt-6 max-w-md mx-auto text-center">
          The page you&apos;re looking for has been relocated or no longer
          exists.
        </p>
        <div className="mt-12 flex gap-6 justify-center">
          <Button variant="primary" href="/">
            Return to Gallery
          </Button>
          <Button variant="secondary" href="/contact">
            Contact Concierge
          </Button>
        </div>
      </div>
    </div>
  );
}
