import Image from "next/image"

const Footer = () => {
    return (
        <footer className="border-t py-12 px-4 bg-primary dark:bg-black">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Image src="/images/logo_white.svg" alt="ロゴ" width={82} height={20}/>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <p className="text-sm text-white">
                            © 2025 Humme. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer