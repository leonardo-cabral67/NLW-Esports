import { MagnifyingGlassPlus } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdBanner() {
  return (
    <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between">
        <div>
          <strong className="text-2xl text-white block font-black">
            Não encontrou seu duo?
          </strong>
          <span className="text-base text-zinc-400 font-normal block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dialog.Trigger className="w-[193px] bg-violet-500 hover:bg-violet-600 px-4 py-3 text-white font-medium rounded-md flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}
