import { Masthead } from "@/components/home/Masthead";
import { Hero } from "@/components/home/Hero";
import { Roles } from "@/components/home/Roles";
import { ArticlePath } from "@/components/home/ArticlePath";
import { Closing } from "@/components/home/Closing";

// Public and static: no article data lives here, by design.
export default function Home() {
  return (
    <>
      <Masthead />
      <Hero />
      <Roles />
      <ArticlePath />
      <Closing />
    </>
  );
}
