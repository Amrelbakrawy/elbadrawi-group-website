type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  image?: string;
  imageAlt?: string;
};

export function PageHero({ eyebrow, title, description, accent, image, imageAlt }: PageHeroProps) {
  return (
    <section
      className={`hero-surface ${image ? 'bg-cover bg-center' : ''}`}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
      aria-label={imageAlt}
    >
      {image ? (
        <>
          <div className="absolute inset-0 bg-stone-50/18" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/68 via-stone-50/26 to-white/0" />
        </>
      ) : null}
      <div className="site-container relative py-28 md:py-36 lg:py-40">
        <div data-reveal className="reveal-fade max-w-5xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-title mt-8 max-w-4xl">{title}</h1>
          <p className="hero-copy mt-8 max-w-3xl">{description}</p>
        </div>
        {accent ? (
          <div data-reveal className={`reveal-fade mt-14 max-w-xl rounded-[1.75rem] border-l px-6 py-6 md:px-8 ${image ? 'border-black/18 bg-white/30 backdrop-blur-[2px]' : 'glass-strip border-black'}`}>
            <p className="text-sm leading-8 text-muted-foreground">{accent}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
