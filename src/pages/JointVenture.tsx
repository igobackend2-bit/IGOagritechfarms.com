import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import {
  ArrowRight, Handshake, CheckCircle2, TrendingUp, MessageCircle,
  ClipboardList, Sprout, LayoutGrid, Droplets,
} from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const fader: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const STEPS = [
  { num: "01", title: "Initial Consultation", desc: "Our agricultural experts understand your objectives, project size, available land (if applicable), and farming interests." },
  { num: "02", title: "Project Recommendation", desc: "Based on your requirements, suitable farming models and project sizes are recommended." },
  { num: "03", title: "Project Planning", desc: "Detailed planning covering farm layout, crop planning, infrastructure requirements, irrigation design, and operational planning." },
  { num: "04", title: "Project Development", desc: "Professional teams execute the project with complete infrastructure development and cultivation setup." },
  { num: "05", title: "Cultivation & Farm Management", desc: "Experienced agricultural professionals manage farming activities, crop care, irrigation scheduling, nutrition management, and monitoring." },
  { num: "06", title: "Harvest & Market Support", desc: "Produce is harvested to quality standards and supported through organized market linkage." },
];

const PACKAGES = [
  {
    name: "Quarter Acre Project",
    size: "1000 Sq.m",
    cost: "₹4,00,000",
    income: "₹2,00,000 per year",
    suitableFor: ["First-time agricultural participants", "Small-scale farming projects", "Professionals exploring commercial agriculture"],
    featured: false,
  },
  {
    name: "Half Acre Project",
    size: "2000 Sq.m",
    cost: "₹7,75,000",
    income: "₹4,00,000 per year",
    suitableFor: ["Landowners", "Entrepreneurs", "Agriculture investors", "Business professionals"],
    featured: true,
  },
  {
    name: "One Acre Project",
    size: "4000 Sq.m",
    cost: "₹15,00,000",
    income: "₹8,00,000 per year",
    suitableFor: ["Commercial farming", "Larger agricultural ventures", "Long-term farming expansion"],
    featured: false,
  },
];

const WHY = [
  { icon: <LayoutGrid className="w-5 h-5" />, title: "Integrated Expertise", desc: "Protected cultivation, open-field farming, hydroponics, vertical farming, nursery development, and irrigation systems — all under one roof." },
  { icon: <Sprout className="w-5 h-5" />, title: "Scientific Cultivation", desc: "Experienced agronomists and modern infrastructure backing every project we manage." },
  { icon: <Droplets className="w-5 h-5" />, title: "End-to-End Execution", desc: "Project planning, execution, cultivation support, and market linkage handled by one team." },
];

const FAQS = [
  { q: "Is farming experience required?", a: "No. Our professional team manages the technical and operational aspects of the farming project." },
  { q: "Can I start with a small project?", a: "Yes. You can begin with the Quarter Acre model and expand in the future based on your requirements." },
  { q: "How many crop cycles are conducted annually?", a: "Each project is planned with 3 crop cycles per year, depending on crop suitability and seasonal planning." },
  { q: "How many payouts are provided?", a: "The project follows a structured 7 payouts per year model." },
  { q: "Who manages the farming activities?", a: "IGO Agritech Farms provides complete technical guidance, cultivation support, farm management, and project monitoring throughout the farming cycle." },
];

const waLink = "https://wa.me/917397789803?text=I'm%20interested%20in%20a%20Joint%20Venture%20Farming%20Project.%20Please%20share%20details.";

const jvBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.igoagritechfarms.com/" },
    { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.igoagritechfarms.com/projects" },
    { "@type": "ListItem", "position": 3, "name": "Joint Venture Projects", "item": "https://www.igoagritechfarms.com/projects/joint-venture" },
  ],
};

