import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server';
import { prisma } from "@/lib/prisma"

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();

        const supabase = createClient();

        const { data: {session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json(
                { error: "認証されていません" },
                { status: 401 }
            );
        }

        const requiredFields = [
            "facilityName", "email", "representative", "phoneNumber",
            "address", "facilityType", "capacity"
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `${field}は必須です` },
                    { status: 400 }
                );
            }
        }

        let imageUrl = body.imageUrl || "";
        try {
            if (typeof body.imageUrl === 'string' && body.imageUrl.startsWith('{')) {
                const imageData = JSON.parse(body.imageUrl);
                imageUrl = imageData.url || "";
            }
        } catch (e) {
            console.error("画像URL解析エラー：", e);
        }

        const updatedFacility = await prisma.facility.update({
            where: {
                email: session.user.email,
            },
            data: {
                facilityName: body.facilityName,
                email: body.email,
                representative: body.representative,
                phoneNumber: body.phoneNumber,
                postalCode: body.postalCode,
                prefecture: body.prefecture,
                city: body.city,
                address: body.address,
                facilityType: body.facilityType,
                capacity: body.capacity,
                disabilityTypes: body.disabilityTypes,
                specialties: body.specialties,
                description: body.description || "",
                websiteUrl: body.websiteUrl || "",
                imageUrl: body.imageUrl || ""
            },
        });

        return NextResponse.json(
            { success: true, facility: updatedFacility},
            { status: 200 }
        );
    } catch (error) {
        console.error("プリフィール更新エラー：", error);
        return NextResponse.json(
            { error: "プロフィール更新中にエラーが発生しました" },
            { status: 500 }
        );
    }
}