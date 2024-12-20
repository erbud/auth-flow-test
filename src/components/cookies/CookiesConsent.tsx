"use client";

import { useState, useEffect } from "react";
import { setCookie, hasCookie } from "cookies-next/client";

export default function CookiesForm() {
  const [acceptedConsent, setAcceptedConsent] = useState<boolean>(true);

  useEffect(() => {
    setAcceptedConsent(hasCookie('CookiesConsent'));
  }, []);

  const handleSubmit = () => {
    setAcceptedConsent(true);
    setCookie("CookiesConsent", "true", {
      maxAge: 60*60*24*30,
      sameSite: "strict",
      httpOnly: false,
      secure: true
    });
  };

  return !acceptedConsent && (
    <section id="cookies-consent">
      <form onSubmit={handleSubmit}>
        <div className="flex fixed bottom-0 left-0 right-0 items-center justify-between px-4 py-8 bg-amber-100">
          <p className="text-dark text-base mr-8">
            <strong>Este sitio web utiliza <em>cookies</em> para mejorar la experiencia del usuario</strong>.
            Al utilizar el sitio web, acepta todas las <em>cookies</em> de acuerdo con nuestra <a href="/cookie-policy">Política de cookies</a>.
          </p>
          <button
            type="submit"
            className="bg-green-500 py-2 px-8 rounded text-white font-bold"
          >
            Aceptar
          </button>
        </div>
      </form>
    </section>
  );
};