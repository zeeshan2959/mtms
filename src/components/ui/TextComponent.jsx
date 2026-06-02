const TextComponent = ({ text }) => {
  return (
    <div
      className="mb-4 flex gap-0 rounded-[15px] max-w-[300px] sm:max-w-[940px] 3xl:max-w-[967px] ml-auto md:mx-auto px-[15px] sm:px-[30px] 3xl:px-[35px] py-[20px] font-normal md:font-medium bg-[rgba(221,221,221,0.20)]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <p
        className="text-white text-sm md:text-[14px] 2xl:text-[16px] font-normal 3xl:font-medium"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {text}
      </p>
    </div>
  );
};

export default TextComponent;
