import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection.client";
import ProcessSection from "@/components/ProcessSection";
import { cookies } from "next/headers";

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
