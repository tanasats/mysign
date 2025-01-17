'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUserContext } from "./context/UserContext";

export default function Home() {
  const { userID, setUserID} = useUserContext();
  
  
  return (
    <main>
      <div className="container mx-auto">
        <h1 className="text-4xl mb-8">Digital Signature</h1>
        <p className="mb-8">
          ลายเซ็นอิเล็กทรอนิกส์ สำหรับให้บริการบุคลากรภายในมหาวิทยาลัยฯ สามารถเข้าไปดาวน์โหลดลายเซ็นอิเล็กทรอนิกส์ของตนเองเพื่อใช้ลงลายมือชื่อในเอกสารได้จากระบบบริหารจัดการลายเซ็นอิเล็กทรอนิกส์
        </p>
        <Button asChild>
          <Link href="/signup">Create an account</Link>
        </Button>
      </div>
    </main>
  );
}
