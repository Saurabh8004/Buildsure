import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'What is BuildSure?', a: 'BuildSure is a construction procurement and project management platform that connects property owners with verified contractors, architects, engineers and quality inspectors. It helps structure the construction process from requirement posting through bidding, contractor selection and quality monitoring.' },
  { q: 'How does BuildSure work?', a: 'Clients post their construction requirements. BuildSure verifies and structures the requirement. Eligible contractors submit competitive bids. Clients compare offers and choose their preferred contractor. The project then moves into execution with quality monitoring support.' },
  { q: 'Is posting a project free?', a: 'Yes, clients can post their construction requirements for free on BuildSure.' },
  { q: 'How are contractors verified?', a: 'Contractors provide professional documents and details during registration. BuildSure reviews eligibility based on provided information. Verification indicates basic eligibility criteria have been met — it does not constitute a guarantee of work quality.' },
  { q: 'Can I choose my contractor?', a: 'Yes. BuildSure never selects a contractor for you. Clients always compare bids and make the final contractor selection decision.' },
  { q: 'Does BuildSure select the cheapest contractor?', a: 'No. BuildSure provides smart bid comparison across multiple parameters — price, timeline, experience, scope, materials, warranty and quality history. The client makes the final decision based on their priorities.' },
  { q: 'How does bid comparison work?', a: 'After bidding closes, clients can view all received bids side by side. BuildSure highlights useful labels like Lowest Price, Best Value, Best Rated and Fastest to help clients understand the complete offer.' },
  { q: 'Does BuildSure monitor construction quality?', a: 'BuildSure supports independent project monitoring and inspections at key construction stages. This includes site inspections, material verification, milestone tracking, quality issue management and final handover documentation.' },
  { q: 'Can I hire an architect through BuildSure?', a: 'Yes. BuildSure has an Architect / Engineer Partnership program. Professionals can offer design, BOQ preparation, tender support, quality inspection and project monitoring services.' },
  { q: 'Can BuildSure help with financing?', a: 'BuildSure can help connect eligible clients and contractors with financing partners. Financing is subject to eligibility and partner approval — BuildSure does not guarantee approval or provide loans directly.' },
  { q: 'Can contractors find local projects?', a: 'Yes. Contractors can set their service areas and specializations. BuildSure shows relevant project opportunities based on location matching and eligibility.' },
  { q: 'Is BuildSure available in my city?', a: 'BuildSure is currently launching in Lucknow. Availability in other cities will be announced as the platform expands.' },
  { q: 'How are disputes handled?', a: 'BuildSure provides structure and visibility through the construction process. However, the actual construction contract is between the client and contractor. BuildSure facilitates transparency but is not a party to construction agreements or disputes.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <section className="bg-grey-light py-16 lg:py-20 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">Frequently Asked Questions</h1>
            <p className="mt-4 text-lg text-navy-light/70">Everything you need to know about BuildSure.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border-light rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-grey-light transition-colors"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-sm font-semibold text-navy pr-4">{faq.q}</span>
                  <ChevronDown size={18} className={`text-gray-400 shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
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
