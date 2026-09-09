import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageCircle, Phone, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { faqs } from '@/data/siteData';
import SEO from '@/components/SEO';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 bg-agri-earth-15">
      <SEO
        title="FAQ | Frequently Asked Questions — IGO Agritech Farms"
        description="Find answers to common questions about IGO Agritech Farms' services, polyhouse construction, hydroponics setup, agri consulting, pricing, and project timelines."
        keywords="agri FAQ, polyhouse FAQ, hydroponics questions, agri consulting FAQ, IGO Agritech questions, farming setup cost India"
        url="/faq"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      {/* Hero Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden border-b border-black/[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(26,66,49,0.05),transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary text-[11px] font-black uppercase tracking-[0.4em] mb-8"
          >
            Knowledge Base
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl tracking-tighter mb-10"
          >
            How can we <span className="text-primary italic font-serif">help?</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-black/20" />
            <input
              type="text"
              placeholder="Search for topics, crops, or technologies..."
              className="w-full pl-20 pr-10 py-8 bg-white border border-black/5 rounded-[2.5rem] text-lg shadow-2xl shadow-black/5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-black/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28 container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16">
          <div>
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group rounded-[2rem] border border-black/[0.03] bg-white hover:border-primary/20 hover:shadow-xl transition-all overflow-hidden"
                >
                  <button 
                    className="w-full px-10 py-8 text-left flex items-center justify-between gap-6"
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  >
                    <span className="text-xl md:text-2xl font-medium tracking-tight group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                    <div className={`w-10 h-10 rounded-full border border-black/5 flex items-center justify-center transition-all ${activeIndex === index ? 'bg-primary border-primary rotate-180' : ''}`}>
                      <ChevronDown className={`w-5 h-5 transition-colors ${activeIndex === index ? 'text-white' : 'text-black/20'}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-10 pb-10 text-lg text-black/60 leading-relaxed border-t border-black/[0.03] pt-6">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-20 bg-black/5 rounded-[3rem]">
                <p className="text-xl text-black/40">No results found for "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-6 text-primary font-black uppercase tracking-widest text-xs border-b border-primary/20"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>

          {/* Contact Support */}
          <aside>
            <div className="sticky top-32 space-y-12">
              <div className="p-10 rounded-[3rem] bg-black text-white relative overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/40 transition-colors" />
                <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center mb-8">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Still have questions?</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-10">Our agricultural experts are ready to guide you through your next project.</p>
                <a 
                  href="tel:+917397789803"
                  className="w-full py-5 bg-white text-black rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all shadow-lg"
                >
                  <Phone className="w-4 h-4" /> Call Expert Now
                </a>
              </div>

              <div className="p-10 rounded-[3rem] border border-black/[0.03] bg-agri-earth-25">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-8 border-b border-black/5 pb-4">Social Support</h4>
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="flex flex-col items-center justify-center p-6 bg-white border border-black/5 rounded-3xl hover:border-primary/20 transition-all group">
                    <Linkedin className="w-6 h-6 mb-3 text-black/20 group-hover:text-[#0A66C2]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">LinkedIn</span>
                  </a>
                  <a href="#" className="flex flex-col items-center justify-center p-6 bg-white border border-black/5 rounded-3xl hover:border-primary/20 transition-all group">
                    <Twitter className="w-6 h-6 mb-3 text-black/20 group-hover:text-[#1DA1F2]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Twitter</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-black text-white rounded-t-[3rem] lg:rounded-t-[5rem]">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl md:text-7xl tracking-tighter mb-12 text-white">
              Ready to grow with <span className="text-primary italic font-serif">precision?</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact" className="px-12 py-7 bg-primary rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:scale-105 transition-all shadow-2xl">
                Start My Project
              </Link>
              <Link to="/about" className="px-12 py-7 border border-white/10 rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                Learn our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
