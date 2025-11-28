"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  Search,
  CheckCircle2,
  Download,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "ثبت نام کنید",
    description: "به عنوان دانشجویی یا استاد ثبت نام کنید",
    step: "۱",
  },
  {
    icon: Search,
    title: "پروژه خود را آپلود کنید",
    description: "دانشجویان مقالات خود را به سامانه بارگذاری می کنند",
    step: "۲",
  },
  {
    icon: CheckCircle2,
    title: "ارزیابی تخصصی",
    description: "اساتید متخصص مقاله را بررسی می کنند",
    step: "۳",
  },
  {
    icon: Download,
    title: "دریافت نتیجه",
    description: "گزارش کامل ارزیابی را دریافت کنید",
    step: "۴",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              فرآیند کار
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            چهار گام ساده تا انتشار مقاله شما
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                {/* Arrow between steps - hidden on last step and mobile */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/4 -left-4 z-0">
                    <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8 text-primary/30" />
                  </div>
                )}

                <div className="relative bg-card border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-elegant hover:shadow-glow transition-smooth group h-full">
                  {/* Step number */}
                  <span className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-600 to-teal-400 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg sm:text-xl shadow-glow">
                    {step.step}
                  </span>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-blue-100 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-smooth">
                      <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
