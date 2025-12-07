import './globals.css'

export const metadata = {
    title: 'Real Estate Agent Directory',
    description: 'Find and connect with real estate agents in your area',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
