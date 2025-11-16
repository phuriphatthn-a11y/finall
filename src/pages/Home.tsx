import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-lg bg-background/95">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">
            ช่องทางการติดต่อ
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <p className="text-lg">
            หากต้องการติดต่อหรือติดตามผลงาน สามารถเข้าไปที่ Facebook ได้โดยคลิกที่รูปด้านล่างนี้ครับ
          </p>

          {/* รูปภาพที่คลิกได้ */}
          <div className="flex justify-center">
            <a
              href="https://www.facebook.com/share/18rj6rMcBD/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/pic/tuss.jpg"
                alt="Facebook"
                className="w-32 h-32 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
              />
            </a>
          </div>

          <p className="text-base text-muted-foreground">
            Facebook: <span className="font-semibold">Tus Phuriphat</span>
          </p>

          <p className="text-sm text-gray-500">
            มหาวิทยาลัยศรีปทุม<br />
            คณะเทคโนโลยีสารสนเทศ — สาขาวิทยาการคอมพิวเตอร์
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
