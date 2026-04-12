import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VEHICLES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

import ScrollReveal from "@/components/animation/ScrollReveal";
import NumberCounter from "@/components/animation/NumberCounter";

// Image URLs from design
const GALLERY_MAIN =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZJQ73nGHEcjj8n6sKOjq2K9MUDCWxdZo0aUZJzpwwYXAk1HeltuplDWMU-6Ar2XoQD5g1y5C3ZVb5vVjrAvIqi0aoIEIB8Pp4aLfM07MlACvKY39pzW-tFzRtgwS5nCzBtI34ars3x-f3Os0tr-GIYhnR7_PIgI52VduN6JhhuyfdbOHelSpnSieY-XOD9mlmabn0_WWdF8GL8xxaAS5AGqujlSo07C5nF63_PAq9T9i16hmdnu1oKJDXY5eTotfdxmPQ5y6zPA";
const GALLERY_DETAIL_1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjwlWhIF_c_rDX7N_C8MtDKM91T6amjPe6Yc5sXeRY4bUi_XA4MJz_MfEt2wYq1NxCaNAB9O1HM6zBMCMVLjsVtjOg7-SqnuAqOTp9qI5-9bDSpXvn5Ns2-bfF6C5dFiqkWVtC_y_ESxM-V-hg5xc8nrNHnk3QANK6nSOwnTsV4S_sYE5bT65MxjFwqxReY-6vIPRlntNNtz8iBHqDcFoPu9H0No66dOc4CwJSCZtMu3gf3JVJyYQMT29GcR0ZlFSkm_DcIAvUz4";
const GALLERY_DETAIL_2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDav4ywII-hr58jfxhnHOOm7DoCqmgWXi25mB0JXRwIoBRiRrxBwJNWqYw1fSPPZ3aOzd1NkBPEsV2k525Fyutr1zeUIWp3qcwz01gVg7rzddMQI3wbGgzOpav2NiDd0yRWh790Ms2mjrerJN9PKyEl_09qDJvUw2t6sDi6V2JiUF_W4ecsMoeC4oKYXQQHNOR02KmEerFyg-ncwc4-Hy6zXoMViqg8biR_4EcVF8_sgZ4PGoc_b6EbK9BdELzoRgQohtsdl0LP9bA";
const MAP_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB7JzaxsOIjSCbEfPEvfQ6WAt8EP3nCY2vDGazN47p1qMg5PeZx0DhXhTYYEofxQAL9X-HWid4maFxrmtbMlLzRUW5SDkDUynisn9qGpPEdqkDGubWkVWWogqu4ezoXDEk3gh0ko9euUkQsBUOTSJnceH2HorPJFlchQ5jRw3QiwO8v9JG6FAPybvzJ4chDNYnEJuHL8UEQz4hxyc_2z1jrSrlA-sN6n5PwRuJsOHNHpIOxkqaLlofmzyCLScEgRBf5TDMklAfhWSg";
const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBz1VKO7PPNLCY77sBOvIH-61n9xGWD2A25brleceAk-ZJBqK1zObAR2cDRP39wtH1UoMvS1tXwhPGsTP99yOdP4RxdI9C-q6vGM-dbF463n3ZegstH1UYhaIdm68v4j0iIw5ktcMVsNGjhlO9XDx_4F_x2nuHwbOxsYZF0ahMQ8wPitKE6j9f60teq3HBZTsHhWjmUt57OUue9SrPHDIg9OcdO2QmqBStyEz0mEhcyogtOjGCICzxVl99YdPbaNM3-BGgdfXyaeic";

