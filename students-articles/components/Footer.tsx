import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <h4 className="font-bold text-lg">myArticles</h4>
            </div>
            <p className="text-muted-foreground">
              سامانه پیشرفته مدیریت و ارزیابی مقالات دانشجویی
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">لینک‌های مفید</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  درباره ما
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  تماس با ما
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  راهنما
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">پشتیبانی</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                ایمیل: amiraghayari2119@gmail.com
              </li>
              <li className="text-muted-foreground">تلفن: 09331052119</li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-muted-foreground">
          <p>©prod by : Amirhossein Aghayari</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
