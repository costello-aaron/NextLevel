import { Afacad } from "next/font/google";
import "./globals.css";
import Taskbar from "@/components/taskbar";

const inter = Afacad({ subsets: ["latin"] });

export const metadata = {
  title: "NextLevel Insurance",
  keywords: ["NextLevel", "Insurance", "Save", "Money", "Affordable", "Insurance"],
  description: "NextLevel Insurance - Affordable Insurance Solutions",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" className='dark'>
      <body>
        <Taskbar />
        {children}
      </body>
    </html>
  );
}