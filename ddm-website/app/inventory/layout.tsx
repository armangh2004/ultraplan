import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Reserve Collection",
  description:
    "Explore our curated vehicle categories — from exotic coupes to luxury SUVs. Any car can be sourced based on your financing and credit profile.",
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
