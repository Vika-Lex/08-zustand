import {Roboto} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import {Metadata} from "next";

const roboto = Roboto({
    variable: "--font-roboto",
    weight: ["400", "700"],
    subsets: ["latin"],
    style: "normal",
    display: "swap"
});

export const metadata: Metadata = {
    title: "NoteHub - Your Personal Note Manager",
    description: "NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go.",
    openGraph: {
        title: "NoteHub - Your Personal Note Manager",
        description: "NoteHub is a simple and efficient application designed for managing personal notes.",
        url: "https://07-routing-nextjs-murex.vercel.app",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub Open Graph Image"
            }
        ]
    }
}


export default function RootLayout({
                                       children,
                                       modal,
                                   }: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {


    return (
        <html lang="en">
        <body className={` ${roboto.variable}`}>
        <TanStackProvider>
            <div className='wrapper'>
                <Header/>
                <main>
                    <div className='container'>
                        {children}
                        {modal}
                    </div>
                </main>
                <Footer/>
            </div>
        </TanStackProvider>
        </body>
        </html>
    );
}
