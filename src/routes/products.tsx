import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CircleDot, Cog, Droplets, Gauge, Lightbulb, PlugZap, Settings2, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pick, useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Produkty — Auto Parts Store in Maldyty" }, { name: "description", content: "Oferta części samochodowych: hamulce, filtry, zawieszenie, elektryka, napęd, oświetlenie i akcesoria." }, { property: "og:title", content: "Produkty — Auto Parts Store in Maldyty" }, { property: "og:description", content: "Sprawdź kategorie części dostępnych w naszym sklepie w Małdytach." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: ProductsPage,
});

const groups = [
  { icon: CircleDot, pl: "Układ hamulcowy", en: "Brake system", plItems: ["Klocki i tarcze", "Szczęki i bębny", "Zaciski i przewody", "Płyny hamulcowe"], enItems: ["Pads and discs", "Shoes and drums", "Calipers and hoses", "Brake fluids"] },
  { icon: Droplets, pl: "Oleje i filtry", en: "Oils and filters", plItems: ["Oleje silnikowe", "Filtry oleju i paliwa", "Filtry powietrza", "Filtry kabinowe"], enItems: ["Engine oils", "Oil and fuel filters", "Air filters", "Cabin filters"] },
  { icon: Gauge, pl: "Zawieszenie i układ kierowniczy", en: "Suspension and steering", plItems: ["Amortyzatory", "Wahacze i tuleje", "Łożyska kół", "Końcówki drążków"], enItems: ["Shock absorbers", "Control arms and bushings", "Wheel bearings", "Tie rod ends"] },
  { icon: PlugZap, pl: "Elektryka", en: "Electrical", plItems: ["Akumulatory", "Świece i cewki", "Alternatory", "Czujniki"], enItems: ["Batteries", "Plugs and coils", "Alternators", "Sensors"] },
  { icon: Cog, pl: "Silnik i napęd", en: "Engine and drivetrain", plItems: ["Rozrząd", "Sprzęgła", "Paski i rolki", "Przeguby"], enItems: ["Timing systems", "Clutches", "Belts and pulleys", "CV joints"] },
  { icon: Lightbulb, pl: "Oświetlenie", en: "Lighting", plItems: ["Żarówki", "Reflektory", "Lampy tylne", "Moduły LED"], enItems: ["Bulbs", "Headlights", "Rear lights", "LED modules"] },
  { icon: Wind, pl: "Klimatyzacja i chłodzenie", en: "Climate and cooling", plItems: ["Chłodnice", "Pompy wody", "Termostaty", "Filtry kabinowe"], enItems: ["Radiators", "Water pumps", "Thermostats", "Cabin filters"] },
  { icon: Settings2, pl: "Akcesoria i chemia", en: "Accessories and chemicals", plItems: ["Wycieraczki", "Kosmetyki samochodowe", "Płyny eksploatacyjne", "Narzędzia"], enItems: ["Wiper blades", "Car care", "Operating fluids", "Tools"] },
];

function ProductsPage() {
  const { language } = useLanguage();
  return <>
    <section className="page-wrap pb-10 pt-14 sm:pt-20"><p className="eyebrow">{pick(language, { pl: "Oferta sklepu", en: "Store range" })}</p><h1 className="mt-3 max-w-[18ch] text-4xl font-semibold leading-tight sm:text-5xl">{pick(language, { pl: "Części do codziennych napraw i serwisu.", en: "Parts for everyday repairs and servicing." })}</h1><p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{pick(language, { pl: "Poniższa lista przedstawia główne grupy produktów. Dostępność konkretnej części potwierdzimy po marce, modelu, roku lub numerze VIN.", en: "This list shows our main product groups. We confirm exact availability using the make, model, year or VIN." })}</p></section>
    <section className="border-t border-foreground/10 bg-surface/30"><div className="page-wrap page-section grid gap-4 md:grid-cols-2">{groups.map((group, i) => { const Icon = group.icon; const items = language === "pl" ? group.plItems : group.enItems; return <article key={group.pl} className="glass-panel p-6"><div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-md bg-primary/10 text-primary"><Icon size={22} /></span><span className="font-mono text-[11px] text-muted-foreground">0{i + 1}</span></div><h2 className="mt-5 text-xl font-semibold">{language === "pl" ? group.pl : group.en}</h2><ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">{items.map((item) => <li key={item} className="border-t border-foreground/10 pt-2">{item}</li>)}</ul></article>; })}</div></section>
    <section className="bg-dark text-dark-foreground"><div className="page-wrap page-section flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">VIN / OE</p><h2 className="mt-2 text-3xl font-semibold">{pick(language, { pl: "Nie widzisz swojej części?", en: "Cannot see your part?" })}</h2><p className="mt-2 text-dark-foreground/65">{pick(language, { pl: "Wyślij dane auta — sprawdzimy odpowiedni wariant.", en: "Send your vehicle details and we will check the right variant." })}</p></div><Button variant="accent" size="lg" asChild><Link to="/find-us" hash="inquiry">{pick(language, { pl: "Wyślij zapytanie", en: "Send an inquiry" })}<ArrowRight /></Link></Button></div></section>
  </>;
}