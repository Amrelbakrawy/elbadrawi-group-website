import { productRange } from '../../config/products';
import { useLanguage } from '../../i18n';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { ProductCard } from './ProductCard';

export function ProductCarousel() {
  const language = useLanguage();

  return (
    <Carousel
      className="mt-14"
      opts={{
        align: 'start',
        loop: false,
      }}
    >
      <CarouselContent className="-ml-5">
        {productRange.map((product) => (
          <CarouselItem
            key={product.name}
            className="pl-5 sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
          >
            <ProductCard product={product} language={language} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-8 flex justify-center gap-3">
        <CarouselPrevious className="static h-11 w-11 translate-y-0 border-slate-300 bg-white text-foreground shadow-sm hover:bg-slate-50" />
        <CarouselNext className="static h-11 w-11 translate-y-0 border-slate-300 bg-white text-foreground shadow-sm hover:bg-slate-50" />
      </div>
    </Carousel>
  );
}