export function generateStaticParams() {
  return VEHICLES.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = VEHICLES.find((v) => v.slug === slug);
  return {
    title: vehicle
      ? `${vehicle.year} ${vehicle.make} ${vehicle.model}`
      : "Vehicle",
    description: vehicle?.tagline,
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = VEHICLES.find((v) => v.slug === slug);

  if (!vehicle) {
    notFound();
  }

  // Use the design image for the GT3 RS, fallback to vehicle images for others
  const isGT3 = vehicle.slug === "porsche-911-gt3-rs";
  const heroImage = isGT3 ? HERO_IMG : vehicle.images.hero;
  const galleryMain = isGT3 ? GALLERY_MAIN : vehicle.images.gallery[0] ?? vehicle.images.hero;
  const galleryDetail1 = isGT3 ? GALLERY_DETAIL_1 : vehicle.images.gallery[1] ?? vehicle.images.hero;
  const galleryDetail2 = isGT3 ? GALLERY_DETAIL_2 : vehicle.images.gallery[2] ?? vehicle.images.hero;

  const specs = [
    {
      label: "Acceleration",
      value: parseFloat(vehicle.specs.acceleration),
      suffix: "s",
      unit: "0-60 MPH",
      decimals: 1,
    },
    {
      label: "Performance",
      value: vehicle.specs.horsepower,
      suffix: "",
      unit: "Horsepower",
      decimals: 0,
    },
    {
      label: "Velocity",
      value: vehicle.specs.topSpeed,
      suffix: "",
      unit: "Top Speed (MPH)",
      decimals: 0,
    },
  ];

  // Add downforce if available
  if (vehicle.specs.downforce) {
    const downforceNum = parseInt(
      vehicle.specs.downforce.replace(/[^0-9]/g, "")
    );
    specs.push({
      label: "Downforce",
      value: downforceNum,
      suffix: "",
      unit: "LBS AT 177 MPH",
      decimals: 0,
    });
  } else {
    // Add drivetrain as 4th stat
    specs.push({
      label: "Drivetrain",
      value: 0,
      suffix: vehicle.specs.drivetrain,
      unit: vehicle.specs.transmission,
      decimals: 0,
    });
  }

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative h-screen w-full flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="relative z-10 px-6 md:px-12 pb-24 max-w-7xl">
          <ScrollReveal>
            <p className="font-label text-primary tracking-[0.3em] uppercase mb-4 text-[10px]">
              {vehicle.tagline}
            </p>
            <h1 className="font-headline text-7xl md:text-[10rem] tracking-tight leading-[0.9] mb-8">
              {vehicle.model}{" "}
              <span className="block text-3xl font-headline italic font-light tracking-wide opacity-70 mt-4">
                {vehicle.year} Series
              </span>
            </h1>
            <div className="flex flex-wrap gap-4">
              {vehicle.specs.downforce && (
                <span className="bg-surface-container-highest px-4 py-2 text-[10px] tracking-widest font-bold uppercase border border-outline-variant/30">
                  Lightweight Carbon
                </span>
              )}
              <span className="bg-surface-container-highest px-4 py-2 text-[10px] tracking-widest font-bold uppercase border border-outline-variant/30">
                {vehicle.specs.drivetrain}
              </span>
              <span className="bg-surface-container-highest px-4 py-2 text-[10px] tracking-widest font-bold uppercase border border-outline-variant/30">
                {vehicle.specs.transmission}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Specs Grid ─── */}
      <section className="py-32 px-6 md:px-12 bg-surface">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-y border-outline-variant/30">
            {specs.map((stat, i) => (
              <div
                key={stat.label}
                className={`p-12 bg-surface-container-low transition-colors hover:bg-surface-container-high group ${
                  i < specs.length - 1
                    ? "md:border-r border-outline-variant/30"
                    : ""
                }`}
              >
                <p className="font-label text-[10px] tracking-[0.2em] text-on-surface-variant uppercase mb-12">
                  {stat.label}
                </p>
                {stat.label === "Drivetrain" ? (
                  <h3 className="font-headline text-7xl text-primary mb-2 group-hover:scale-105 transition-transform duration-500">
                    {stat.suffix}
                  </h3>
                ) : (
                  <h3 className="font-headline text-7xl text-primary mb-2 group-hover:scale-105 transition-transform duration-500">
                    <NumberCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </h3>
                )}
                <p className="font-label text-xs tracking-widest text-on-surface-variant uppercase">
                  {stat.unit}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ─── Gallery ─── */}
      <section className="py-32 px-6 md:px-12 space-y-12">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-8">
            <h2 className="font-headline text-5xl md:text-7xl tracking-tight max-w-2xl">
              Precision in every fiber. Engineered for the circuit.
            </h2>
            <span className="font-label text-[10px] tracking-[0.3em] uppercase text-outline">
              Ref. Gallery 01/24
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-12 gap-6">
            {/* Main Image */}
            <div className="col-span-12 md:col-span-8 h-[700px] bg-surface-container-lowest overflow-hidden">
              <img
                src={galleryMain}
                alt={`${vehicle.model} rear wing detail`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            {/* Detail Stack */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
              <div className="h-[338px] bg-surface-container-lowest overflow-hidden">
                <img
                  src={galleryDetail1}
                  alt={`${vehicle.model} brake detail`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="h-[338px] bg-surface-container-lowest overflow-hidden">
                <img
                  src={galleryDetail2}
                  alt={`${vehicle.model} interior detail`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── Atelier Info + Lease Sidebar ─── */}
      <section className="pb-32 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Atelier Info */}
        <div className="lg:col-span-8">
          <ScrollReveal>
            <div className="bg-surface-container-low p-10 md:p-16 relative overflow-hidden group border border-outline-variant/10">
              <div className="relative z-10">
                <p className="font-label text-[10px] tracking-[0.4em] text-primary uppercase mb-8">
                  Exclusive Opportunity
                </p>
                <h2 className="font-headline text-4xl md:text-6xl mb-12">
                  The Baldwin Park Atelier
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-on-surface-variant font-body leading-relaxed text-sm">
                  <p>
                    Located in the heart of the district, our Baldwin Park
                    Atelier serves as a sanctuary for automotive enthusiasts.
                    This {vehicle.model} is currently curated in a private
                    viewing vault, available for inspection by appointment only.
                  </p>
                  <p>
                    Every vehicle in our collection undergoes a rigorous
                    multi-point validation process by our master technicians. We
                    offer bespoke delivery services globally, ensuring your
                    masterpiece arrives in showroom condition.
                  </p>
                </div>
                <div className="mt-12 flex flex-wrap gap-12">
                  <div className="flex items-center gap-4">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      location_on
                    </span>
                    <span className="font-label text-[10px] tracking-widest uppercase">
                      15132 Arrow Hwy, Baldwin Park
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      verified
                    </span>
                    <span className="font-label text-[10px] tracking-widest uppercase">
                      Verified Provenance
                    </span>
                  </div>
                </div>
              </div>
              {/* Background decorative icon */}
              <div className="absolute -bottom-20 -right-20 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <span className="material-symbols-outlined text-[300px]">
                  architecture
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Lease Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 p-12 border border-outline-variant/30 bg-surface-container-high shadow-2xl">
            <div className="mb-12">
              <p className="font-label text-[10px] tracking-[0.2em] text-on-surface-variant uppercase mb-4">
                Current Acquisition Strategy
              </p>
              <h3 className="font-headline text-5xl mb-4">
                {formatCurrency(vehicle.monthlyLease)}
                <span className="text-xl font-headline italic ml-2 opacity-50">
                  /mo
                </span>
              </h3>
              <p className="text-[10px] text-on-surface-variant/70 uppercase tracking-widest leading-loose">
                24 Month Closed-End Lease. $45,000 Down Payment. Excl. Tax &amp;
                Title.
              </p>
            </div>
            <div className="space-y-4">
              <Link
                href="/contact"
                className="w-full py-6 bg-primary text-on-primary font-body text-[10px] font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-3 hover:brightness-110 transition-colors shadow-lg shadow-primary/20"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  mail
                </span>
                Request Private Viewing
              </Link>
              <Link
                href="/contact"
                className="w-full py-6 border border-outline-variant text-on-surface font-body text-[10px] font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-3 hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined">call</span>
                Contact Concierge
              </Link>
            </div>
            <div className="mt-12 pt-12 border-t border-outline-variant/30 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-widest uppercase opacity-60">
                  Odometer
                </span>
                <span className="font-headline text-2xl italic">
                  {vehicle.details.odometer}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-widest uppercase opacity-60">
                  Interior
                </span>
                <span className="font-headline text-2xl italic">
                  {vehicle.details.interior}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-widest uppercase opacity-60">
                  Transmission
                </span>
                <span className="font-headline text-2xl italic">
                  {vehicle.specs.transmission}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Map Section ─── */}
      <section className="h-[500px] w-full bg-surface-container-lowest grayscale contrast-125 brightness-50 relative overflow-hidden border-y border-white/5">
        <div className="w-full h-full relative">
          <img
            src={MAP_IMG}
            alt="Map view of Baldwin Park, California"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.4)]">
              <span
                className="material-symbols-outlined text-on-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                location_on
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
