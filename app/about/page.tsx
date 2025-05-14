import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import heroBack from "@/app/assets/images/about_hero_back.png"
import about1 from "@/app/assets/images/about_1.png"
import industoryChallengeBack from "@/app/assets/images/about_industry_challenge_back.png"
import featureBack from "@/app/assets/images/top_feature_back.png"
import Deco1 from "@/app/assets/images/top_deco_1.svg"
import Deco2 from "@/app/assets/images/top_deco_2.svg"
import Deco2White from "@/app/assets/images/top_deco_2_white.svg"
import Deco3 from "@/app/assets/images/top_deco_3.svg"
import Deco3Mirror from "@/app/assets/images/top_deco_3_mirror.svg"
import Deco3White from "@/app/assets/images/top_deco_3_white.svg"
import topAboutDeco from "@/app/assets/images/top_about_deco.svg"
import aboutDeco1 from "@/app/assets/images/about_deco_1.svg"
import aboutDeco2 from "@/app/assets/images/about_deco_2.svg"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
        <Header />

        {/* Promo Banner */}
        <div className="bg-primary text-primary-foreground py-2 px-4 text-center font-medium">
            Humee事前登録フェア「全国展開中！！」
        </div>

        <main>
            {/* Hero Section */}
            <section className="px-4 py-20 md:py-32 relative bg-cover bg-top" style={{ backgroundImage: `url(${heroBack.src})`}}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-xl leading-normal md:text-3xl md:leading-relaxed font-bold tracking-tighter text-white flex items-center flex-col md:flex-row md:gap-2 mb-4">
                            <Image src="/images/logo_white.svg" alt="ロゴ" width={285} height={100}/>
                            <span className="inline-block mt-2">とは？</span>
                        </h1>
                        <p className="text-lg md:text-xl font-bold text-white tracking-wide mb-8 leading-8">
                            障がい者施設専門の<br className="md:hidden"/>クラウドソーシングアプリ
                        </p>
                        <div className="flex gap-4 flex-col md:flex-row">
                            <Button size="lg" asChild variant="secondary">
                                <Link href="/contact">
                                    無料相談はこちら
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Humee Concept Section */}
            <section className="py-20 px-4">
                <div className="container max-w-4xl relative">
                    <div className="absolute -top-8 left-1 md:top-12 md:-left-56">
                        <Image src={Deco1} alt="紙飛行機" className="w-12 md:w-auto"/>
                    </div>
                    <div className="absolute -bottom-32 md:bottom-auto md:top-48 md:-left-44">
                        <Image src={Deco2} alt="メール" className="w-12 md:w-auto"/>
                    </div>
                    <div className="absolute -top-8 right-5 transform scale-150 md:scale-100 md:top-4 md:-right-36">
                        <Image src={Deco3Mirror} alt="矢印" className="w-12 md:w-auto"/>
                    </div>
                    <div className="absolute -bottom-44 right-10 transform scale-[2] md:bottom-0 md:-right-56">
                        <Image src={topAboutDeco} alt="人間" className="w-12 md:w-auto"/>
                    </div>
                    <h2 className="text-xl md:text-3xl font-bold text-center text-primary leading-loose md:leading-loose mb-10">
                        Humee = Human × Me
                        <br/>
                        私らしく社会で働く
                    </h2>
                    <p className="leading-10 md:text-lg md:leading-10 dark:text-white">
                        Humeeは、「人」と「私」が出会う場所。 私たちは、「人はすべてちがう」という前提を大切にしています。誰かと比べるのではなく、その人自身が自分らしく働くことができる社会。そんな未来を、Humeeを通して創っていきたいと願っています。 一人一人が“わたしらしさ”を大切にしながら、社会と温かく、やさしくつながっていく。 Humeeは、そのための新しい働き方のプラットフォームです。 Humeeでは、在宅やスキマ時間でできるオンラインの仕事を中心に、自分のペースで挑戦できる機会を提供する施設をサポート支援しており、利用者は小さな成功体験が積み重なることで、自信と選択肢が増え、未来への道が広がっていきます。
                    </p>
                </div>
            </section>

            {/* Future Vision Section */}
            <section className="mt-40 pb-20 bg-cover bg-top" style={{ backgroundImage: `url(${featureBack.src})`}}>
                <div className="container">
                    <span className="text-primary text-center block mb-5">goals</span>
                    <h2 className="text-3xl font-bold text-center mb-12 text-primary">Humeeが目指す未来</h2>
                    <div className="flex flex-col md:flex-row gap-12 items-stretch">
                        <div className="max-w-4xl px-4 leading-10 tracking-wider md:max-w-2xl">
                            <p className="mb-8 dark:text-gray-300">
                                現在、障がい者施設の現場では、仕事を獲得できる施設とそうでない施設との間に大きな格差が生まれています。 また、提供されるサービスの質や、支援員の専門性にもばらつきがあり、残念ながら社会的な理解や支援のスキルが不足している支援者も存在します。本当に適切な福祉施設を見極めることは、利用者やそのご家族にとって非常に難しい時代になっているのです。 
                                <br/>
                                私たちは「Humee」を通じて、この現状を変えていきたいと考えています。 Humeeは、福祉施設とお仕事のマッチングを支援し、施設ごとの業務バランスや得意分野を可視化することで、よりよい支援の仕組みと環境を整える土台をつくります。 さらに、Humeeの仕組みを活用することで、福祉に精通したIT人材の育成を行い、施設全体のスキルや専門性の底上げを図ることが可能です。
                            </p>
                            <p>
                                Humeeは、「支援の質」と「働く力」をつなぎ直す。そして、社会に必要とされる”最強の社会貢献アプリケーション”となることを目指しています。
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <Image src={about1} alt="Humeeが目指す未来" className="w-full h-[100%]}"/>
                        </div>
                        
                    </div>
                </div>
            </section>

            {/* What is Humee Section */}
            <section className="py-24 px-4 bg-primary dark:bg-black">
                <div className="container max-w-4xl mb-24">
                    <span className="text-white text-center block mb-4">about application</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-white leading-relaxed">
                        <span className="text-secondaryColor">障がい者就労支援アプリ</span>
                        <br/>
                        <span className="text-secondaryColor">「Humee（ヒューミー）」</span><br className="md:hidden"/>とは？
                    </h2>
                    <p className="text-lg text-white leading-10">
                        Humeeは、<span className="text-secondaryColor">全国の障がい者就労支援施設と企業・行政をつなぐ</span>、『クラウドソーシング型のマッチングプラットフォーム』です。 就労継続支援B型・A型施設と、仕事を委託したい企業を結び、<span className="text-secondaryColor">“人手不足”と“工賃向上”の両方を同時に解決する</span>ことを目指しています。
                    </p>
                </div>

                <div className="container max-w-6xl relative">
                    <div className="absolute top-14 md:-top-52 md:-left-28">
                        <Image src={Deco3White} alt="矢印" className="w-12 md:w-auto"/>
                    </div>
                    <div className="absolute top-14 md:top-32 md:-left-48">
                        <Image src={Deco2White} alt="メール" className="w-12 md:w-auto"/>
                    </div>
                    <div className="relative">
                        <div className="absolute top-14 md:top-28 md:-right-32 z-10">
                                <Image src={aboutDeco1} alt="プラグ" className="w-12 md:w-auto"/>
                        </div>
                        <div className="bg-background px-4 md:px-8 py-10 rounded-lg relative mb-20 z-20">
                            <div className="absolute -top-3 left-1/2 w-[80%] md:w-auto text-center md:text-left transform -translate-x-1/2 md:translate-x-0 md:left-0 bg-secondaryColor border-2 border-solid border-primary rounded-2xl">
                                <h3 className="text-lg font-bold px-3 md:px-10 text-primary dark:text-black">企業・行政の方へ</h3>
                            </div>
                            <h4 className="text-lg font-bold text-primary mb-5 text-center md:text-left">
                                Humeeはこんなニーズに応えます
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span className="dark:text-white">外注依頼先（デザイン・データ入力・動画編集など）を探している</span>
                                </li>
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span className="dark:text-white">ITやクリエイティブ人材を社外に確保したい</span>
                                </li>
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span className="dark:text-white">CSRやSDGs貢献に力を入れたい</span>
                                </li>
                                    <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span className="dark:text-white">障がい者雇用に関心があるが、現状は難しい</span>
                                </li>
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span className="dark:text-white">業務の一部を安心して任せたい</span>
                                </li>
                            </ul>
                            <p className="mt-6 text-primary leading-8 font-bold dark:text-white">
                                Humeeでは、施設単位で業務の依頼が可能です。障がい者雇用の前段階としても活用でき、
                                <br className="hidden md:block"/>
                                中小企業でも無理なく社会貢献に参画できる仕組みです。
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute top-14 md:bottom-20 md:-right-32 z-10">
                            <Image src={aboutDeco2} alt="プラグ" className="w-12 md:w-auto"/>
                        </div>
                        <div className="bg-background px-4 md:px-8 py-10 rounded-lg relative mb-28 z-20">
                            <div className="absolute -top-3 left-1/2 w-[85%] md:w-auto text-center md:text-left transform -translate-x-1/2 md:translate-x-0 md:left-0 bg-secondaryColor border-2 border-solid border-primary rounded-2xl">
                                <h3 className="text-lg font-bold px-3 md:px-10 text-primary dark:text-black">障がい者就労支援施設の方へ</h3>
                            </div>
                            <h4 className="text-lg font-bold text-primary mb-5 text-center md:text-left">Humeeの導入メリット</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span className="dark:text-white">継続的な業務を受注するための営業が不要に</span>
                                </li>
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span className="dark:text-white">利用者の工賃向上・ITスキル向上を実現  様々な実務経験が積め、就職準備の幅が広がる</span>
                                </li>
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span className="dark:text-white">IT支援が苦手な支援員も勉強会を受けられる </span>
                                </li>
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span className="dark:text-white">通所・在宅の両方で活用可能な案件が中心</span>
                                </li>
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span className="dark:text-white">施設は利用者に対して「奪い合い」ではなく、共に成長する支援構造を設計</span>
                                </li>
                            </ul>
                            <p className="mt-6 text-primary leading-8 font-bold">
                                Humeeでは、施設単位で業務の依頼が可能です。障がい者雇用の前段階としても活用でき、
                                <br className="hidden md:block"/>
                                中小企業でも無理なく社会貢献に参画できる仕組みです。
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container max-w-4xl md:text-center">
                    <p className="text-white leading-10">
                        Humeeは、Lancers・クラウドワークス・ココナラといったクラウドソーシングサービスを参考に
                        <br className="hidden md:block"/>
                        しつつ、障がい者支援施設専門に特化した、唯一無二の就労支援アプリとして開発されています。
                    </p>
                </div>
            </section>

            {/* Industry Challenges Section */}
            <section className="pt-20 pb-36 px-4 bg-cover bg-top relative" style={{backgroundImage: `url(${industoryChallengeBack.src})`}}>
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="container max-w-4xl relative z-10">
                <span className="text-white text-center block mb-5">assignment</span>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-20 text-white leading-10">
                    Humeeが解決する
                    <br />
                    業界の&quot;見えにくい課題&quot;
                </h2>
                <div className="text-white">
                    <p className="md:text-lg leading-10 mb-12">
                        障がい者就労支援は、施設ごとに大きな支援格差があります。
                        <br className="hidden md:block"/>
                        <span className="text-secondaryColor">支援員のIT知識不足、データ管理の甘さ</span>、企業との橋渡しができない構造などから、利用者が成長できず、就労につながらないケースも多発しています。
                    </p>
                    <p className="md:text-lg leading-10">
                        一方で企業側も、特例子会社の設立などは大企業でなければ困難。 <span className="text-secondaryColor">中小企業では障がい者雇用の負担感が大きく、社会的関心はあっても実行に移せないのが現状</span>です。
                    </p>
                </div>
            </div>
            </section>

            {/* New Work Support Section */}
            <section className="pt-20 pb-64 px-4">
                <div className="container max-w-4xl">
                    <span className="text-primary text-center block mb-5">future</span>
                    <h2 className="text-3xl font-bold text-center mb-16 text-primary">目指す未来</h2>
                    <Card className="relative border-primary border-[2px] mb-16">
                        <div className="absolute -top-32 md:-top-10 md:-left-44">
                            <Image src={Deco1} alt="紙飛行機" className="w-12 md:w-auto"/>
                        </div>
                        <div className="absolute -top-36 -right-2 md:top-10 md:-right-56">
                            <Image src={Deco2} alt="メール" className="w-12 md:w-auto"/>
                        </div>
                        <div className="absolute -top-8 md:-top-6 left-1/2 w-[80%] text-center transform -translate-x-1/2 bg-secondaryColor border-2 border-solid border-primary rounded-3xl">
                            <h3 className="text-lg md:text-2xl font-bold px-3 md:px-10 text-primary py-[2px] dark:text-black">
                                Humeeが提供する新しい
                                <br className="md:hidden"/>
                                就労支援のかたち
                            </h3>
                        </div>
                        <CardContent className="pt-16 md:pt-12 pb-10 md:px-44">
                            <ul className="space-y-4 text-primary">
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span>オンライン案件の提供と仲介（月額不要・成果報酬制）</span>
                                </li>
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span>施設向け IT × 福祉のレクチャー提供（D福連携）</span>
                                </li>
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span>支援員育成・報酬改善につながるスキーム</span>
                                </li>
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span>企業との勉強会・交流促進イベントの定期開催</span>
                                </li>
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span>トライアル就労やマッチングの前段階としても機能</span>
                                </li>
                                <li className="flex items-start md:items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary mt-1 md:mt-0" />
                                    <span>「代行任せではない」本質的な雇用支援を企業と共創</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <div className="text-center relative">
                        <div className="absolute -bottom-20 md:-bottom-28 md:-left-44 transform scale-150 md:scale-100 -rotate-[60deg]">
                            <Image src={Deco3} alt="矢印" className="w-12 md:w-auto"/>
                        </div>
                        <div className="absolute -bottom-44 right-6 transform rotate-12 md:-bottom-6 md:-right-44 scale-[220%]">
                            <Image src={topAboutDeco} alt="人間" className="w-12 md:w-auto"/>
                        </div>
                        <p className="text-primary leading-10 mb-16">
                            Humeeは、障がいのある方が<br className="md:hidden"/>「自分らしく働ける社会」を<br className="md:hidden"/>デザインします。
                            <br />
                            それは同時に、企業が<br className="md:hidden"/>自然なかたちで障がい者雇用に<br className="md:hidden"/>関われる仕組みをつくるという<br className="md:hidden"/>ことでもあります。
                        </p>
                        <p className="text-primary text-3xl font-bold mb-16 leading-10">
                            <span className="marker-highlight">Humee</span>
                            <span className="marker-highlight"> = </span>
                            <br className="md:hidden"/>
                            <span className="marker-highlight">Human×Me</span>
                        </p>
                        <p className="text-primary leading-10">
                            人と人とが「違い」を<br className="md:hidden"/>力に変え、社会とつながっていく。
                            <br />
                            それが、<span className="font-bold text-2xl">Humeeが描く<br className="md:hidden"/>「新しい就労支援の<br className="md:hidden"/>世界」</span>です。
                        </p>
                    </div>
                </div>
            </section>

            <Cta/>
        </main>

        <Footer/>
        </div>
    );
}