import Image from "next/image";

type Week = {
  label: string;
  stats?: Array<{
    label: string;
    value: string;
  }>;
  photos: Array<{
    view: string;
    src: string;
  }>;
};

const weeks: Week[] = [
  {
    label: "Week 1",
    photos: [
      { view: "Front", src: "/photos/week1/front.jpg" },
      { view: "Left", src: "/photos/week1/left.jpg" },
      { view: "Right", src: "/photos/week1/right.jpg" },
    ],
  },
  {
    label: "Week 2",
    photos: [
      { view: "Front", src: "/photos/week2/front.jpg" },
      { view: "Back", src: "/photos/week2/back.jpg" },
      { view: "Left", src: "/photos/week2/left.jpg" },
      { view: "Right", src: "/photos/week2/right.jpg" },
    ],
  },
  {
    label: "Week 3",
    photos: [
      { view: "Front", src: "/photos/week3/front.jpg" },
      { view: "Back", src: "/photos/week3/back.jpg" },
      { view: "Left", src: "/photos/week3/left.jpg" },
      { view: "Right", src: "/photos/week3/right.jpg" },
    ],
  },
  {
    label: "Week 4",
    photos: [
      { view: "Front", src: "/photos/week4/front.jpg" },
      { view: "Back", src: "/photos/week4/back.jpg" },
      { view: "Left", src: "/photos/week4/left.jpg" },
      { view: "Right", src: "/photos/week4/right.jpg" },
    ],
  },
  {
    label: "Week 5",
    stats: [
      { label: "Weight", value: "196 lb" },
      { label: "Bodyfat", value: "11.3%" },
    ],
    photos: [
      { view: "Front", src: "/photos/week5/front.jpg" },
      { view: "Back", src: "/photos/week5/back.jpg" },
      { view: "Left", src: "/photos/week5/left.jpg" },
      { view: "Right", src: "/photos/week5/right.jpg" },
    ],
  },
  {
    label: "Week 6",
    stats: [
      { label: "Weight", value: "193.5 lb" },
      { label: "Bodyfat", value: "10.8%" },
    ],
    photos: [
      { view: "Front", src: "/photos/week6/front.jpg" },
      { view: "Back", src: "/photos/week6/back.jpg" },
      { view: "Left", src: "/photos/week6/left.jpg" },
      { view: "Right", src: "/photos/week6/right.jpg" },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-neutral-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-3 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
              habits.lucaschatham.com
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-normal sm:text-5xl">
              Weekly Deliverables
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-neutral-600 sm:text-right">
            Progress photos organized by week and view.
          </p>
        </header>

        <div className="flex flex-col gap-12">
          {weeks.map((week) => (
            <section key={week.label} className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-semibold tracking-normal">
                    {week.label}
                  </h2>
                  {week.stats?.map((stat) => (
                      <span
                        key={stat.label}
                        className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-700"
                      >
                        <span className="font-medium">{stat.label}:</span>{" "}
                        {stat.value}
                      </span>
                    ))}
                </div>
                <span className="text-sm text-neutral-500">
                  {week.photos.length} photos
                </span>
              </div>

              <div className="flex snap-x gap-4 overflow-x-auto pb-3">
                {week.photos.map((photo) => (
                  <figure
                    key={photo.src}
                    className="min-w-[82%] snap-start overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm sm:min-w-[44%] lg:min-w-[23.5%]"
                  >
                    <div className="relative aspect-[3/4] bg-neutral-100">
                      <Image
                        src={photo.src}
                        alt={`${week.label} ${photo.view.toLowerCase()} progress photo`}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="border-t border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700">
                      {photo.view}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
