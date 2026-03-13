import icon1 from '@assets/edit-2.svg';
import icon2 from '@assets/messages.svg';
import icon3 from '@assets/sms-tracking.svg';

function Features() {
  const items = [
    {
      title: 'Define Your Dream',
      desc: 'Lorem ipsum dolor sit amet consectetur. Adipiscing imperdiet bibendum in in vestibulum.',
      icon: <img src={icon2} alt="" className="w-14 h-14" aria-hidden />,
    },
    {
      title: 'Private Connect',
      desc: 'Lorem ipsum dolor sit amet consectetur. Adipiscing imperdiet bibendum in in vestibulum.',
      icon: <img src={icon3} alt="" className="w-14 h-14" aria-hidden />,
    },
    {
      title: 'Secure Your Space',
      desc: 'Lorem ipsum dolor sit amet consectetur. Adipiscing imperdiet bibendum in in vestibulum.',
      icon: <img src={icon1} alt="" className="w-14 h-14" aria-hidden />,
    },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-[min(1600px,96vw)] mx-auto pl-8 md:pl-12 text-center w-full box-border">
        <p className="m-0 mb-2 text-sm font-normal text-gray-600">
          Three steps. Three minutes.
        </p>
        <h2 className="m-0 mb-16 text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-gray-900">
          Everything should be this easy.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {items.map((item, i) => (
            <article key={i} className="m-0 text-left">
              <div className="flex items-center justify-start w-18 h-18 mb-6">
                {item.icon}
              </div>
              <h3 className="m-0 mb-4 text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="m-0 text-base font-normal leading-relaxed text-gray-600 max-w-[20rem]">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
