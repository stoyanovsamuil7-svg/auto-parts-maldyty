import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, PackageSearch, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LanguageProvider, pick, useLanguage } from "@/lib/i18n";

const nav = [
  { to: "/" as const, pl: "Główna", en: "Home" },
  { to: "/products" as const, pl: "Produkty", en: "Products" },
  { to: "/about" as const, pl: "O nas", en: "About" },
  { to: "/media" as const, pl: "Foto i wideo", en: "Photo & video" },
  { to: "/find-us" as const, pl: "Jak nas znaleźć", en: "Find us" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

function Header() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-foreground text-background"><PackageSearch size={21} /></span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-bold">Auto Parts Store</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">in Maldyty</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => <Link key={item.to} to={item.to} className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${pathname === item.to ? "bg-foreground text-background" : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"}`}>{item[language]}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md bg-foreground/5 p-0.5 font-mono text-xs" aria-label="Language">
            {(["pl", "en"] as const).map((lang) => <button key={lang} type="button" onClick={() => setLanguage(lang)} className={`rounded px-2.5 py-1.5 font-medium uppercase ${language === lang ? "bg-foreground text-background" : "text-muted-foreground"}`}>{lang}</button>)}
          </div>
          <Button variant="accent" asChild className="hidden sm:inline-flex"><Link to="/find-us" hash="inquiry">{pick(language, { pl: "Zapytaj o część", en: "Ask for a part" })}</Link></Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && <nav className="border-t border-foreground/10 bg-background px-5 py-3 lg:hidden">{nav.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="block border-b border-foreground/5 py-3 text-sm font-semibold">{item[language]}</Link>)}</nav>}
    </header>
  );
}

function Footer() {
  const { language } = useLanguage();
  return <footer className="border-t border-dark-foreground/10 bg-dark text-dark-foreground"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-dark-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-8"><p>© 2026 Auto Parts Store in Maldyty</p><p>ul. Prusa 5 · 14-330 Małdyty · {pick(language, { pl: "Polska", en: "Poland" })}</p></div></footer>;
}