const JointVenture = () => (
  <div className="bg-white min-h-screen selection:bg-agri-green-50 selection:text-agri-green-800">
    <SEO
      title="Joint Venture Farming Projects in India"
      description="Agricultural Joint Venture Projects in India by IGO Agritech Farms. Quarter Acre, Half Acre & One Acre partnership models with complete project execution, technical guidance, and market linkage."
      keywords="joint venture farming projects India, agricultural joint venture, IGO Agritech Farms, farm partnership investment, joint venture farming ROI"
      url="/projects/joint-venture"
      jsonLd={jvBreadcrumb}
    />

    {/* Hero */}
    <section className="relative pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-28 md:pb-40 overflow-hidden bg-black">
      <motion.div
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <OptimizedImage
          src="/assets/compressed/projects/joint-venture-premium-1773750685382.webp"
          alt="Joint Venture Farming Projects in India"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase tracking-widest mb-14 flex-wrap">
          <Link to="/projects" className="hover:text-agri-gold-500 transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-agri-gold-500">Joint Venture Projects</span>
        </div>

        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.15 } } }} className="max-w-4xl">
          <motion.div variants={fader} className="flex items-center gap-4 mb-8">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">A Smarter Way to Participate in Farming</span>
          </motion.div>
          <motion.h1 variants={fader} className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tight leading-[0.93]">
            Joint Venture <br /><span className="italic">Farming Projects</span>
          </motion.h1>
          <motion.p variants={fader} className="text-white/60 text-xl font-light leading-relaxed max-w-2xl">
            Professionally managed Agricultural Joint Venture Projects across India, enabling landowners, entrepreneurs, business professionals, and agriculture enthusiasts to participate in commercial farming with complete project execution, technical guidance, and market linkage.
          </motion.p>
          <motion.div variants={fader} className="mt-10">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-agri-gold-500 text-white text-[10px] font-bold rounded-full hover:bg-white hover:text-agri-green-800 transition-all uppercase tracking-widest shadow-2xl shadow-agri-gold-500/30"
            >
              <MessageCircle className="w-4 h-4" /> Start Your Joint Venture
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* What is a Joint Venture */}
    <section className="py-20 md:py-28 container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">The Model</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-agri-green-800 mb-6 tracking-tight">What is an Agricultural Joint Venture?</h2>
        </div>
        <div className="text-black/70 font-light leading-relaxed space-y-5 text-lg">
          <p>An Agricultural Joint Venture (JV) is a collaborative farming model where agricultural expertise, infrastructure, technology, and professional management come together to develop and operate a modern farming project.</p>
          <p>Instead of handling every farming activity independently, the project is professionally planned and managed with systematic crop production, technical supervision, irrigation management, crop monitoring, and post-harvest support.</p>
          <p>This model helps participants benefit from organized agriculture without the burden of managing every daily farming activity themselves — ideal if you want to diversify your income, maximize agricultural land utilization, or explore modern farming opportunities.</p>
        </div>
      </div>
    </section>

    {/* Process steps */}
    <section className="py-20 md:py-28 bg-agri-earth-15">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">The Process</span>
            <div className="h-px w-8 bg-agri-gold-500/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-agri-green-800 tracking-tight">How to Start an Agricultural Joint Venture</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[1.75rem] p-8 shadow-sm border border-black/5"
            >
              <span className="text-4xl font-serif text-agri-gold-500/50">{s.num}</span>
              <h3 className="text-xl font-serif text-agri-green-800 mt-3 mb-3">{s.title}</h3>
              <p className="text-black/60 font-light leading-relaxed text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Pricing packages */}
    <section className="py-20 md:py-28 container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-8 bg-agri-gold-500/60" />
          <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">Project Options</span>
          <div className="h-px w-8 bg-agri-gold-500/60" />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-agri-green-800 tracking-tight mb-4">Joint Venture Farming Project Options</h2>
        <p className="text-black/50 font-light">Multiple project sizes suitable for different budgets and agricultural goals.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {PACKAGES.map((p) => (
          <div
            key={p.name}
            className={`rounded-[2rem] p-10 flex flex-col ${
              p.featured
                ? "bg-agri-green-800 text-white shadow-2xl scale-100 md:scale-105"
                : "bg-white border border-black/10 text-black"
            }`}
          >
            {p.featured && (
              <span className="self-start mb-4 px-3 py-1 rounded-full bg-agri-gold-500 text-white text-[9px] font-bold uppercase tracking-widest">Most Chosen</span>
            )}
            <h3 className={`text-2xl font-serif mb-6 ${p.featured ? "text-white" : "text-agri-green-800"}`}>{p.name}</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <span className={`text-xs uppercase tracking-widest ${p.featured ? "text-white/50" : "text-black/40"}`}>Project Size</span>
                <span className="font-semibold">{p.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs uppercase tracking-widest ${p.featured ? "text-white/50" : "text-black/40"}`}>Project Cost</span>
                <span className="font-semibold">{p.cost}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs uppercase tracking-widest ${p.featured ? "text-white/50" : "text-black/40"}`}>Est. Income</span>
                <span className={`font-semibold flex items-center gap-1 ${p.featured ? "text-agri-gold-400" : "text-agri-green-800"}`}>
                  <TrendingUp className="w-3.5 h-3.5" /> {p.income}
                </span>
              </div>
            </div>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${p.featured ? "text-white/50" : "text-black/40"}`}>Suitable for</p>
            <ul className="space-y-2 mb-8 flex-1">
              {p.suitableFor.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm font-light">
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${p.featured ? "text-agri-gold-400" : "text-agri-green-800"}`} />
                  <span className={p.featured ? "text-white/80" : "text-black/70"}>{s}</span>
                </li>
              ))}
            </ul>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                p.featured
                  ? "bg-agri-gold-500 text-white hover:bg-white hover:text-agri-green-800"
                  : "bg-agri-green-800 text-white hover:bg-agri-gold-500"
              }`}
            >
              Enquire Now <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </section>

    {/* Why choose us */}
    <section className="py-20 md:py-28 bg-agri-green-950 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">Why IGO</span>
            <div className="h-px w-8 bg-agri-gold-500/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">Why Choose IGO Agritech Farms?</h2>
          <p className="text-white/50 font-light">One of India's leading agri-engineering companies, offering comprehensive farming solutions across multiple agricultural sectors.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {WHY.map((w) => (
            <div key={w.title} className="bg-white/5 border border-white/10 rounded-[1.75rem] p-8">
              <div className="w-11 h-11 rounded-full bg-agri-gold-500/15 text-agri-gold-500 flex items-center justify-center mb-5">{w.icon}</div>
              <h3 className="text-lg font-serif mb-2">{w.title}</h3>
              <p className="text-white/50 font-light text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20 md:py-28 container mx-auto px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-8 bg-agri-gold-500/60" />
          <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">FAQs</span>
        </div>
        <h2 className="text-4xl font-serif text-agri-green-800 mb-10 tracking-tight">Frequently Asked Questions</h2>
        <div className="divide-y divide-black/10 border-t border-b border-black/10">
          {FAQS.map((f) => (
            <div key={f.q} className="py-6">
              <h3 className="text-lg font-serif text-agri-green-800 mb-2 flex items-start gap-3">
                <ClipboardList className="w-5 h-5 mt-0.5 shrink-0 text-agri-gold-500" /> {f.q}
              </h3>
              <p className="text-black/60 font-light leading-relaxed pl-8">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 bg-agri-green-800 text-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-3 flex items-center gap-3"><Handshake className="w-8 h-8 text-agri-gold-500" /> Start your Joint Venture journey</h2>
          <p className="text-white/60 font-light">Connect with our team to explore the right Joint Venture Farming Project for your goals.</p>
        </div>
        <Link
          to="/contact"
          className="shrink-0 inline-flex items-center gap-3 px-10 py-4 bg-agri-gold-500 text-white text-[10px] font-bold rounded-full hover:bg-white hover:text-agri-green-800 transition-all uppercase tracking-widest shadow-lg"
        >
          Book Free Consultation <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </div>
);

export default JointVenture;
