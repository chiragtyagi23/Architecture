import house2 from '@assets/House-2.jpg';
import house3 from '@assets/House-3.png';
import house4 from '@assets/House-4.png';

function UpcomingProjects() {
  const projects = [
    { image: house2 },
    { image: house3 },
    { image: house4 },
  ];

  const title = 'District II Villas';
  const desc = 'Lorem ipsum dolor sit amet consectetur. Adipiscing imperdiet bibendum.';
  const rating = 4.83;

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-[min(1600px,96vw)] mx-auto pl-8 md:pl-12 w-full box-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="m-0 mb-2 text-sm font-normal text-gray-500">
              Best Project of the Years
            </p>
            <h2 className="m-0 text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-tight text-black">
              Our Upcoming Projects
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="w-11 h-11 rounded-full border-0 cursor-pointer text-xl leading-none flex items-center justify-center bg-gray-200 text-black hover:bg-gray-300 transition-colors"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              className="w-11 h-11 rounded-full border-0 cursor-pointer text-xl leading-none flex items-center justify-center bg-gray-800 text-white hover:bg-gray-900 transition-colors"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <article
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <div className="aspect-4/3 overflow-hidden bg-gray-100">
                <img src={p.image} alt="" className="w-full h-full object-cover block" />
              </div>
              <div className="p-4">
                <h3 className="m-0 mb-2 text-lg font-bold text-black">{title}</h3>
                <p className="m-0 text-sm font-normal leading-relaxed text-gray-500">
                  {desc}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="inline-flex gap-0.5 items-center">
                    {[1, 2, 3].map((s) => (
                      <svg key={s} className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="relative inline-block w-4 h-4 shrink-0" aria-hidden>
                      <svg className="absolute inset-0 w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                        <svg className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    </span>
                    <svg className="w-4 h-4 text-gray-300 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-500">{rating}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UpcomingProjects;
