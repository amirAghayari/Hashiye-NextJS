import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection.client";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import CTASectionClient from "@/components/CTASection.client";
import HeroSectionClient from "@/components/HeroSection.client";

const FeaturesSection = dynamic(
  () => import("@/components/FeatureSection"),
  {}
);
const ProcessSection = dynamic(
  () => import("@/components/ProcessSection.client")
);

const Home = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  return (
    <div className="min-h-screen">
      <HeroSectionClient />
      <FeaturesSection />
      <ProcessSection />
      <CTASectionClient />
    </div>
  );
};

export default Home;
