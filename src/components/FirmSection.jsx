import peopleImg from '@assets/p-img.png';

function FirmSection() {
  const stats = [
    { value: '12+', label: 'Customers' },
    { value: '14+', label: 'Offices' },
    { value: '10+', label: 'Students' },
  ];

  return (
    <section className="bg-white py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-[min(1600px,96vw)] mx-auto px-4 sm:pl-8 md:pl-12 w-full box-border">
        <h2 className="m-0 mb-10 sm:mb-14 text-center text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight text-black max-w-3xl mx-auto">
          A world-class real estate firm with a personalized approach.
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 sm:gap-14 lg:gap-18 items-start">
          <div className="max-w-xl min-w-0">
            <h3 className="m-0 text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold leading-tight text-black text-left">
              Defined by luxury.
            </h3>
            <h3 className="m-0 mb-4 sm:mb-6 text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold leading-tight text-black text-left">
              Delivered with care.
            </h3>
            <p className="m-0 mb-6 sm:mb-8 text-sm sm:text-base font-normal leading-[1.55] text-gray-600 text-left">
              Lorem ipsum dolor sit amet consectetur. Feugiat ut aliquet sit pellentesque sollicitudin. Egestas faucibus lacus diam in senectus consectetur. Mattis elit adipiscing quisque tellus scelerisque vehicula ante nunc. Tellus consequat nisl quis nisl justo.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
              <a
                href="/book"
                className="inline-flex items-center justify-center py-3 px-7 rounded-full font-sans text-base font-normal text-white bg-gray-900 border-0 no-underline hover:bg-gray-800"
              >
                Book Now!
              </a>
              <a
                href="/read-more"
                className="inline-flex items-center justify-center py-3 px-7 rounded-full font-sans text-base font-normal text-gray-700 bg-white border border-gray-300 no-underline hover:bg-gray-50 hover:border-gray-400"
              >
                Read More
              </a>
            </div>
            <div className="flex flex-wrap justify-between items-start mt-8 sm:mt-10 max-w-md gap-6 sm:gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col text-left min-w-[5rem]">
                  <span className="mb-1 text-[clamp(2rem,5vw,4rem)] font-bold leading-tight text-black">
                    {stat.value}
                  </span>
                  <span className="text-sm sm:text-[1.125rem] font-normal text-gray-600">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[280px] sm:h-[340px] lg:h-[460px] overflow-hidden rounded-tl-none rounded-tr-2xl sm:rounded-tr-[18px] rounded-br-2xl sm:rounded-br-[18px] rounded-bl-2xl sm:rounded-bl-[18px]">
            <img
              src={peopleImg}
              alt="Two professionals seated at a desk with a laptop; man pointing at the screen, woman smiling"
              className="w-full h-full block object-cover object-top object-right rounded-tl-none rounded-tr-2xl sm:rounded-tr-[18px] rounded-br-2xl sm:rounded-br-[18px] rounded-bl-2xl sm:rounded-bl-[18px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FirmSection;
