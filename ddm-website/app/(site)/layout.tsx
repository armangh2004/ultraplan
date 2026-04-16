import SmoothScroll from "@/components/interactive/SmoothScroll";
import CustomCursor from "@/components/interactive/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
