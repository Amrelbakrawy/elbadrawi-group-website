import { homeText, useLanguage } from '../../i18n';

export function TrustStrip() {
  const language = useLanguage();
  const stats = homeText[language].trustBar;

  return (
    <section className="border-y border-border bg-white">
      <div className="site-container py-10">
        <div className="grid gap-4 md:grid-cols-5">
          {stats.map((title) => (
            <div
              key={title}
              data-reveal
              className="reveal-fade rounded-[1.25rem] border border-border bg-panel px-5 py-6 text-center"
            >
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-foreground">
                {title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
