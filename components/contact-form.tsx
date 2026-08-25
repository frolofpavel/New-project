"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { metrikaGoals, reachGoal } from "@/lib/metrika";

type FormState = {
  type: "idle" | "success" | "error";
  message: string;
};

const initialState: FormState = {
  type: "idle",
  message: "",
};

type ContactFormProps = {
  /** Показать поле телефона и сделать его обязательным (посадочные под платный трафик). */
  withPhone?: boolean;
  /** Подпись кнопки отправки. */
  submitLabel?: string;
  /** Подпись поля «что за задача» — на посадочных формулировка другая. */
  messageLabel?: string;
  /** Цель Метрики. По умолчанию — общая цель формы. */
  goal?: string;
};

export function ContactForm({
  withPhone = false,
  submitLabel = "Отправить заявку",
  messageLabel = "Что хотите запустить или улучшить",
  goal = metrikaGoals.contactForm,
}: ContactFormProps = {}) {
  const [state, setState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState(initialState);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          company: formData.get("company"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const data = (await response.json()) as { message: string };

      if (!response.ok) {
        throw new Error(data.message);
      }

      event.currentTarget.reset();
      setState({
        type: "success",
        message: data.message,
      });

      if (typeof window !== "undefined") {
        reachGoal(goal);
      }
    } catch (error) {
      setState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Не удалось отправить форму. Напишите мне в Telegram или на email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <label>
        <span>Имя</span>
        <input name="name" type="text" placeholder="Как к вам обращаться" required />
      </label>

      {withPhone ? (
        <label>
          <span>Телефон</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            required
          />
        </label>
      ) : null}

      <label>
        <span>Email</span>
        <input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          required={!withPhone}
        />
      </label>

      <label>
        <span>Проект / компания</span>
        <input name="company" type="text" placeholder="Кратко о проекте" />
      </label>

      <input
        name="website"
        type="text"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="lead-form__honeypot"
      />

      <label className="lead-form__full">
        <span>{messageLabel}</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Опишите задачу, сроки и желаемый результат"
          required={!withPhone}
        />
      </label>

      <label className="lead-form__consent">
        <input name="consent" type="checkbox" required defaultChecked={false} />
        <span>
          Даю согласие на обработку персональных данных и принимаю{" "}
          <Link href="/politika-konfidencialnosti">политику конфиденциальности</Link>
        </span>
      </label>

      <button className="button button--primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Отправляю..." : submitLabel}
      </button>

      {state.message ? (
        <p className={`form-status form-status--${state.type}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
