"use client"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "@/components/ui/logout-button"
import { Session } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { 
    Sheet, 
    SheetContent, 
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, ArrowRight, ChevronDown, ChevronRight , Building, Hospital, Users } from "lucide-react"

const Header = () => {
    const [ session, setSession ] = useState<Session | null>(null)
    const [ userRole, setUserRole ] = useState<string | null>(null)
    const [ loading, setLoading ] = useState(true)
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const supabase = createClient();

        const getInitialSession = async () => {
            setLoading(true)
            try {
                const { data: { session } } = await supabase.auth.getSession()
                setSession(session)

                if (session?.user) {
                    const role = session.user.user_metadata?.role
                    setUserRole(role)
                }

            } catch (error) {
                console.error('セッション取得エラー', error)
            } finally {
                setLoading(false)
            }
        }

        getInitialSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const isAuthPage = pathname === '/login' || pathname === '/register/company' || pathname === '/resister/facility'

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="flex items-center">
                    <a className="mr-6 flex items-center space-x-2" href="/">
                        <Image 
                        src="/images/logo.svg" 
                        alt="ロゴ" 
                        width={100} 
                        height={100}
                        />
                    </a>
                    <div className="hidden md:block space-x-2">
                        <MainNav />
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <nav className="flex items-center space-x-2">
                        <Link href="/about" className="text-primary font-bold mr-2 hidden md:block ">
                            Humeeとは
                        </Link>

                        {!isAuthPage && (
                            <div className="hidden md:flex md:items-center md:gap-2">
                                {session ? (
                                    <LogoutButton/>
                                ) : loading ? (
                                    <Button variant="outline" disabled>読み込み中...</Button>
                                    
                                ) : (
                                    <>
                                        <Button variant="outline" asChild>
                                            <Link href="/login" className="dark:text-white">
                                                ログイン
                                            </Link>
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button className="flex items-center gap-1">
                                                    新規登録
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem asChild>
                                                    <Link href="/register/company" className="flex items-center w-full">
                                                        <Building className="mr-2 h-4 w-4" />
                                                        企業として登録
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/register/facility" className="flex items-center w-full">
                                                        <Users className="mr-2 h-4 w-4" />
                                                        施設として登録
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <Button size="default" variant="secondary" asChild>
                                            <Link href="/contact">
                                                お問い合わせ
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}
                        
                    </nav>

                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5 dark:text-white" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[100vw] h-[100vh] sm:w-[350px]">
                            <div className="flex flex-col h-[100svh]">
                                <div className="flex items-center justify-between mb-6">
                                    <Image src="/images/logo.svg" alt="ロゴ" width={150} height={100}/>
                                </div>
                                
                                <ul className="space-y-4 flex-1 py-6">
                                    <li className="flex flex-col mb-3">
                                        <Link 
                                            href="/about" 
                                            className="flex items-center px-3 rounded-md hover:bg-muted dark:text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <ChevronRight className="dark:text-white"/>
                                            Humeeとは
                                        </Link>
                                    </li>
                                    {session ? (
                                        <>
                                            {userRole === 'company' && (
                                                <li className="flex flex-col mb-3">
                                                    <Link 
                                                        href="/profile/company" 
                                                        className="flex items-center px-3 rounded-md hover:bg-muted dark:text-white"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <ChevronRight className="dark:text-white"/>
                                                        プロフィール
                                                    </Link>
                                                </li>
                                            )}
                                        
                                            {userRole === 'facility' && (
                                                <li className="flex flex-col mb-3">
                                                    <Link 
                                                        href="/profile/facility" 
                                                        className="flex items-center px-3 rounded-md hover:bg-muted dark:text-white"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <ChevronRight className="dark:text-white"/>
                                                        プロフィール
                                                    </Link>
                                                </li>
                                            )}
                                        </>
                                        
                                    ) : (
                                        <></>
                                    )}
                                    
                                    
                                </ul>
                                
                                <div className="flex-1">
                                    <Button size="lg" variant="secondary" asChild className="w-full mb-4">
                                        <Link 
                                            href="/contact" 
                                            onClick={() => setIsOpen(false)}
                                            >
                                                お問い合わせ
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>

                                    <Separator className="mb-4"/>

                                    {!isAuthPage && (
                                        <>
                                            {session ? (
                                                <LogoutButton/>
                                            ) : loading ? (
                                                <Button variant="outline" disabled>読み込み中...</Button>
                                                
                                            ) : (
                                                <>
                                                    <Button variant="outline" className="w-full mb-3" asChild>
                                                        <Link href="/login" className="dark:text-white">
                                                            ログイン
                                                        </Link>
                                                    </Button>
                                                    <div className="space-y-2">
                                                        <Button asChild className="w-full flex items-center justify-center">
                                                            <Link href="/register/company">
                                                                <span className="flex items-center">
                                                                    <Building className="mr-2 h-4 w-4" />
                                                                    企業として登録
                                                                </span>
                                                                <ArrowRight className="h-4 w-4 ml-3" />
                                                            </Link>
                                                        </Button>
                                                        
                                                        <Button asChild className="w-full flex items-center justify-center">
                                                            <Link href="/register/facility">
                                                                <span className="flex items-center">
                                                                    <Users className="mr-2 h-4 w-4" />
                                                                    施設として登録
                                                                </span>
                                                                <ArrowRight className="h-4 w-4 ml-3" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                                
                                
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

export default Header