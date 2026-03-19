import "./globals.css";

export const metadata = {
  title: "Намын дотоод удирдлагын самбар",
  description: "МУ-ын намын хурал удирдлагын демо систем",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
