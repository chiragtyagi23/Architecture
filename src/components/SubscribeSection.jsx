import house5 from '@assets/House-5.png';

function SubscribeSection() {
  return (
    <section className="px-6 pb-36 max-w-[min(1600px,96vw)] mx-auto pl-8 md:pl-12 w-full box-border overflow-visible">
      <div
        className="rounded-[18px] overflow-visible grid grid-cols-1 lg:grid-cols-[1fr_780px] gap-4 lg:gap-6 items-end py-5 lg:py-6 px-8 lg:px-12 w-full box-border shadow-[4px_4px_20px_rgba(0,0,0,0.06)]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"), linear-gradient(90deg, #b8d4e8 0%, #e8d0bc 100%)`,
        }}
      >
        <div className="flex flex-col justify-center min-h-full py-4 lg:py-0">
          <div className="max-w-xl">
            <h2 className="m-0 mb-3 text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-tight text-black text-left">
              Subscribe Now
            </h2>
            <p className="m-0 mb-5 text-[0.9375rem] font-normal leading-relaxed text-black/90 text-left">
              Lorem ipsum dolor sit amet consectetur. Feugiat ut aliquet sit pellentesque sollicitudin. Egestas faucibus lacus diam in senectus consectetur. Mattis elit adipiscing quisque tellus scelerisque vehicula ante nunc.
            </p>
            <form
            className="flex gap-3 max-w-lg"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Subscribe by email"
          >
            <input
              type="email"
              className="flex-1 min-w-0 h-10 pl-3.5 pr-3.5 font-sans text-sm text-gray-900 bg-white border border-gray-200 rounded-xl outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] placeholder:text-gray-400"
              placeholder="Enter your email"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="h-10 px-5 font-sans text-sm font-bold text-white bg-gray-900 border-0 rounded-xl cursor-pointer hover:bg-gray-800 shrink-0"
            >
              Subscribe
            </button>
          </form>
          </div>
        </div>
        <div
          className="flex justify-end items-end w-full min-h-[280px] lg:min-h-0 overflow-visible pr-0 pl-0"
          style={{ minWidth: 'min(100%, 780px)' }}
        >
          <div
            className="w-full max-w-[400px] lg:max-w-none lg:w-[780px] lg:h-[460px] h-[260px] overflow-visible rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-md lg:-mb-20 -mb-12 lg:translate-x-40 translate-x-4"
          >
            <img
              src={house5}
              alt="3D isometric illustration of a modern white house with greenery, rooftop garden and wooden deck"
              className="w-full h-full object-contain object-center drop-shadow-[0_12px_32px_rgba(0,0,0,0.08)] block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SubscribeSection;
