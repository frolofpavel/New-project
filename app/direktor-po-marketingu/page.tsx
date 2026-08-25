import type { Metadata } from "next";

import { NicheLanding } from "@/components/niche-landing";
import { cmoLanding } from "@/lib/niches/cmo";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: cmoLanding.meta.title,
  description: cmoLanding.meta.description,
  path: cmoLanding.path,
});

export default function MarketingDirectorPage() {
  return <NicheLanding config={cmoLanding} />;
}
