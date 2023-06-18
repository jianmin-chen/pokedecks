import { Manrope } from "next/font/google";
import AppDemo from "@/components/index/AppDemo";

const manrope = Manrope({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-sans"
});

export default function Index() {
    return (
        <div className={`${manrope.className} ${manrope.variable}`}>
            <header className="p-14">
                <h1 className="mb-8 text-8xl font-bold">
                    Track your Pokemon decks!
                </h1>
                <AppDemo />
            </header>
        </div>
    );
}
