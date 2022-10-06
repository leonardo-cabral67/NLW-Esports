import "./styles/main.css";
import logoImg from "./assets/logo-nlw-esports.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "./components/CreateAdModal";
import { nlwApi } from "./services/api";

interface Game {
  id: string;
  title: string;
  baseUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    nlwApi("/games").then((response) => setGames(response.data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Logo do app" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <ul className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          const { id, title, baseUrl, _count } = game;

          return (
            <GameBanner
              key={id}
              name={title}
              adsCount={_count.ads}
              bannerUrl={baseUrl}
            />
          );
        })}
      </ul>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
