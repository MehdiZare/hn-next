import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="bg-hn-orange p-4">
            <div className="container mx-auto">
                <Link href="/" className="text-black font-bold text-xl">
                    HN Dashboard
                </Link>
            </div>
        </nav>
    )
}