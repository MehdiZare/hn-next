import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '@/styles/globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'HackerNews Dashboard',
    description: 'Explore top posts and users from HackerNews',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar/>
        <main className="container mx-auto px-4 mb-8 flex-grow">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    )
}