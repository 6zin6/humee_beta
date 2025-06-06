'use server'

import { createClient } from "@/utils/supabase/server"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
    const cookieStore = cookies();
    const supabase = createClient();

    await supabase.auth.signOut()

    cookieStore.getAll().forEach(cookie => {
        if (cookie.name.startsWith('sb-')) {
            cookieStore.delete(cookie.name)
        }
    })

    redirect('/login')
}