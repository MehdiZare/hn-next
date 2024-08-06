import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'HN Dashboard',
    description: 'Hacker News Dashboard - Explore top posts and users',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                {children}
            </main>
            <footer className="bg-gray-100 border-t-2 border-hn-orange py-4 mt-8">
                <div className="container mx-auto text-center">
                    <p>Created by <a href="https://www.linkedin.com/in/mehdizare/" target="_blank"
                                     rel="noopener noreferrer" className="text-hn-orange hover:underline">Mehdi Zare</a>
                    </p>
                    <p className="text-sm mt-2">
                        <small>Disclaimer: This is an experimental project built out of curiosity. It is not officially
                            affiliated with Y Combinator or Hacker News.</small>
                    </p>
                </div>
            </footer>
        </div>
        </body>
        </html>
    )
}