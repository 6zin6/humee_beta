
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { prisma } from '@/lib/prisma'
import FacilityProfileClient from './client-component'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function FacilityProfile() {
  const supabase = createClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const facilityFromDb = await prisma.facility.findFirst({
    where: {
      email: session.user.email,
    }
  });

  if (!facilityFromDb) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">施設情報が見つかりません</h1>
        <p>施設情報の登録が完了していないようです。管理者にお問い合わせください。</p>
      </div>
    )
  }

  const facility = facilityFromDb as any;

  return (
    <div className="min-h-screen bg-background">
      <Header/>

      <main className="container py-8 min-h-[calc(100vh-5rem)]">
        <div className="max-w-6xl mx-auto">
          <FacilityProfileClient 
            facility={facility}
          />
        </div>
      </main>

      <Footer/>
    </div>
  )
}