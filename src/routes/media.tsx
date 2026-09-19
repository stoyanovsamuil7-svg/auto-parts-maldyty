import { createFileRoute } from "@tanstack/react-router";
import { Camera, Play } from "lucide-react";
import { pick, useLanguage } from "@/lib/i18n";
import brakeHero from "@/assets/brake-hero.jpg";
import storeInterior from "@/assets/store-interior.jpg";

export const Route = createFileRoute("/media")({
  head: () => ({ meta: [{ title: "Foto i wideo — Auto Parts Store in Maldyty" }, { name: "description", content: "Zdjęcia i materiały wideo sklepu Auto Parts Store in Maldyty." }, { property: "og:title", content: "Foto i wideo — Auto Parts Store in Maldyty" }, { property: "og:description", content: "Zobacz sklep i wybrane części samochodowe." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: MediaPage,
});

function MediaPage() { const { language } = useLanguage(); return <>
  <section className="page-wrap pb-10 pt-14 sm:pt-20"><p className="eyebrow">{pick(language, { pl: "Foto i wideo", en: "Photo & video" })}</p><h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{pick(language, { pl: "Zajrzyj do naszego sklepu.", en: "Take a look inside our store." })}</h1><p className="mt-4 max-w-2xl text-muted-foreground">{pick(language, { pl: "Obecne zdjęcia są demonstracyjne i zostaną zastąpione materiałami właściciela.", en: "The current images are demonstrative and will be replaced with the owner's materials." })}</p></section>
  <section className="page-wrap pb-20"><div className="grid gap-4 md:grid-cols-12"><figure className="image-frame md:col-span-8"><img src={storeInterior} alt="Store interior" width={1280} height={960} className="aspect-[16/10] h-full w-full object-cover" /><figcaption className="p-4 text-sm font-semibold">{pick(language, { pl: "Wnętrze i punkt obsługi", en: "Interior and service counter" })}</figcaption></figure><figure className="image-frame md:col-span-4"><img src={brakeHero} alt="Brake parts" width={1280} height={1024} loading="lazy" className="aspect-square w-full object-cover" /><figcaption className="p-4 text-sm font-semibold">{pick(language, { pl: "Wybrane części", en: "Selected parts" })}</figcaption></figure><div className="glass-panel grid min-h-72 place-items-center p-8 text-center md:col-span-12"><div><span className="mx-auto grid size-14 place-items-center rounded-md bg-foreground text-background"><Play /></span><h2 className="mt-5 text-2xl font-semibold">{pick(language, { pl: "Miejsce na film ze sklepu", en: "Store video coming here" })}</h2><p className="mt-2 text-sm text-muted-foreground">{pick(language, { pl: "Dodamy film po otrzymaniu materiałów.", en: "We will add the video once the materials arrive." })}</p><Camera className="mx-auto mt-5 text-primary" /></div></div></div></section>
  </>; }