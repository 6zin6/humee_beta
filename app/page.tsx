import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, ArrowRight, Briefcase, CheckCircle, InfoIcon, Laptop, MessageCircle, GraduationCap, HandHelping, ThumbsUp, Cpu, Wrench } from "lucide-react"
import Link from "next/link"
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import topHeroBack from "@/app/assets/images/top_back.png"
import featureBack from "@/app/assets/images/top_feature_back.png"
import serviceBack from "@/app/assets/images/top_support_service_back.png"
import Trophy from "@/app/assets/images/trophy.png"
import Deco1 from "@/app/assets/images/top_deco_1.svg"
import Deco2 from "@/app/assets/images/top_deco_2.svg"
import Deco3 from "@/app/assets/images/top_deco_3.svg"
import aboutDeco from "@/app/assets/images/top_about_deco.svg"


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header/>

      {/* Promo Banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center font-medium">
        Humee事前登録フェア「全国展開中！！」
      </div>

      <main>
        {/* Hero Section */}
        <section className="px-4 py-20 md:py-32 relative bg-cover bg-top" style={{ backgroundImage: `url(${topHeroBack.src})` }}>
        <div className="absolute inset-0 bg-black/20"></div>
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center space-y-8 md:space-y-5">
              <Image src="/images/logo_white.svg" alt="ロゴ" width={280} height={70}/>
              <h1 className="text-xl leading-8 md:text-2xl md:leading-relaxed font-bold tracking-tighter text-white">
                「人と社会をやさしくつなぐ、<br className="md:hidden"/>新しい就労支援のカタチ。」
              </h1>
              <p className="text-white leading-8">
                Humeeは、障害者就労支援施設専用の<br className="md:hidden"/>クラウドソーシングアプリです。
                <br />
                社会との接点を広げ、誰もが自分らしく<br className="md:hidden"/>働ける未来を支えます。
              </p>
              <div className="flex gap-4 mt-12 flex-col md:flex-row">
                <Button size="lg" asChild>
                  <Link href="/about">
                    Humeeを知る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    無料相談はこちら
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Humee Section */}
        <section className="pt-20 px-4">
          <div className="container overflow-x-clip relative">
            <div className="absolute -top-6 md:top-14 md:left-0">
              <Image src={Deco1} alt="紙飛行機" className="w-12 md:w-auto"/>
            </div>
            <span className="text-primary text-center block mb-2">about</span>
            <h2 className="text-3xl font-bold text-center mb-5 text-primary">Humeeとは？</h2>
            <div className="text-center mb-16">
              <p className="text-xl font-bold mb-4 text-primary leading-10">
                <span className="marker-highlight">Human × Me =</span>
                <br className="md:hidden"/>
                <span className="marker-highlight">&quot;私らしく社会とつながる&quot;</span>
              </p>
              <p className="text-lg leading-8 dark:text-white">
                Humeeは、障害・グレーゾーンの<br className="md:hidden"/>方々と、社会・企業を結ぶ
                <br />
                障害者施設専門のクラウド<br className="md:hidden"/>ソーシングプラットフォームです。
              </p>
            </div>
            <Card className="max-w-4xl mx-auto relative border-none">
              <div className="absolute -top-10 md:-top-20 -right-4 md:-right-12 w-12 md:w-auto">
                <Image src={aboutDeco} alt="デコレーション"/>
              </div>
              <div className="absolute -top-3 left-1/2 w-[80%] md:w-auto text-center md:text-left transform -translate-x-1/2 md:translate-x-0 md:left-0 bg-white dark:bg-black border-2 border-solid border-primary rounded-2xl">
                <h3 className="text-lg font-bold px-3 md:px-8 text-primary">Humeeで出来ること</h3>
              </div>
              <CardContent className="pt-10 px-0 pb-6 md:pb-10 bg-primary rounded-xl">
                <div className="space-y-6">
                  <div>
                    <ul className="space-y-2 text-white dark:text-black px-6 md:pl-20 md:pr-0">
                      <li className="flex md:items-center">
                        <CheckCircle className="h-5 w-5 mr-2 mt-1 md:mt-0 flex-shrink-0" />
                        <span>デジタル業務（データ入力・画像編集・SNS運用・ライティングなど）の委託</span>
                      </li>
                      <li className="flex md:items-center">
                        <CheckCircle className="h-5 w-5 mr-2 mt-1 md:mt-0 flex-shrink-0" />
                        <span>障害者雇用支援・トライアル雇用マッチング</span>
                      </li>
                      <li className="flex md:items-center">
                        <CheckCircle className="h-5 w-5 mr-2 mt-1 md:mt-0 flex-shrink-0" />
                        <span>利用者の社会復帰・スキル向上のための仕事創出</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-center font-bold text-[#F9FF6E] dark:text-black leading-7">施設・企業・利用者の<br className="md:hidden"/>三方よしを目指します！</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="pt-52 pb-20 px-4 bg-cover bg-top" style={{ backgroundImage: `url(${featureBack.src})` }}>
          <div className="container relative">
            <div className="absolute -top-44 md:-top-52 right-2 md:right-0 w-20 md:w-auto">
              <Image src={Deco2} alt="メール" />
            </div>
            <span className="text-primary text-center block mb-2">feature</span>
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">Humeeの特徴</h2>
            <div className="grid md:grid-cols-3 gap-6 relative">
              <div className="absolute -top-32 md:-top-20 left-0 md:-left-[80px] w-20 md:w-auto">
                <Image src={Deco3} alt="arrow"/>
              </div>
              <Card className="border-none">
                <CardHeader className="text-primary">
                  <Building2 className="h-8 w-8 mb-4" />
                  <CardTitle>企業の方へ</CardTitle>
                  <CardDescription className="text-primary font-bold">
                    業務効率化とCSR活動の両立を実現
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 簡単な案件登録と管理</li>
                    <li>• 品質管理システム</li>
                    <li>• SDGs達成への貢献</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none">
                <CardHeader className="text-primary">
                  <Users className="h-8 w-8 mb-4" />
                  <CardTitle>福祉施設の方へ</CardTitle>
                  <CardDescription className="text-primary font-bold">
                    安定した業務受注と工賃向上を支援
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 施設の特性に合った案件マッチング</li>
                    <li>• 作業実績の可視化</li>
                    <li>• 継続的な業務確保</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none">
                <CardHeader className="text-primary">
                  <HandHelping className="h-8 w-8 mb-4" />
                  <CardTitle>充実したサポート</CardTitle>
                  <CardDescription className="text-primary font-bold">
                    安心して利用できる体制を整備
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {/* <li>• 契約書作成支援</li>
                    <li>• 進捗管理システム</li> */}
                    <li>• 専門スタッフによるサポート</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Support Services Section */}
        <section className="py-20 px-4 bg-top bg-cover relative" style={{ backgroundImage: `url(${serviceBack.src})` }}>
        <div className="absolute inset-0 bg-white/60"></div>
          <div className="container relative z-10">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full  text-white bg-secondary font-medium text-sm mb-4">NEW</span>
              <h2 className="text-3xl font-bold text-primary leading-10 dark:text-black">Humeeの<br className="md:hidden"/>付属支援サービス</h2>
              <p className="mt-4 text-lg max-w-3xl mx-auto text-primary leading-8 dark:text-black">
                Humeeの運営会社である<br className="md:hidden"/>【株式会社ローカルアビリティーズ】<br className="md:hidden"/>では、
                <br className="hidden md:block"/>
                Humeeをより効果的に活用していただくため、以下の支援サービスもご用意しています。
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="bg-primary border-none">
                <CardHeader className="pb-2 text-white dark:text-black">
                  <Laptop className="h-8 w-8 mb-2" />
                  <CardTitle className="text-lg">障害・グレーゾーンIT人材育成</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-white leading-6 dark:text-black">
                    <li>• 利用者のITスキル向上をサポート</li>
                    <li>• パソコン初心者から本格スキルまで対応可能</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-primary border-none">
                <CardHeader className="pb-2 text-white dark:text-black">
                  <GraduationCap className="h-8 w-8 mb-2" />
                  <CardTitle className="text-lg">オンライン支援員の育成</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-white leading-6 dark:text-black">
                    <li>• デジタル知識×福祉知識を持つ「ハイブリッド支援員」を育成</li>
                    <li>• 現場運営力・ITリテラシーを向上</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-primary border-none">
                <CardHeader className="pb-2 text-white dark:text-black">
                  <ThumbsUp className="h-8 w-8 mb-2" />
                  <CardTitle className="text-lg">オンライン障害支援の代行</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-white leading-6 dark:text-black">
                    <li>• オンライン就労支援の導入から運用まで完全サポート</li>
                    <li>• 施設負担を大幅に軽減します</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-primary border-none">
                <CardHeader className="pb-2 text-white dark:text-black">
                  <Cpu className="h-8 w-8 mb-2" />
                  <CardTitle className="text-lg">福祉 × AI リスキリング支援</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-white leading-6 dark:text-black">
                    <li>• ChatGPTや業務効率ツールの活用レクチャー</li>
                    <li>• 施設全体のデジタル力を底上げします</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-primary border-none">
                <CardHeader className="pb-2 text-white dark:text-black">
                  <Wrench className="h-8 w-8 mb-2" />
                  <CardTitle className="text-lg">テレワーク監視・支援アプリ開発</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-white dark:text-black">
                    <li>• 遠隔でも安心して働ける環境づくりを支援</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 bg-secondary">
          <div className="container">
            <div className="relative mb-16">
              <span className="text-white text-center block mb-2">point</span>
              <h2 className="text-3xl font-bold text-center text-white">Humeeが選ばれる理由</h2>
              <Image 
                src={Trophy} 
                alt="trophy" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4 w-40"></Image>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-background p-6 rounded-lg flex items-start">
                <CheckCircle className="h-6 w-6 text-secondary mr-4 flex-shrink-0 mt-1 dark:text-white" />
                <div>
                  <p className="font-medium leading-7 dark:text-white">施設専用クラウドソーシングでマッチング精度が高い</p>
                </div>
              </div>
              
              <div className="bg-background p-6 rounded-lg flex items-start">
                <CheckCircle className="h-6 w-6 text-secondary mr-4 flex-shrink-0 mt-1 dark:text-white" />
                <div>
                  <p className="font-medium leading-7 dark:text-white">福祉に配慮した丁寧なマッチングサポート</p>
                </div>
              </div>
              
              <div className="bg-background p-6 rounded-lg flex items-start">
                <CheckCircle className="h-6 w-6 text-secondary mr-4 flex-shrink-0 mt-1 dark:text-white" />
                <div>
                  <p className="font-medium leading-7 dark:text-white">ITスキルや就労経験を積み上げることで、一般就労へのステップアップ</p>
                </div>
              </div>
              
              <div className="bg-background p-6 rounded-lg flex items-start">
                <CheckCircle className="h-6 w-6 text-secondary mr-4 flex-shrink-0 mt-1 dark:text-white" />
                <div>
                  <p className="font-medium leading-7 dark:text-white">利用者、施設、企業それぞれに確かなメリット</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Projects Section */}
        {/* <section className="py-20 px-4">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">新着案件</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">データ入力業務</CardTitle>
                    <CardDescription>株式会社サンプル</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>作業内容：エクセルデータの入力</p>
                      <p>予算：20,000円</p>
                      <p>納期：2週間</p>
                      <Button className="w-full mt-4">詳細を見る</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="container max-w-3xl">
            <span className="text-primary text-center block mb-2">Q&A</span>
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">よくある質問</h2>
            
            <Accordion type="single" collapsible className="bg-background rounded-md">
              <AccordionItem value="item-1" className="text-primary">
                <AccordionTrigger className="md:px-4 text-left">Q1　Humeeの利用に資格は必要ですか？</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-primary">
                  いいえ、障害者就労支援施設（A型・B型）であればご利用いただけます。
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="text-primary">
                <AccordionTrigger className="md:px-4 text-left">Q2　施設側がサポートできない場合も対応できますか？</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-primary">
                  はい。運営会社の支援サービスで施設のオンライン支援を代行することも可能です。
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="text-primary">
                <AccordionTrigger className="md:px-4 text-left">Q3　企業側の障害者雇用支援も可能ですか？</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-primary">
                  はい。マッチングやトライアル雇用支援を行っています。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <Cta/>
      </main>

      <Footer/>
    </div>
  )
}