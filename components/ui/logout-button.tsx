"use client"

import { Button } from "@/components/ui/button"
import { logout } from "@/app/actions/auth"
import { useState } from 'react'
import { useToast } from "@/hooks/use-toast";

const LogoutButton = () => {
    const [ isLoggingOut, setIsLoggingOut ] = useState(false)
    const { toast } = useToast();

    const handleLogout = async () => {
        setIsLoggingOut(true)

        try {
            await logout()

            toast({
                title: "ログアウト成功",
                variant: "default"
            });
            
        } catch (error) {
            console.error('ログアウトエラー', error)

            toast({
                title: "ログアウトエラー",
                variant: "destructive"
            });
            
            setIsLoggingOut(false)
        }
    }

    return (
        <Button 
        variant="outline" 
        size="sm" 
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="w-full"
        >
        {isLoggingOut ? 'ログアウト中...' : 'ログアウト'}
        </Button>
    )
}

export default LogoutButton