"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  Upload,
  FileCheck,
  Users2,
  BarChart3,
  Shield,
  Zap,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const features = [
  {
    icon: Upload,
    title: "ارسال آسان مقالات",
    description: "دانشجویان می‌توانند مقالات خود را به راحتی آپلود کنند",
    details: ["رابط کاربری ساده", "پیش‌نمایش فوری"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileCheck,
    title: "بررسی تخصصی",
    description: "ارزیابی دقیق توسط اساتید با تجربه در حوزه‌های مختلف علمی",
    details: ["داوری دوجانبه کور", "گزارش‌های تخصصی"],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Users2,
    title: "همکاری گروهی",
    description: "محیط یکپارچه برای تعامل نویسندگان، داوران و ویراستاران",
    details: ["مدیریت نسخه‌ها", "اپدیت و اصلاح"],
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: BarChart3,
    title: "مدیریت هوشمند",
    description: "سازماندهی خودکار مقالات و تخصیص آنها به اساتید",
    details: ["سازماندهی خودکار", "تخصیص هوشمند"],
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "آرشیو کامل",
    description: "نگهداری امن و دسترسی آسان به تمام مقالات گذشته",
    details: ["آرشیو کامل", "کنترل دسترسی"],
    gradient: "from-red-500 to-pink-500",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20">
              <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                ویژگی‌های پیشرفته
              </span>
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-primary via-secondary to-primary">
              همه چیز برای موفقیت شما
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            ابزارهای کامل و حرفه‌ای برای مدیریت چرخه کامل مقالات علمی
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Custom Navigation Buttons */}
          <div className="hidden lg:flex justify-between items-center mb-8 max-w-6xl mx-auto px-4">
            <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-white border-2 border-primary/30 hover:border-primary flex items-center justify-center transition-smooth group">
              <ArrowRight className="w-5 h-5 group-hover:scale-110 transition-smooth" />
            </button>
            <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-white border-2 border-primary/30 hover:border-primary flex items-center justify-center transition-smooth group">
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-smooth" />
            </button>
          </div>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="!pb-12 sm:!pb-14"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <div className="group bg-card border-2 border-border hover:border-primary/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full shadow-lg hover:shadow-elegant transition-smooth relative overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-smooth`}
                    />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-smooth shadow-lg`}
                      >
                        <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground group-hover:text-primary transition-smooth">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                        {feature.description}
                      </p>

                      {/* Details List */}
                      <ul className="space-y-2">
                        {feature.details.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`}
                            />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: hsl(var(--primary));
          opacity: 0.3;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
          background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)));
        }
        @media (max-width: 640px) {
          .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
          }
          .swiper-pagination-bullet-active {
            width: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;
