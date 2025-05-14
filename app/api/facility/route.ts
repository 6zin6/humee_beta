import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const supabase = createClient();
        const { data: { session } } = await (await supabase).auth.getSession();

        const userId = session?.user?.id || body.userId;

        if (!userId) {
            return NextResponse.json(
                { error: "認証されていないか、ユーザーIDが提供されていません"},
                { status: 401 }
            );
        }

        const requiredFields = [
            "facilityName", "email", "representative", "phoneNumber", "postalCode", "prefecture", "city", "address", "facilityType", "disabilityTypes"
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `${field}は必須です`},
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
            console.error('画像URL解析エラー：', e);
        }

        const facility = await prisma.facility.create({
            data: {
                facilityName: body.facilityName,
                email: body.email,
                password: "supabase-auth",
                representative: body.representative,
                phoneNumber: body.phoneNumber,
                postalCode: body.postalCode,
                prefecture: body.prefecture,
                city: body.city,
                address: body.address,
                facilityType: body.facilityType,
                capacity: body.capacity,
                disabilityTypes: body.disabilityTypes,
                specialties: body.specialties || "",
                description: body.description || "",
                websiteUrl: body.websiteUrl || "",
                imageUrl: imageUrl
            },
        });

        return NextResponse.json(
            { success: true, facility: facility },
            { status: 201 }
        );
    } catch (error) {
        console.error("福祉施設登録エラー", error);
        return NextResponse.json(
            { error: "福祉施設登録処理中にエラーが発生しました"},
            { status: 500 }
        )
    }
}