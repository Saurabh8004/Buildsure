import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const roles = ['Client', 'Contractor', 'Architect / Engineer', 'Quality Inspector', 'Partnership', 'General Enquiry'];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', role: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-grey-light">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green" />
          </div>
          <h2 className="text-2xl font-bold text-navy">Message Sent</h2>
          <p className="mt-3 text-navy-light/70">Thank you for reaching out. We'll get back to you soon.</p>
          <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', mobile: '', role: '', subject: '', message: '' }); }}
            className="mt-6 px-6 py-2.5 text-sm font-semibold text-orange border border-orange rounded-lg hover:bg-orange hover:text-white transition-colors">
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-grey-light py-16 lg:py-20 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">Contact Us</h1>
            <p className="mt-4 text-lg text-navy-light/70">Have a question or want to learn more? Reach out to us.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">Name *</label>
                <input type="text" id="name" name="name" required value={form.name} onChange={handleChange}
                  className="w-full px-4 py-3 border border-border-light rounded-xl text-sm text-navy focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-colors"
                  placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">Email *</label>
                <input type="email" id="email" name="email" required value={form.email} onChange={handleChange}
                  className="w-full px-4 py-3 border border-border-light rounded-xl text-sm text-navy focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-colors"
                  placeholder="your@email.com" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-navy mb-2">Mobile</label>
                <input type="tel" id="mobile" name="mobile" value={form.mobile} onChange={handleChange}
                  className="w-full px-4 py-3 border border-border-light rounded-xl text-sm text-navy focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-colors"
                  placeholder="+91 XXXXX XXXXX" />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-navy mb-2">I am a *</label>
                <select id="role" name="role" required value={form.role} onChange={handleChange}
                  className="w-full px-4 py-3 border border-border-light rounded-xl text-sm text-navy focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-colors bg-white">
                  <option value="">Select your role</option>
                  {roles.map((role) => (<option key={role} value={role}>{role}</option>))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-navy mb-2">Subject *</label>
              <input type="text" id="subject" name="subject" required value={form.subject} onChange={handleChange}
                className="w-full px-4 py-3 border border-border-light rounded-xl text-sm text-navy focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-colors"
                placeholder="What is this about?" />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">Message *</label>
              <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange}
                className="w-full px-4 py-3 border border-border-light rounded-xl text-sm text-navy focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-colors resize-none"
                placeholder="Tell us more..." />
            </div>

            <button type="submit"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-orange hover:bg-orange-dark rounded-xl transition-all shadow-lg shadow-orange/20">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
