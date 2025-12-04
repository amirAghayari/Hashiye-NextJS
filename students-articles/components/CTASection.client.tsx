"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-10" />

      <motion.div
        className="absolute top-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-elegant">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Sparkles className="w-16 h-16 text-accent" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-16 h-16 text-primary/30" />
                </motion.div>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-clip-text text-primary/80 bg-gradient-to-r from-primary via-secondary to-accent">
                آماده برای شروع؟
              </span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed px-4">
              همین حالا به جمع هزاران محقق و استاد دانشگاهی بپیوندید و از
              امکانات پیشرفته سامانه بهره‌مند شوید
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 shadow-elegant hover:shadow-glow transition-smooth gradient-primary group"
                >
                  <span>عضویت رایگان</span>
                  <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-smooth" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-smooth"
              >
                تماس با ما
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground mt-6 sm:mt-8">
              🎓 ویژه دانشجویان و اساتید دانشگاهی
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
