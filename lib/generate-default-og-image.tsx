import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const ogShareImageAlt =
  "Павел Фролов — маркетолог-стратег и архитектор AI-систем, внедрение AI-агентов под ключ";
export const ogShareImageSize = { width: 1200, height: 630 };

export async function generateDefaultOgImageResponse() {
  const root = process.cwd();
  const [fontCyrillic, fontLatin] = await Promise.all([
    readFile(path.join(root, "public/fonts/onest-cyrillic-800.woff")),
    readFile(path.join(root, "public/fonts/onest-latin-800.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #08090f 0%, #13161f 42%, #0e1018 100%)",
          color: "#e8eaf4",
          fontFamily: "OnestCyr, OnestLat",
        }}
      >
        <div
          style={{
            width: 72,
            height: 4,
            background: "#2563eb",
            borderRadius: 2,
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            maxWidth: 980,
            marginBottom: 20,
          }}
        >
          Павел Фролов
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: "#4d7ef5",
            letterSpacing: "-0.025em",
            lineHeight: 1.18,
            maxWidth: 1020,
            marginBottom: 28,
          }}
        >
          Внедрение AI-агентов под ключ для бизнеса
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#7a86a8",
            fontWeight: 500,
            maxWidth: 860,
            lineHeight: 1.45,
          }}
        >
          Маркетолог-стратег · 19 лет опыта · проектирую AI-системы для маркетинга и операций
        </div>
      </div>
    ),
    {
      ...ogShareImageSize,
      fonts: [
        {
          name: "OnestCyr",
          data: fontCyrillic,
          style: "normal",
          weight: 800,
        },
        {
          name: "OnestLat",
          data: fontLatin,
          style: "normal",
          weight: 800,
        },
      ],
    },
  );
}
