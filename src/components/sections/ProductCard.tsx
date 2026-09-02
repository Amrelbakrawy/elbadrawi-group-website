import type { ProductItem } from '../../config/products';
import type { Language } from '../../i18n';

type ProductCardProps = {
  product: ProductItem;
  language?: Language;
};

export function ProductCard({ product, language = 'en' }: ProductCardProps) {
  const name = language === 'ar' ? product.arName : product.name;
  const description = language === 'ar' ? product.arDescription : product.description;

  return (
    <article className="group flex h-full flex-col rounded-[1.5rem] border border-border bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.09)]">
      <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-[linear-gradient(135deg,#f8f5ef,#e8dfd1)]">
        <img
          className="relative z-10 h-full w-full bg-[linear-gradient(135deg,#f8f5ef,#e8dfd1)] object-cover transition duration-500 group-hover:scale-105"
          src={product.image}
          alt={`${name} manufactured by Elbadrawi Group`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.opacity = '0';
          }}
        />
        <span className="absolute inset-0 z-0 flex items-center justify-center px-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {name}
        </span>
      </div>
      <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{name}</h3>
      <p className="mt-4 text-base leading-8 text-muted-foreground">{description}</p>
    </article>
  );
}
