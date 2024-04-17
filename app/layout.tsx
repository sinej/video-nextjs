import type { Metadata } from "next";
import "./globals.css";
import UserProvider from "@/app/context/user";
import AllOverlay from "@/app/components/allOverlay";

export const metadata: Metadata = {
  title: "Video",
  description: "Video",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <UserProvider>
                <body>
                    <AllOverlay/>
                    {children}
                </body>
            </UserProvider>
        </html>
    );
}
