import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FileText, Award, CheckCircle, BookOpen } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

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
