import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string;
};

function normalizeField(value: string | undefined) {
  return value?.trim() ?? "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPlainTextLead(payload: Required<Omit<ContactPayload, "website">>) {
  return [
    "Новая заявка с pavelfrolof.ru",
    "",
    `Имя: ${payload.name}`,
    `Email: ${payload.email}`,
    `Проект / компания: ${payload.company || "Не указано"}`,
    "",
    "Описание задачи:",
    payload.message,
  ].join("\n");
}

function buildHtmlLead(payload: Required<Omit<ContactPayload, "website">>) {
  return [
    "<h2>Новая заявка с pavelfrolof.ru</h2>",
    `<p><strong>Имя:</strong> ${escapeHtml(payload.name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>`,
    `<p><strong>Проект / компания:</strong> ${escapeHtml(payload.company || "Не указано")}</p>`,
    `<p><strong>Описание задачи:</strong></p>`,
    `<p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>`,
  ].join("");
}

async function sendTelegramLead(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Telegram delivery failed: ${details}`);
  }

  return true;
}

async function sendResendLead(payload: Required<Omit<ContactPayload, "website">>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Новая заявка с сайта от ${payload.name}`,
      text: buildPlainTextLead(payload),
      html: buildHtmlLead(payload),
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend delivery failed: ${details}`);
  }

  return true;
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  const payload = {
    name: normalizeField(body.name),
    email: normalizeField(body.email),
    company: normalizeField(body.company),
    message: normalizeField(body.message),
    website: normalizeField(body.website),
  };

  if (payload.website) {
    return NextResponse.json({
      message: "Заявка отправлена. Спасибо!",
    });
  }

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json(
      {
        message: "Заполните имя, email и описание задачи.",
      },
      { status: 400 },
    );
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json(
      {
        message: "Проверьте email и попробуйте еще раз.",
      },
      { status: 400 },
    );
  }

  const safePayload: Required<Omit<ContactPayload, "website">> = {
    name: payload.name,
    email: payload.email,
    company: payload.company,
    message: payload.message,
  };

  try {
    const [telegramSent, emailSent] = await Promise.all([
      sendTelegramLead(buildPlainTextLead(safePayload)),
      sendResendLead(safePayload),
    ]);

    if (!telegramSent && !emailSent) {
      console.info("Lead request (no provider configured)", safePayload);

      if (process.env.NODE_ENV === "development") {
        return NextResponse.json({
          message:
            "Заявка принята. Локально каналы доставки не настроены, поэтому обращение сохранено в серверном логе.",
        });
      }

      return NextResponse.json(
        {
          message:
            "Форма пока не настроена для отправки. Напишите мне в Telegram или на email, а доставку из формы мы быстро подключим.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Заявка отправлена. Спасибо! Я свяжусь с вами после просмотра деталей.",
    });
  } catch (error) {
    console.error("Lead delivery failed", error);

    return NextResponse.json(
      {
        message:
          "Не удалось отправить форму прямо сейчас. Напишите мне в Telegram или на email, и я отвечу вручную.",
      },
      { status: 500 },
    );
  }
}
