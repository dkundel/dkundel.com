import headshotImage from '../../images/me-decorative.png';

export function HomeIntro() {
  return (
    <div className="flex flex-col md:flex-row-reverse">
      <img
        className="-mt-3 max-w-[200px] md:max-w-sm mx-auto mb-5 md:m-0"
        src={headshotImage.src}
        width={headshotImage.width}
        height={headshotImage.height}
        alt="Photo of Dominik in front of purple background"
      />
      <hgroup className="min-w-[7rem] flex-1 text-sm">
        <h1 className="text-6xl large-headings font-black mb-2 text-highlight-gradient leading-[1.4em]">
          <span className="block mb-0 mt-3 sm:mt-10 font-sans font-thin text-3xl md:text-4xl text-black/80 dark:text-gray-200">
            Hi! I'm{' '}
          </span>
          <span className="block mb-0 sm:min-w-[444px] text-highlight-gradient leading-[1.1em] text-6xl md:text-8xl">
            Dominik <br className="hidden md:block" /> Kundel
          </span>
        </h1>
        <p className="mb-2 text-base">
          <span className="small-all-caps sm:medium-all-caps font-light">Developer | Product Leader | Public Speaker</span>
        </p>
      </hgroup>
    </div>
  );
}
