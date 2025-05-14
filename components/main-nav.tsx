"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Heart, Building2, Home, Users } from "lucide-react"
import { useState, useEffect } from 'react'
import { Session } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"

export function MainNav() {
  const [ session, setSession ] = useState<Session | null>(null)
  const [ userRole, setUserRole ] = useState<string | null>(null)
  const [ loading, setLoading ] = useState(true)
  
  useEffect(() => {
    const supabase = createClient();

    const getInitialSession = async () => {
      setLoading(true)
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session)

        if (session?.user) {
          const role = session.user.user_metadata?.role
          setUserRole(role)
        }
      } catch (error) {
        console.error("セッション取得エラー", error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUserRole(session?.user?.user_metadata?.role || null)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, []);
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {session ? (
          <>
          {userRole === 'company' && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Building2 className="mr-2 h-4 w-4" />
                企業の方
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Heart className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          企業の方へ
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          福祉施設とのマッチングで、社会貢献と事業効率化を実現します。
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <Link href="/projects/create" legacyBehavior passHref>
                      <NavigationMenuLink className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                        <div className="text-sm font-medium leading-none">案件を掲載</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          新しい案件を登録し、最適な福祉施設とマッチング
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" legacyBehavior passHref>
                      <NavigationMenuLink className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                        <div className="text-sm font-medium leading-none">案件を管理</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          進行中の案件状況確認と管理
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile/company" legacyBehavior passHref>
                      <NavigationMenuLink className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                        <div className="text-sm font-medium leading-none">企業プロフィール</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          企業情報の登録・編集
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
            
          {userRole === 'facility' && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Users className="mr-2 h-4 w-4" />
                福祉施設の方
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Users className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          福祉施設の方へ
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          企業からの業務委託で、施設の収益向上と利用者の就労機会を創出します。
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <Link href="/projects/search" legacyBehavior passHref>
                      <NavigationMenuLink className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                        <div className="text-sm font-medium leading-none">案件を探す</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          施設に適した案件を検索・応募
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile/facility" legacyBehavior passHref>
                      <NavigationMenuLink className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                        <div className="text-sm font-medium leading-none">施設プロフィール</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          施設情報の登録・編集
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
            
          </>
        ) : (
          <>
          </>
        )}
        
      </NavigationMenuList>
    </NavigationMenu>
  )
}