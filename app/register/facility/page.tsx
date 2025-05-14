"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Users } from "lucide-react"
import { createClient } from "@/utils/supabase/client";

const facilityFormSchema = z.object({
  facilityName: z.string().min(1, "施設名を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
  confirmPassword: z.string(),
  representative: z.string().min(1, "代表者名を入力してください"),
  phoneNumber: z.string().min(1, "電話番号を入力してください"),
  postalCode: z.string().min(1, "郵便番号を入力してください"),
  prefecture: z.string().min(1, "都道府県を入力してください"),
  city: z.string().min(1, "市町村を入力してください"),
  address: z.string().min(1, "それ以降の住所を入力してください"),
  facilityType: z.string().min(1, "施設種別を選択してください"),
  capacity: z.string()
  .min(1, "定員数を入力してください")
  .transform((val) => parseInt(val, 10)),
  disabilityTypes: z.array(z.string()).min(1, "対応可能な障害種別を選択してください"),
  specialties: z.array(z.string()).min(1, "得意な作業を選択してください"),
  description: z.string(),
  websiteUrl: z.string(),
  imageUrl: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"],
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

export default function FacilityRegistration() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof facilityFormSchema>>({
    resolver: zodResolver(facilityFormSchema),
    defaultValues: {
      facilityName: "",
      email: "",
      password: "",
      confirmPassword: "",
      representative: "",
      phoneNumber: "",
      postalCode: "",
      prefecture: "",
      city: "",
      address: "",
      facilityType: "",
      capacity: 0,
      description: "",
      disabilityTypes: [],
      specialties: [],
      websiteUrl: "",
      imageUrl: "",
    },
  })

  async function onSubmit(values: z.infer<typeof facilityFormSchema>) {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();

      let imageInfo = { url: "", tempId: null, path: ""};
      try {
        if (values.imageUrl) {
          imageInfo = JSON.parse(values.imageUrl);
        }
      } catch (e) {

      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email:values.email,
        password: values.password,
        options: {
          data: {
            facility_name: values.facilityName,
            role: 'facility',
          }
        }
      });

      if (authError) throw new Error(authError.message);

      if (imageInfo.tempId && imageInfo.path && authData.user) {
        try {
          console.log("画像移動開始：", imageInfo);
          const fileExt = imageInfo.path.split('.').pop();
          const newPath = `facilities/${authData.user.id}/profile.${fileExt}`;
          console.log("移動先パス:", newPath);

          const { data: copyData, error: copyError } = await supabase.storage
            .from('profile-images')
            .copy(imageInfo.path, newPath);

            if (copyError) {
              console.error("コピーエラー:", copyError);
            } else {
              console.log("コピー成功:", newPath);

              const { data: { publicUrl } } = supabase.storage
                .from('profile-images')
                .getPublicUrl(newPath);

                console.log("新URL:", publicUrl);
                imageInfo.url = publicUrl;

                console.log("元ファイル削除:", imageInfo.path);
                await supabase.storage
                  .from('profile-images')
                  .remove([imageInfo.path]);
            }
        } catch (error) {
          console.error("画像処理エラー:", error);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      const { data: sessionData } = await supabase.auth.getSession();

      const response = await fetch('/api/facility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          facilityName: values.facilityName,
          email: values.email,
          representative: values.representative,
          phoneNumber: values.phoneNumber,
          postalCode: values.postalCode,
          prefecture: values.prefecture,
          city: values.city,
          address: values.address,
          facilityType: values.facilityType,
          capacity: values.capacity,
          disabilityTypes: values.disabilityTypes,
          specialties: values.specialties || "",
          description: values.description || "",
          websiteUrl: values.websiteUrl || "",
          imageUrl: imageInfo.url || "",
          userId: authData.user?.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '登録処理に失敗しました');
      }

      router.push(`/verify?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      console.error('登録エラー', error);
      setErrorMessage(error instanceof Error ? error.message : '登録処理中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  }

  const [isAddressLoading, setIsAddressLoading] = useState(false);

  const handlePostalCodeChange = async (
    value: string,
    onChange: (value: string) => void
  ) => {
    const postalCode = value.replace(/[^0-9]/g, "");
    onChange(postalCode);

    if (postalCode.length === 7) {
      setIsAddressLoading(true);
      try {
        const response = await fetch(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
        );
        const data = await response.json();

        if (data.results) {
          const address = data.results[0];
          form.setValue("prefecture", address.address1);
          form.setValue("city", address.address2);
          const addressInput = document.querySelector(
            'input[name="address"]'
          ) as HTMLInputElement;
          if (addressInput) addressInput.focus();
        }
      } catch (error) {
        console.error("郵便番号検索に失敗しました", error);
      } finally {
        setIsAddressLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header/>

      <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)] py-12">
        <div className="w-full max-w-2xl">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <h1 className="text-3xl font-bold">福祉施設アカウント登録</h1>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col items-center py-4">
                <h2 className="text-lg font-medium mb-2">プロフィール画像</h2>
                <ImageUpload
                  onImageUrlChange={(imageData) => form.setValue("imageUrl", imageData)}
                  defaultImageUrl={form.getValues("imageUrl") ? JSON.parse(form.getValues("imageUrl")).url : ""}
                  userType="facilities"
                  isNewUser={true}
                />
              </div>

              <FormField
                control={form.control}
                name="facilityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>施設名</FormLabel>
                    <FormControl>
                      <Input placeholder="Humme福祉作業所" {...field} />
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
                      <Input type="email" placeholder="facility@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>パスワード</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      8文字以上で入力してください
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>パスワード（確認）</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
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
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>郵便番号</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          onChange={(e) => 
                            handlePostalCodeChange(
                              e.target.value,
                              field.onChange
                            )
                          }
                          placeholder="1000001"
                        />
                        {isAddressLoading && (
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      ハイフンなしで入力してください
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prefecture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>都道府県</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>市町村</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input type="number" {...field} />
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WebサイトURL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
                >
                  {isLoading ? (
                  <>
                    <span className="mr-2">登録中...</span>
                    <div className="h-4 w-4 animate-spin rouded-full border-2 border-background border-t-transparent"></div>
                  </>
                ) : (
                  "登録する"
                )}
                </Button>
            </form>
          </Form>
        </div>
      </div>

      <Footer/>
    </div>
  )
}