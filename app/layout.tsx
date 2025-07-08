import type { Metadata } from 'next'
import './globals.css'
import Chatbot from '../components/chatbot/Chatbot';

export const metadata: Metadata = {
  title: 'Charith Kandamulla',
  description: 'Crafted with Love by Charith Kandamulla',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}