import { useMediaQuery } from "react-responsive";
import AnimatedText from "../components/ui/AnimatedText";
import Reveal from "../components/ui/Reveal";

export default function Dashboard() {
  const isWeb = useMediaQuery({ minWidth: 1920 });

  return (
    <div className="ml-0 md:ml-[201px] lg:ml-[401px] xl:ml-[601px] 3xl:ml-[602px] mt-10">

      <AnimatedText
        as="h1"
        text="Conception to reality in one place"
        stagger={0.08}
        className="text-[32px] md:text-[44px] lg:text-[66px] xl:text-[66px] 2xl:text-[88px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2]"
        style={{ fontSize: isWeb && '110px' }}
      />

      <Reveal as="p" delay={0.35} y={24} style={{fontSize: isWeb && '23px'}} className={`mt-[13px] font-medium text-white text-[12px] md:text-[15px] lg:text-[18px] leading-normal font-[Poppins,sans-serif]`}>
        Providing technological consulting and integrated engineering <br />
        services that covers the entire product development process
      </Reveal>

    </div>
  );
};
