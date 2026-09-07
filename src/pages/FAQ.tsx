import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is BuildSure?',
    a: 'BuildSure is a construction procurement and project management platform that connects property owners with verified contractors, architects, engineers and quality inspectors. It brings structured requirements, competitive bidding, project monitoring and quality assurance into one connected platform.'
  },
  {
    q: 'How does BuildSure work?',
    a: 'Clients post their construction requirements. BuildSure helps verify and structure the requirement. Eligible contractors then submit competitive bids. The client compares bids and chooses their contractor. During construction, BuildSure supports quality monitoring and inspections.'
  },
  {
    q: 'Is posting a project free?',
    a: 'Yes, posting a construction requirement on BuildSure is currently free for clients.'
  },
  {
    q: 'How are contractors verified?',
    a: 'Contractors go through a verification process that includes profile review, document verification and eligibility assessment. Only verified/eligible contractors can submit bids on the platform.'
  },
  {
    q: 'Can I choose my contractor?',
    a: 'Absolutely. You always make the final decision. BuildSure provides tools to compare bids across multiple parameters, but the choice is always yours.'
  },
  {
    q: 'Does BuildSure select the cheapest contractor?',
    a: 'No. BuildSure does not automatically select any contractor. We help you compare bids across price, scope, experience, timeline, materials and quality indicators so you can make an informed decision.'
  },
  {
    q: 'How does bid comparison work?',
    a: 'When multiple contractors submit bids, BuildSure provides a structured comparison view showing bid amounts, timelines, experience, similar projects, scope details, materials offered, warranty terms and quality history.'
  },
  {
    q: 'Does BuildSure monitor construction quality?',
    a: 'BuildSure supports independent quality monitoring through stage-wise inspections, material verification, progress documentation and quality issue tracking. This helps identify problems early when they are easier to fix.'
  },
  {
    q: 'Can I hire an architect through BuildSure?',
    a: 'Yes. Architects and engineers can join the BuildSure professional network and offer services including design, BOQ preparation, tender preparation, quality inspection and project monitoring.'
  },
  {
    q: 'Can BuildSure help with financing?',
    a: 'BuildSure can help connect eligible clients and contractors with financing partners. However, financing is subject to eligibility and partner approval. BuildSure does not provide loans directly and does not guarantee approval.'
  },
  {
    q: 'Can contractors find local projects?',
    a: 'Yes. Contractors on BuildSure can find construction opportunities in their service area. Projects are matched based on location, scope and contractor capabilities.'
  },
  {
    q: 'Is BuildSure available in my city?',
    a: 'BuildSure is currently launching in Lucknow. We are starting with one city to build the platform properly with local construction requirements, contractors and professionals.'
  },
  {
    q: 'How are disputes handled?',
    a: 'BuildSure provides structured documentation, quality issue tracking and milestone records that help create clarity during disagreements. Specific dispute resolution mechanisms are being developed as the platform grows.'
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-warm py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">Frequently Asked Questions</h1>
            <p className="mt-4 text-lg text-navy-light/70">Everything you need to know about BuildSure.</p>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border-light rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-sm font-semibold text-navy pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-navy-light/70 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
