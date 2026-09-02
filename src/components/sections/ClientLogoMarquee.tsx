import { clientLogos } from '../../config/clientLogos';

type ClientLogoMarqueeProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export function ClientLogoMarquee({
  eyebrow = 'Our Clients',
  title = 'Trusted by Leading Brands',
  subtitle = 'Elbadrawi Group has supplied and partnered with respected brands, retailers, distributors, and business clients across local and international markets.',
}: ClientLogoMarqueeProps) {
  const repeatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="client-marquee-section">
      <div className="site-container">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="logo-marquee" aria-label={title}>
        <div className="logo-track">
          {repeatedLogos.map((logo, index) => (
            <div className="client-logo-card" key={`${logo.name}-${index}`}>
              {logo.image ? (
                <img src={logo.image} alt={logo.name} loading="lazy" />
              ) : (
                <span>{logo.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
