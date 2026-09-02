type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const descriptionClassName =
    align === 'center' ? 'section-copy mt-7 mx-auto max-w-2xl' : 'section-copy mt-7 max-w-2xl';

  return (
    <div
      data-reveal
      className={align === 'center' ? 'reveal-fade mx-auto max-w-4xl text-center' : 'reveal-fade max-w-4xl'}
    >
      <p className="eyebrow">{label}</p>
      <h2 className="section-title mt-7">{title}</h2>
      {description ? <p className={descriptionClassName}>{description}</p> : null}
    </div>
  );
}
