import {
  generateDefaultOgImageResponse,
  ogShareImageAlt,
  ogShareImageSize,
} from "@/lib/generate-default-og-image";

export const alt = ogShareImageAlt;
export const size = ogShareImageSize;
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function Image() {
  return generateDefaultOgImageResponse();
}
