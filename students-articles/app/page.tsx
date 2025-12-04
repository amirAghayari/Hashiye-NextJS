import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection.client";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";

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
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <CTASection />
    </div>
  );
};

export default Home;
