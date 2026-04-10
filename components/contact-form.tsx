"use client";

import { FormEvent, useState } from "react";

type FormState = {
  type: "idle" | "success" | "error";
  message: string;
};

const initialState: FormState = {
  type: "idle",
  message: "",
};

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState(initialState);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
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

      <label>
        <span>Email</span>
        <input name="email" type="email" placeholder="you@example.com" required />
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
        <span>Что хотите запустить или улучшить</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Опишите задачу, сроки и желаемый результат"
          required
        />
      </label>

      <button className="button button--primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Отправляю..." : "Отправить заявку"}
      </button>

      {state.message ? (
        <p className={`form-status form-status--${state.type}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
