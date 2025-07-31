import banner from "/banner.png";

export default function Banner() {
  return (
    <div className="flex justify-center p-5 relative">
      <div className="w-full lg:w-4xl relative">
        <img
          src={banner}
          alt="Banner"
          className="w-full rounded-2xl filter brightness-50"
        ></img>
        <div className="absolute top-0 w-full pt-3 px-3">
          <input
            className="top-0 bg-white w-full px-2 py-1 rounded-2xl outline-none"
            type="text"
            placeholder="Buscar libro"
          ></input>
        </div>
        <p className="absolute bottom-0 md:bottom-10 p-6 px-5 text-[#ddd] sm:text-[25px] md:text-[30px] lg:text-[36px] font-semibold w-full md:w-[85%]">
          Un libro no es un gasto, es una inversión en tu mente. Cada página que
          lees te hace más libre, más sabio y más tú.
        </p>
      </div>
    </div>
  );
}
