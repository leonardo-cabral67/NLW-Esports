interface GameBannerProps {
  name: String;
  adsCount: number;
  bannerUrl: string;
}

export function GameBanner({ name, adsCount, bannerUrl }: GameBannerProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="imagem de jogo" />
      <div className="w-full absolute pt-16 px-4 pb-4 bg-game-gradient bottom-0">
        <strong className="font-bold text-white block">{name}</strong>
        <span className="text-sm text-zinc-300 block mt-1">
          {adsCount} anúncio(s)
        </span>
      </div>
    </a>
  );
}
