import Reveal from "./Reveal";

const TextComponent = ({ text }) => {
  return (
    <Reveal
      y={36}
      duration={1}
      className="mb-4 ml-auto flex w-full max-w-[940px] gap-0 rounded-[18px] border border-white/15 bg-[linear-gradient(115deg,rgba(255,255,255,0.13),rgba(255,255,255,0.045)_55%,rgba(44,188,205,0.10))] px-3 py-4 font-normal shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_14px_36px_rgba(0,0,0,0.16)] backdrop-blur-2xl backdrop-saturate-150 sm:px-[30px] sm:py-[20px] md:mx-auto md:font-medium 3xl:max-w-[967px]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <p
        className="text-white text-sm md:text-[14px] 2xl:text-[16px] font-normal 3xl:font-medium"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {text}
      </p>
    </Reveal>
  );
};

export default TextComponent;
