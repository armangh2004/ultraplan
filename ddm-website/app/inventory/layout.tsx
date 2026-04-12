import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Reserve Inventory",
  description:
    "Explore our strictly vetted selection of high-performance vehicles and luxury grand tourers. Every unit is a masterpiece of engineering.",
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
