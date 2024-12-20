import { Londrina_Solid } from "next/font/google";

const lodrina = Londrina_Solid({ subsets: ["latin"], weight: ["400"] });

export default function Footer() {
  return (
    <footer className="p-4 text-center sm:text-left sm:py-6 sm:grid sm:grid-cols-2">
      <p className="pt-6 border-t-8">
        <span className="block sm:inline-block sm:mr-1">
          2024
        </span>
        <strong className={`${lodrina.className} text-2xl`}>
          deCompeti.vercel.app
        </strong>
      </p>
      <ul className="text-center sm:flex sm:flex-col sm:justify-end sm:gap-1 sm:pt-6 sm:border-t-8 sm:text-right">
        <li>
          <a href="/legal-notice">
            Aviso legal
          </a>
        </li>
        <li>
          <a href="/cookie-policy">
            Política de cookies
          </a>
        </li>
        <li>
          <a href="">
            Mis cookies
          </a>
        </li>
      </ul>
    </footer>
  );
}