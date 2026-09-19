import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pick, useLanguage } from "@/lib/i18n";
import brakeHero from "@/assets/brake-hero.jpg";
import storeInterior from "@/assets/store-interior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Auto Parts Store in Maldyty — Części samochodowe" }, { name: "description", content: "Części samochodowe w Małdytach. Dobór części, szybkie zamówienia i odbiór przy ul. Prusa 5." }, { property: "og:title", content: "Auto Parts Store in Maldyty" }, { property: "og:description", content: "Lokalny sklep z częściami samochodowymi w Małdytach." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: HomePage,
});

const categories = [
  ["Hamulce", "Brakes", "Tarcze, klocki, zaciski i płyny", "Discs, pads, calipers and fluids"],
  ["Oleje i filtry", "Oils & filters", "Oleje silnikowe, filtry powietrza i oleju", "Engine oils, air and oil filters"],
  ["Zawieszenie", "Suspension", "Amortyzatory, tuleje, wahacze", "Shocks, bushings and control arms"],
  ["Elektryka", "Electrical", "Akumulatory, alternatory i czujniki", "Batteries, alternators and sensors"],
  ["Napęd", "Drivetrain", "Sprzęgła, łożyska i przeguby", "Clutches, bearings and joints"],
  ["Oświetlenie", "Lighting", "Żarówki, reflektory i moduły LED", "Bulbs, headlights and LED modules"],
];

function HomePage() {
  const { language } = useLanguage();
  return <>
    <section className="page-wrap page-section grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
      <div>
        <p className="eyebrow">{pick(language, { pl: "Części samochodowe · Małdyty", en: "Auto parts · Małdyty" })}</p>
        <h1 className="mt-5 max-w-[18ch] text-4xl font-semibold leading-[1.02] text-balance sm:text-6xl">{pick(language, { pl: "Właściwa część. Bez zgadywania.", en: "The right part. No guesswork." })}</h1>
        <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg">{pick(language, { pl: "Lokalny sklep z częściami do samochodów osobowych i dostawczych. Pomożemy dobrać część, potwierdzimy dostępność i przygotujemy ją do odbioru.", en: "Your local source for passenger and commercial vehicle parts. We identify the right part, confirm availability and prepare it for collection." })}</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button variant="dark" size="lg" asChild><Link to="/products">{pick(language, { pl: "Zobacz asortyment", en: "Browse products" })}<ArrowRight /></Link></Button><Button variant="glass" size="lg" asChild><Link to="/find-us">{pick(language, { pl: "Znajdź sklep", en: "Find the store" })}</Link></Button></div>
        <div className="mt-8 flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground"><span className="glass-panel px-3 py-2">{pick(language, { pl: "Dobór po numerze VIN", en: "VIN matching" })}</span><span className="glass-panel px-3 py-2">ul. Prusa 5</span><span className="glass-panel px-3 py-2">PL / EN</span></div>
      </div>
      <div className="glass-panel p-3"><img src={brakeHero} alt="Brake disc and pads" width={1280} height={1024} className="aspect-[5/4] w-full rounded-md object-cover" /><div className="flex items-center justify-between gap-3 px-2 pb-1 pt-3"><div><p className="text-sm font-semibold">{pick(language, { pl: "Precyzyjny dobór części", en: "Precise part matching" })}</p><p className="font-mono text-[11px] text-muted-foreground">OE · OEM · aftermarket</p></div><span className="rounded bg-accent/15 px-2.5 py-1 font-mono text-[11px] text-accent">{pick(language, { pl: "Dostępne", en: "Available" })}</span></div></div>
    </section>
    <section className="border-y border-foreground/10 bg-surface/30"><div className="page-wrap page-section"><div className="flex items-end justify-between"><div><p className="eyebrow">{pick(language, { pl: "Asortyment", en: "Product range" })}</p><h2 className="mt-2 text-3xl font-semibold">{pick(language, { pl: "Najczęściej wybierane kategorie", en: "Most requested categories" })}</h2></div><Link to="/products" className="hidden text-sm font-semibold sm:block">{pick(language, { pl: "Pełna lista →", en: "Full list →" })}</Link></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{categories.map((c, i) => <Link to="/products" key={c[0]} className="glass-panel group p-5 transition-transform hover:-translate-y-1"><div className="font-mono text-[11px] text-muted-foreground">0{i + 1}</div><h3 className="mt-7 text-lg font-semibold">{language === "pl" ? c[0] : c[1]}</h3><p className="mt-1 text-sm text-muted-foreground">{language === "pl" ? c[2] : c[3]}</p></Link>)}</div></div></section>
    <section className="page-wrap page-section grid items-center gap-9 lg:grid-cols-2"><div className="image-frame"><img src={storeInterior} alt="Auto parts shop interior" width={1280} height={960} loading="lazy" className="aspect-[4/3] w-full object-cover" /></div><div><p className="eyebrow">{pick(language, { pl: "Lokalnie i konkretnie", en: "Local and practical" })}</p><h2 className="mt-2 text-3xl font-semibold">{pick(language, { pl: "Pomoc w doborze, nie tylko półka z częściami.", en: "Part advice, not just shelves." })}</h2><p className="mt-4 max-w-[50ch] leading-relaxed text-muted-foreground">{pick(language, { pl: "Przyjdź z numerem VIN, numerem starej części lub opisem problemu. Sprawdzimy właściwy wariant i dostępność.", en: "Bring your VIN, old part number or a description of the issue. We will check the correct variant and availability." })}</p><div className="mt-7 flex flex-col gap-3 text-sm"><span className="flex items-center gap-3"><Clock3 className="text-primary" />{pick(language, { pl: "Szybkie sprawdzenie dostępności", en: "Fast availability check" })}</span><span className="flex items-center gap-3"><MapPin className="text-primary" />ul. Prusa 5, 14-330 Małdyty</span></div></div></section>
  </>;
}