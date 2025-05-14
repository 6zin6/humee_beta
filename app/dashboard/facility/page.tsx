
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function FacilityDashboard() {
  const supabase = createClient()
  
  // セッション確認
  const { data: { session } } = await (await supabase).auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  // ユーザーに紐づく企業情報を取得
  const facility = await prisma.facility.findFirst({
    where: {
      email: session.user.email,
    },
  })
  
  if (!facility) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">企業情報が見つかりません</h1>
        <p>企業情報の登録が完了していないようです。管理者にお問い合わせください。</p>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
        <Header/>

        <div className="container py-8 min-h-[calc(100vh-5rem)]">
            <h1 className="text-2xl font-bold mb-6">施設ダッシュボード</h1>
        
            <div className="bg-card rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">施設情報</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-muted-foreground">施設名</p>
                    <p className="font-medium">{facility.facilityName}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">メールアドレス</p>
                    <p className="font-medium">{facility.email}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">代表者名</p>
                    <p className="font-medium">{facility.representative}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">電話番号</p>
                    <p className="font-medium">{facility.phoneNumber}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">住所</p>
                    <p className="font-medium">
                    〒{facility.postalCode} {facility.prefecture}{facility.city}{facility.address}
                    </p>
                </div>
                <div>
                    <p className="text-muted-foreground">施設種別</p>
                    <p className="font-medium">{facility.facilityType}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">定員数</p>
                    <p className="font-medium">{facility.capacity}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">対応可能な障害種別</p>
                    <p className="font-medium">{facility.disabilityTypes}</p>
                </div>
                {facility.websiteUrl && (
                    <div>
                    <p className="text-muted-foreground">WebサイトURL</p>
                    <p className="font-medium">{facility.websiteUrl}</p>
                    </div>
                )}
                </div>
            </div>
        
        {/* ここに他のダッシュボード機能を追加 */}
        </div>
        
        <Footer/>
    </div>
    
  )
}