import type { Metadata } from "next";

import { NicheLanding } from "@/components/niche-landing";
import { zastroyshchikiLanding } from "@/lib/niches/zastroyshchiki";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: zastroyshchikiLanding.meta.title,
  description: zastroyshchikiLanding.meta.description,
  path: zastroyshchikiLanding.path,
});

export default function DeveloperMarketingPage() {
  return <NicheLanding config={zastroyshchikiLanding} />;
}
