import { FaTrophy } from "react-icons/fa6";
import { GiTrophyCup } from "react-icons/gi";
import { HiTrophy } from "react-icons/hi2";
import Link from "next/link";

export default async function HomePage() {
  return (
    <>
      <section className="mt-6 px-6">
        <p className="sm:w-5/6 font-bold text-2xl sm:text-3xl md:text-4xl">
          Genera calendarios deportivos para tus competiciones de eSports.
        </p>
        <ul className="m-0 p-0 pb-6 border-b-8">
          <li className="mx-2 inline-block">
            <Link href="https://www.ea.com/es-es/games/ea-sports-fc">
              #eaFC
            </Link>
          </li>
          <li className="mx-2 inline-block">
            <Link href="https://www.nba2k.com">
              #NBA2K
            </Link>
          </li>
          <li className="mx-2 inline-block">
            <Link href="https://www.ea.com/es-mx/games/madden-nfl">
              #MaddenNFL
            </Link>
          </li>
          <li className="mx-2 inline-block">
            <Link href="https://www.ea.com/es-es/games/nhl">
              #eaNHL
            </Link>
          </li>
          <li className="mx-2 inline-block">
            <Link href="https://theshow.com" hrefLang="en">
              #TheShow
            </Link>
          </li>
        </ul>
      </section>
      <section className="mt-6">
        <ul className="sm:flex sm:gap-5 mx-4">
          <li className="sm:flex-1 p-4 text-center border-2">
            <p className="text-2xl font-bold">
              <FaTrophy className="inline-block" size="32" /> Liga
            </p>
            <p>Torneo donde los equipos juegan contra todos.</p>
          </li>
          <li className="sm:flex-1 p-4 text-center border-2">
            <p className="text-2xl font-bold">
              <GiTrophyCup className="inline-block" size="32" /> Copa
            </p>
            <p>Competición por rondas con eliminación directa.</p>
          </li>
          <li className="sm:flex-1 p-4 text-center border-2">
            <p className="text-2xl font-bold">
              <HiTrophy className="inline-block" size="32" /> Mundial
            </p>
            <p>Campeonato con fase de grupos y eliminatorias.</p>
          </li>
        </ul>
      </section>
    </>
  );
}