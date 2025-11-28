"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, BookOpen } from "lucide-react";
import Image from "next/image";
import heroPattern from "@/public/hero-pattern.jpg";
import Link from "next/link";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Animated Background Pattern */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent" />
        <Image
          src={heroPattern}
          alt=""
          width={1200}
          height={1200}
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
      </motion.div>

      <motion.div
        className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-secondary/30 to-accent/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-right order-2 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  پلتفرم نسل جدید
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="block mb-2"
                >
                  <span className="text-foreground">مدیریت </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-l from-primary via-secondary to-primary">
                    هوشمند
                  </span>
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="block text-foreground"
                >
                  مقالات علمی
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                سیستم یکپارچه برای اشتراک‌گذاری، ارزیابی و مدیریت مقالات علمی با
                همکاری اساتید و محققان برتر
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-elegant hover:shadow-glow transition-smooth gradient-primary group"
                >
                  <Link href="/auth/login">شروع رایگان</Link>
                  <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-2 transition-smooth" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-smooth"
                >
                  <BookOpen className="ml-2 w-5 h-5" />
                  <span>مشاهده راهنما</span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative w-full max-w-md mx-auto lg:max-w-none">
                {/* Main Card */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 bg-card border-2 border-primary/20 rounded-3xl p-6 sm:p-8 shadow-elegant backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-2 bg-muted/50 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-2 bg-muted rounded w-full" />
                    <div className="h-2 bg-muted rounded w-full" />
                    <div className="h-2 bg-muted rounded w-4/5" />
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      علمی
                    </div>
                    <div className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs">
                      تایید شده
                    </div>
                  </div>
                </motion.div>

                {/* Floating Cards */}
                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-6 -right-6 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-secondary/90 to-secondary-dark rounded-2xl shadow-glow flex items-center justify-center"
                >
                  <div className="text-center text-white">
                    <div className="text-3xl sm:text-4xl font-bold mb-1">
                      +۱۰۰۰
                    </div>
                    <div className="text-xs sm:text-sm opacity-90">مقاله</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    x: [0, -10, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-6 -left-6 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-accent/90 to-accent rounded-2xl shadow-glow flex items-center justify-center"
                >
                  <div className="text-center text-foreground">
                    <div className="text-3xl sm:text-4xl font-bold mb-1">
                      ۹۵٪
                    </div>
                    <div className="text-xs sm:text-sm opacity-90">رضایت</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
