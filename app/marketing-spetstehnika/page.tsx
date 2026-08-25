import type { Metadata } from "next";

import { NicheLanding } from "@/components/niche-landing";
import { spetstehnikaLanding } from "@/lib/niches/spetstehnika";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: spetstehnikaLanding.meta.title,
  description: spetstehnikaLanding.meta.description,
  path: spetstehnikaLanding.path,
});

export default function IndustrialMarketingPage() {
  return <NicheLanding config={spetstehnikaLanding} />;
}
