export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t-2 border-hn-orange py-4 mt-8">
            <div className="container mx-auto text-center">
                <p>Created by <a href="https://www.linkedin.com/in/mehdizare/" target="_blank" rel="noopener noreferrer"
                                 className="hn-link">Mehdi Zare</a></p>
                <p className="text-sm mt-2">
                    <small>Disclaimer: This is an experimental project built out of curiosity. It is not officially
                        affiliated with Y Combinator or Hacker News.</small>
                </p>
            </div>
        </footer>
    )
}