import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { getMailtoLink, siteConfig } from '../../config/site';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'ordering' | 'support';
}

const faqs: FAQItem[] = [
  {
    category: 'general',
    question: 'What types of textile products does Elbadrawi manufacture?',
    answer:
      "We specialize in premium bedding programs including sheets, pillowcases, duvet covers, comforters, and bath textiles for hospitality, retail, and private label applications. Our manufacturing covers cotton blends, Egyptian cotton, and specialty fabrics tailored to client specifications.",
  },
  {
    category: 'general',
    question: 'What makes your manufacturing process different?',
    answer:
      "We offer true vertical integration—from fiber sourcing and yarn development to fabric weaving, cutting, sewing, and final packaging. This end-to-end control ensures consistency, reduces lead times, and allows us to maintain rigorous quality standards at every stage.",
  },
  {
    category: 'ordering',
    question: 'What is your minimum order quantity?',
    answer:
      'MOQs vary by product type and customization level. Standard programs typically start at 5,000-10,000 units per SKU. We work with emerging brands on flexible arrangements. Contact us to discuss your specific requirements.',
  },
  {
    category: 'ordering',
    question: 'How long is the typical lead time for orders?',
    answer:
      'Standard production runs take 6-8 weeks from order confirmation. Rush options are available for premium rates. Custom product development typically takes 8-12 weeks including sampling and approval cycles.',
  },
  {
    category: 'technical',
    question: 'Do you handle private label and custom branding?',
    answer:
      'Yes. We provide end-to-end private label services including custom labels, packaging, color matching, and product specifications. Our team works closely with brands on product development, sampling, and market-ready delivery.',
  },
  {
    category: 'technical',
    question: 'What certifications and compliance standards do you meet?',
    answer:
      'We are ISO 9001:2015 certified for quality management. We comply with international standards including Oeko-Tex, REACH, and customer-specific requirements. Documentation and compliance certificates are provided with every order.',
  },
  {
    category: 'support',
    question: 'How does the quote process work?',
    answer:
      'Share your requirements including product type, specifications, target quantities, and timeline. Our team will respond within 48 hours with detailed pricing, lead times, and next steps. We can arrange samples before commitment.',
  },
  {
    category: 'support',
    question: 'What is your quality assurance process?',
    answer:
      'Every production batch undergoes rigorous testing including tensile strength, colorfastness, shrinkage, and dimensional accuracy. Pre-shipment inspections verify 100% conformance to specifications. We maintain documentation for traceability and provide COA with shipments.',
  },
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const categories = ['general', 'ordering', 'technical', 'support'] as const;
  const categoryLabels: Record<typeof categories[number], string> = {
    general: 'General',
    ordering: 'Ordering & MOQ',
    technical: 'Technical & Specifications',
    support: 'Support & Quality',
  };

  return (
    <section className="section-space bg-gradient-to-b from-slate-50 to-white">
      <div className="site-container">
        <SectionHeading
          label="Frequently asked questions"
          title="Get answers to common questions"
          description={`Can't find what you're looking for? Reach out to our team directly at ${siteConfig.contactEmail} or request a consultation.`}
          align="center"
        />

        <div className="mt-14 max-w-3xl mx-auto space-y-1">
          {categories.map((category) => {
            const categoryFaqs = faqs.filter((faq) => faq.category === category);
            return (
              <div key={category}>
                <h3 className="mt-8 mb-4 text-lg md:text-xl font-semibold text-foreground px-4 md:px-0">
                  {categoryLabels[category]}
                </h3>
                {categoryFaqs.map((faq, categoryIndex) => {
                  const index = faqs.indexOf(faq);
                  const isOpen = openItems.includes(index);
                  return (
                    <div
                      key={index}
                      data-reveal
                      className="reveal-fade border border-slate-200 rounded-lg mb-3 overflow-hidden bg-white hover:border-slate-300 transition-colors duration-200"
                    >
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full px-4 md:px-6 py-4 md:py-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors duration-150 group"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm md:text-base font-semibold text-foreground pr-4 flex-1">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 mt-0.5 group-hover:text-foreground ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 md:px-6 pb-4 md:pb-5 pt-0 border-t border-slate-100 bg-slate-50/50">
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 pt-12 border-t border-slate-200 text-center">
          <p className="text-sm md:text-base text-muted-foreground">
            Have a specific question not covered here?
          </p>
          <a
            href={`${getMailtoLink(siteConfig.contactEmail)}?subject=Question%20from%20Website`}
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200 text-sm md:text-base"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
