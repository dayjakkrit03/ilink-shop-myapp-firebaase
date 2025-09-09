"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export const ProductFilters = () => {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>ตัวกรอง</CardTitle>
        <CardDescription>ปรับแต่งผลการค้นหาของคุณ</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={["category", "brand", "price"]} className="w-full">
          <AccordionItem value="category">
            <AccordionTrigger className="font-semibold">หมวดหมู่</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="cat-lan" />
                  <Label htmlFor="cat-lan" className="font-normal">LAN (UTP) System</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cat-fiber" />
                  <Label htmlFor="cat-fiber" className="font-normal">FIBER OPTIC System</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cat-networking" />
                  <Label htmlFor="cat-networking" className="font-normal">NETWORKING System</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cat-rack" />
                  <Label htmlFor="cat-rack" className="font-normal">RACK</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="brand">
            <AccordionTrigger className="font-semibold">แบรนด์</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="brand-interlink" />
                  <Label htmlFor="brand-interlink" className="font-normal">Interlink</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="brand-link" />
                  <Label htmlFor="brand-link" className="font-normal">Link</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="brand-19germany" />
                  <Label htmlFor="brand-19germany" className="font-normal">19" GERMANY</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger className="font-semibold">ช่วงราคา</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <Slider defaultValue={[0, 50000]} max={100000} step={100} />
                <div className="flex items-center gap-2">
                  <Input placeholder="Min" type="number" />
                  <span>-</span>
                  <Input placeholder="Max" type="number" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};