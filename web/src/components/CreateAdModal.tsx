import { FormEvent, useEffect, useState } from "react";
import { Check, GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Input } from "./Form/Input";
import { ToggleDay } from "../components/ToggleDay";
import { nlwApi } from "../services/api";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    nlwApi("/games").then((response) => setGames(response.data));
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data);
    if (!data.name) {
      return;
    }

    try {
      await nlwApi.post(`/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      alert("Anúncio criado com sucesso");
    } catch (err) {
      console.log(err);
      alert("Erro ao criar o anúncio");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed px-10 py-8 w-[480px] bg-[#2a2634] text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <select
              name="game"
              id="game"
              className="bg-zinc-900 px-4 py-3 rounded text-sm placeholder:text-zinc-500"
              defaultValue=""
            >
              <option disabled value="">
                Selecione o game que deseja jogar
              </option>

              {games.map((game, index) => (
                <option value={game.id} key={index}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              name="name"
              type="text"
              id="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                name="yearsPlaying"
                type="number"
                id="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                name="discord"
                type="text"
                id="discord"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="hourStart">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleDay
                  day="D"
                  value="0"
                  title="Domingo"
                  weekDays={weekDays}
                />
                <ToggleDay
                  day="S"
                  value="1"
                  title="Segunda"
                  weekDays={weekDays}
                />
                <ToggleDay
                  day="T"
                  value="2"
                  title="Terça"
                  weekDays={weekDays}
                />
                <ToggleDay
                  day="Q"
                  value="3"
                  title="Quarta"
                  weekDays={weekDays}
                />
                <ToggleDay
                  day="Q"
                  value="4"
                  title="Quinta"
                  weekDays={weekDays}
                />
                <ToggleDay
                  day="S"
                  value="5"
                  title="Sexta"
                  weekDays={weekDays}
                />
                <ToggleDay
                  day="S"
                  value="6"
                  title="Sábado"
                  weekDays={weekDays}
                />
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourEnd" className="">
                Qual horário do dia?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="hourStart"
                  id="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  name="hourEnd"
                  type="time"
                  id="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-6 flex gap-2 text-sm font-normal items-center">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(Check) => {
                Check ? setUseVoiceChannel(true) : setUseVoiceChannel(false);
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator className="justify-center">
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-8 flex justify-end gap-4 font-semibold">
            <Dialog.Close className="bg-zinc-500 py-[14px] px-5 rounded-md hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="py-[14px] px-5 flex items-center gap-3 bg-violet-500 rounded-md hover:bg-violet-700"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
