"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const VerifiedPage = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getSession();

            if (data.session) {
                setIsAuthenticated(true);

                const userData = data.session.user.user_metadata;
                const role = userData?.role || null;
                setUserRole(role);
            }
        };

        checkAuth();
    }, []);

    const handleLogin = () => {
        if(isAuthenticated) {
            if (userRole === 'company') {
                router.push('/profile/company');
            } else if (userRole === 'facility') {
                router.push('/profile/facility');
            } else {
                router.push('/dashboard');
            }
        } else {
            router.push('/login');
        }
    }

  return (
    <div className="min-h-screen bg-background">
        <Header />

        <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] py-12">
            <div className="w-full max-w-md text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                
                <h1 className="text-3xl font-bold mb-6">メール認証が完了しました</h1>
                
                <div className="bg-card p-6 rounded-lg shadow-md mb-8">
                    <p className="mb-4">
                    おめでとうございます！<br/>アカウント登録が完了しました。
                    </p>
                    <p className="mb-4">
                    これで全ての機能をご利用いただけます。
                    </p>
                </div>

                <div className="flex flex-col space-y-4">
                    <Button 
                    onClick={handleLogin} 
                    className="w-full"
                    >
                    {isAuthenticated ? 'プロフィールへ進む' : 'ログインする'}
                    </Button>
                    
                    <Link href="/" passHref>
                    <Button variant="ghost" className="w-full">
                        トップページへ戻る
                    </Button>
                    </Link>
                </div>
            </div>
        </div>    
        <Footer/>
    </div>
  )
}

export default VerifiedPage