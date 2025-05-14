import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import topHeroBack from "@/app/assets/images/top_back.png"

const Cta = () => {
    return (
        <>
            {/* CTA Section */}
            <section className="py-20 px-4 bg-top bg-cover relative" style={{ backgroundImage: `url(${topHeroBack.src})` }}>
                <div className="absolute inset-0 bg-white/80"></div>
                <div className="container max-w-3xl relative z-10">
                    <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6 text-primary dark:text-black">まずは無料相談から！</h2>
                    <p className="text-xl mb-8 text-primary leading-9 dark:text-black">
                        <span className="marker-highlight">「Humeeと一緒に、未来へ</span><br className="md:hidden"/><span className="marker-highlight">一歩踏み出しませんか？」</span>
                    </p>
                    <div className="flex gap-4 justify-center flex-col sm:flex-row">
                        <Button size="lg" asChild>
                        <Link href="/about">
                            Humeeを知る
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        </Button>
                        <Button size="lg" variant="secondary" asChild>
                        <Link href="/contact">
                            無料は相談こちら
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        </Button>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cta