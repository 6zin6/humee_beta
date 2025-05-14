"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import ImageUpload from "@/components/ImageUpload"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, Mail, Phone, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

type Facility = {
    id: string;
    facilityName: string;
    email: string;
    representative: string;
    phoneNumber: string;
    postalCode: string;
    prefecture: string;
    city: string;
    address: string;
    facilityType: string;
    capacity: number;
    disabilityTypes: string[];
    specialties: string[];
    description: string | null;
    websiteUrl: string | null;
    imageUrl: string | null;
    created_at: Date;
    updated_at: Date;
}

type FacilityProfileClientProps = {
    facility: Facility;
}

const facilityProfileSchema = z.object({
  facilityName: z.string().min(1, "施設名を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  representative: z.string().min(1, "代表者名を入力してください"),
  phoneNumber: z.string().min(1, "電話番号を入力してください"),
  address: z.string().min(1, "住所を入力してください"),
  facilityType: z.string().min(1, "施設種別を選択してください"),
  capacity: z.string()
    .min(1, "定員数を入力してください")
    .transform((val) => parseInt(val, 10)),
  description: z.string(),
  disabilityTypes: z.array(z.string()).min(1, "対応可能な障害種別を選択してください"),
  specialties: z.array(z.string()).min(1, "得意な作業を選択してください"),
  websiteUrl: z.string().url("有効なURLを入力してください").optional().or(z.literal("")),
  imageUrl: z.string().optional(),
})

const disabilityTypes = [
  { id: "physical", label: "身体障害" },
  { id: "intellectual", label: "知的障害" },
  { id: "mental", label: "精神障害" },
  { id: "developmental", label: "発達障害" },
]

const specialties = [
  { id: "dataEntry", label: "データ入力" },
  { id: "packaging", label: "封入・梱包" },
  { id: "assembly", label: "組立作業" },
  { id: "cleaning", label: "清掃" },
  { id: "farming", label: "農作業" },
]

export default function FacilityProfile({
    facility,
}: FacilityProfileClientProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof facilityProfileSchema>>({
        resolver: zodResolver(facilityProfileSchema),
        defaultValues: {
            facilityName: facility.facilityName,
            email: facility.email,
            representative: facility.representative,
            phoneNumber: facility.phoneNumber,
            address: `${facility.prefecture}${facility.city}${facility.address}`,
            facilityType: facility.facilityType,
            capacity: facility.capacity,
            disabilityTypes: facility.disabilityTypes || [],
            specialties: facility.specialties || [],
            description: facility.description || "",
            websiteUrl: facility.websiteUrl || "",
            imageUrl: facility.imageUrl || ""
        }
    })

    async function onSubmit(values: z.infer<typeof facilityProfileSchema>) {
        setIsLoading(true)

        try {
            let imageUrl = values.imageUrl || "";
            try {
                if (values.imageUrl && values.imageUrl.startsWith("{")) {
                    const imageData = JSON.parse(values.imageUrl);
                    imageUrl = imageData.url || "";
                }
            } catch (e) {
                imageUrl = values.imageUrl || "";
            }

            const response = await fetch('/api/facility/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    imageUrl: imageUrl
                })
            })
            
            if (!response.ok) {
                throw new Error('プロフィールの更新に失敗しました')
            }

            router.refresh()
            setIsEditing(false)
        } catch (error) {
            console.error('更新エラー', error)
            alert('プロフィールの更新中にエラーが発生しました')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="flex items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold flex-1">施設プロフィール</h1>
                <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
                >
                {isEditing ? "キャンセル" : "編集"}
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                <div className="space-y-6">
                <Card>
                    <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                        <Avatar className="h-32 w-32">
                            {facility.imageUrl ? (
                                <AvatarImage src={facility.imageUrl} alt={facility.facilityName}/>
                            ) : (
                                <AvatarFallback>
                                    <Building2 className="h-16 w-16" />
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <h2 className="mt-4 text-xl font-semibold">{facility.facilityName}</h2>
                        <p className="text-sm text-muted-foreground">
                        {facility.facilityType === "b" ? "就労継続支援B型" : ""}
                        </p>
                    </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                    <CardTitle>連絡先情報</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{facility.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{facility.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                            {facility.postalCode}
                            {facility.prefecture}
                            {facility.city}
                            {facility.address}
                        </span>
                    </div>
                    </CardContent>
                </Card>
                </div>

                <div className="space-y-6">
                {isEditing ? (
                    <Card>
                    <CardHeader>
                        <CardTitle>プロフィールを編集</CardTitle>
                        <CardDescription>
                        施設情報を更新します
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex flex-col items-center py-4">
                                <h3 className="font-medium mb-2">プロフィール画像</h3>
                                <ImageUpload
                                    onImageUrlChange={(url) => form.setValue("imageUrl", url)}
                                    defaultImageUrl={facility.imageUrl || ""}
                                    userType="facilities"
                                    isNewUser={false}
                                />
                            </div>

                            <FormField
                            control={form.control}
                            name="facilityName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>施設名</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>メールアドレス</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="representative"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>代表者名</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>電話番号</FormLabel>
                                <FormControl>
                                    <Input type="tel" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>住所</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="facilityType"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>施設種別</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="施設種別を選択" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="b">就労継続支援B型</SelectItem>
                                    <SelectItem value="a">就労継続支援A型</SelectItem>
                                    <SelectItem value="transition">就労移行支援</SelectItem>
                                    <SelectItem value="development">就労定着支援</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="capacity"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>定員数</FormLabel>
                                <FormControl>
                                <Input 
                                    type="number" 
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="disabilityTypes"
                            render={() => (
                                <FormItem>
                                <FormLabel>対応可能な障害種別</FormLabel>
                                <div className="grid grid-cols-2 gap-4">
                                    {disabilityTypes.map((type) => (
                                    <FormField
                                        key={type.id}
                                        control={form.control}
                                        name="disabilityTypes"
                                        render={({ field }) => {
                                        return (
                                            <FormItem
                                            key={type.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                            <FormControl>
                                                <Checkbox
                                                checked={field.value?.includes(type.id)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                    ? field.onChange([...field.value, type.id])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                            (value) => value !== type.id
                                                        )
                                                        )
                                                }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {type.label}
                                            </FormLabel>
                                            </FormItem>
                                        )
                                        }}
                                    />
                                    ))}
                                </div>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="specialties"
                            render={() => (
                                <FormItem>
                                <FormLabel>得意な作業</FormLabel>
                                <div className="grid grid-cols-2 gap-4">
                                    {specialties.map((specialty) => (
                                    <FormField
                                        key={specialty.id}
                                        control={form.control}
                                        name="specialties"
                                        render={({ field }) => {
                                        return (
                                            <FormItem
                                            key={specialty.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                            <FormControl>
                                                <Checkbox
                                                checked={field.value?.includes(specialty.id)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                    ? field.onChange([...field.value, specialty.id])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                            (value) => value !== specialty.id
                                                        )
                                                        )
                                                }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {specialty.label}
                                            </FormLabel>
                                            </FormItem>
                                        )
                                        }}
                                    />
                                    ))}
                                </div>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>施設概要</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="施設の特徴や取り組みについて記入してください"
                                    className="min-h-[100px]"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <div className="flex gap-4">
                            <Button type="submit" className="flex-1">保存</Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setIsEditing(false)}
                            >
                                キャンセル
                            </Button>
                            </div>
                        </form>
                        </Form>
                    </CardContent>
                    </Card>
                ) : (
                    <>
                    <Card>
                        <CardHeader>
                        <CardTitle>施設概要</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">施設の特徴</h3>
                            <p className="text-muted-foreground">{facility.description}</p>
                        </div>
                        <Separator />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <h3 className="font-medium mb-2">定員数</h3>
                            <p className="text-muted-foreground">{facility.capacity}名</p>
                            </div>
                            <div>
                            <h3 className="font-medium mb-2">代表者</h3>
                            <p className="text-muted-foreground">{facility.representative}</p>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-medium mb-2">対応可能な障害種別</h3>
                            <div className="flex flex-wrap gap-2">
                                {facility.disabilityTypes.map((type) => (
                                <Badge key={type} variant="secondary">
                                    {disabilityTypes.find(t => t.id === type)?.label || type}
                                </Badge>
                                ))}
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-medium mb-2">得意な作業</h3>
                            <div className="flex flex-wrap gap-2">
                                {facility.specialties.map((specialty) => (
                                <Badge key={specialty} variant="outline">
                                    {specialties.find(s => s.id === specialty)?.label || specialty}
                                </Badge>
                                ))}
                            </div>
                        </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                        <CardTitle>実績</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="space-y-2">
                            <p className="text-3xl font-bold">15</p>
                            <p className="text-sm text-muted-foreground">完了案件</p>
                            </div>
                            <div className="space-y-2">
                            <p className="text-3xl font-bold">4.9</p>
                            <p className="text-sm text-muted-foreground">平均評価</p>
                            </div>
                            <div className="space-y-2">
                            <p className="text-3xl font-bold">6</p>
                            <p className="text-sm text-muted-foreground">取引企業数</p>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    </>
                )}
                </div>
            </div>
        </>
    )
}