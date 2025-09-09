"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ShoppingCart } from "@/components/shopping-cart";
import { MessageChat } from "@/components/message-chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Truck, Building, Award, Target } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  { name: "คุณสมชาย รักไทย", role: "ประธานเจ้าหน้าที่บริหาร (CEO)", image: "/assets/interlink-logo.png" },
  { name: "คุณสมหญิง ใจดี", role: "ประธานเจ้าหน้าที่ฝ่ายปฏิบัติการ (COO)", image: "/assets/interlink-logo.png" },
  { name: "คุณวิศรุต เก่งมาก", role: "ประธานเจ้าหน้าที่ฝ่ายเทคโนโลยี (CTO)", image: "/assets/interlink-logo.png" },
];

export default function AboutPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItemCount = 4; // Mock data

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-hero text-white">
          <div className="absolute inset-0 bg-primary/50"></div>
          <div className="container mx-auto px-4 relative text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-up">เกี่ยวกับ Interlink Shop</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              ผู้นำด้านอุปกรณ์เครือข่ายครบวงจรในประเทศไทย ที่มุ่งมั่นส่งมอบสินค้าคุณภาพและบริการที่เป็นเลิศ
            </p>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Target className="h-10 w-10 text-primary" />
                  <div>
                    <h2 className="text-3xl font-bold">ภารกิจของเรา</h2>
                    <p className="text-muted-foreground mt-2">
                      เรามุ่งมั่นที่จะจัดหาโซลูชันเครือข่ายที่เชื่อถือได้และทันสมัยที่สุด เพื่อขับเคลื่อนธุรกิจและนวัตกรรมของลูกค้าให้ก้าวไปข้างหน้า
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Award className="h-10 w-10 text-primary" />
                  <div>
                    <h2 className="text-3xl font-bold">วิสัยทัศน์ของเรา</h2>
                    <p className="text-muted-foreground mt-2">
                      เป็นอันดับหนึ่งในใจลูกค้าเมื่อนึกถึงอุปกรณ์เครือข่ายคุณภาพสูง พร้อมบริการที่รวดเร็วและเป็นมืออาชีพ
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Image 
                  src="/assets/category-data-center.jpg" 
                  alt="Data Center Solutions" 
                  width={600} 
                  height={400} 
                  className="rounded-lg shadow-card-hover object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">ทำไมต้องเลือกเรา?</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                เรามอบมากกว่าแค่สินค้า แต่คือความมั่นใจและบริการที่คุณไว้วางใจได้
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6 hover:shadow-card-hover transition-shadow duration-300">
                <ShieldCheck className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">สินค้าคุณภาพ</h3>
                <p className="text-muted-foreground">
                  คัดสรรสินค้าจากแบรนด์ชั้นนำ ผ่านการรับรองมาตรฐานสากล
                </p>
              </Card>
              <Card className="text-center p-6 hover:shadow-card-hover transition-shadow duration-300">
                <Users className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">ทีมงานผู้เชี่ยวชาญ</h3>
                <p className="text-muted-foreground">
                  พร้อมให้คำปรึกษาและแนะนำโซลูชันที่เหมาะสมกับคุณ
                </p>
              </Card>
              <Card className="text-center p-6 hover:shadow-card-hover transition-shadow duration-300">
                <Truck className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">จัดส่งรวดเร็ว</h3>
                <p className="text-muted-foreground">
                  รับประกันการจัดส่งที่รวดเร็วและปลอดภัยทั่วประเทศ
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Company History */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">เส้นทางของเรา</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                จากจุดเริ่มต้นเล็กๆ สู่การเป็นผู้นำในอุตสาหกรรม
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 h-full w-0.5 bg-primary/20 transform -translate-x-1/2"></div>
              <div className="space-y-12">
                {/* Timeline Item 1 */}
                <div className="flex items-center w-full">
                  <div className="w-1/2 pr-8 text-right">
                    <p className="font-bold text-primary text-xl">1995</p>
                    <h3 className="font-semibold text-lg">ก่อตั้งบริษัท</h3>
                    <p className="text-muted-foreground text-sm">เริ่มต้นธุรกิจด้วยความมุ่งมั่นที่จะนำเสนอเทคโนโลยีเครือข่ายที่ดีที่สุด</p>
                  </div>
                  <div className="w-10 h-10 bg-primary rounded-full absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                </div>
                {/* Timeline Item 2 */}
                <div className="flex items-center w-full">
                  <div className="w-1/2"></div>
                  <div className="w-1/2 pl-8 text-left">
                    <p className="font-bold text-primary text-xl">2010</p>
                    <h3 className="font-semibold text-lg">ขยายสู่ตลาดออนไลน์</h3>
                    <p className="text-muted-foreground text-sm">เปิดตัวเว็บไซต์ E-commerce เพื่อเข้าถึงลูกค้าได้กว้างขวางขึ้น</p>
                  </div>
                  <div className="w-10 h-10 bg-primary rounded-full absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                </div>
                {/* Timeline Item 3 */}
                <div className="flex items-center w-full">
                  <div className="w-1/2 pr-8 text-right">
                    <p className="font-bold text-primary text-xl">2024</p>
                    <h3 className="font-semibold text-lg">ผู้นำตลาด</h3>
                    <p className="text-muted-foreground text-sm">ได้รับการยอมรับในฐานะผู้จัดจำหน่ายอุปกรณ์เครือข่ายอันดับต้นๆ ของประเทศ</p>
                  </div>
                  <div className="w-10 h-10 bg-primary rounded-full absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MessageChat />
    </div>
  );
}