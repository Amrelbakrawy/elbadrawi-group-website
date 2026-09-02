import logoSrc from '../../assets/elbadrawi-group-logo.png';

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  invertOnDark?: boolean;
};

export function BrandLogo({
  className = '',
  imageClassName = '',
  invertOnDark = false,
}: BrandLogoProps) {
  return (
    <div className={className}>
      <img
        src={logoSrc}
        alt="Elbadrawi Group"
        className={`${invertOnDark ? 'brightness-0 invert' : ''} ${imageClassName}`.trim()}
      />
    </div>
  );
}
