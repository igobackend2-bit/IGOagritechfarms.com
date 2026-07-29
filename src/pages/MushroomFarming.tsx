import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import {
  ArrowRight, MessageCircle, CheckCircle2, Sprout, Wind, Droplets,
  Thermometer, Warehouse, ClipboardList, Handshake,
} from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const fader: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const ADVANTAGES = [
  "High market demand throughout the year",
  "Short cultivation cycle",
  "Less land requirement",
  "Controlled indoor production",
  "High production per square foot",
  "Premium selling price",
  "Suitable for commercial farming",
  "Growing export opportunities",
  "Rising demand from hotels, restaurants, supermarkets, and food processing companies",
];

const SERVICES = [
  { icon: <ClipboardList className="w-5 h-5" />, title: "Complete Project Planning", desc: "End-to-end planning covering layout, budget, and production targets." },
  { icon: <Warehouse className="w-5 h-5" />, title: "Mushroom Farm Design", desc: "Growing room construction and layout engineered for efficient production." },
  { icon: <Thermometer className="w-5 h-5" />, title: "Environmental Control Systems", desc: "Climate management, humidity control, and ventilation systems." },
  { icon: <Droplets className="w-5 h-5" />, title: "Water Management", desc: "Growing rack installation and precise water management systems." },
  { icon: <Sprout className="w-5 h-5" />, title: "Technical Cultivation Training", desc: "Hands-on training in production monitoring and harvest management." },
  { icon: <Handshake className="w-5 h-5" />, title: "Business Consultation", desc: "Guidance from planning through to commercial-scale operation." },
];

const waLink = "https://wa.me/917397789803?text=I'm%20interested%20in%20a%20Mushroom%20Farming%20Project.%20Please%20share%20details.";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.igoagritechfarms.com/" },
    { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.igoagritechfarms.com/projects" },
    { "@type": "ListItem", "position": 3, "name": "Mushroom Farming Projects", "item": "https://www.igoagritechfarms.com/projects/mushroom" },
  ],
};

const MushroomFarming = () => (
  <div className="bg-white min-h-screen selection:bg-agri-green-50 selection:text-agri-green-800">
    <SEO
      title="Top Mushroom Farming Company in India | Profitable Mushroom Farming Projects"
      description="Build a profitable mushroom farming business with IGO Agritech Farms — complete turnkey mushroom farming solutions with technical support, infrastructure development, and production guidance."
      keywords="top mushroom farming company in India, mushroom farming companies in Tamil Nadu, mushroom farming project ROI, commercial mushroom cultivation"
      url="/projects/mushroom"
      jsonLd={breadcrumb}
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
          src="/assets/compressed/projects/igo-mushroom-farming-1774957443125.webp"
          alt="Mushroom Farming Projects in India"
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
          <span className="text-agri-gold-500">Mushroom Farming Projects</span>
        </div>

        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.15 } } }} className="max-w-4xl">
          <motion.div variants={fader} className="flex items-center gap-4 mb-8">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">Climate-Controlled Precision Farming</span>
          </motion.div>
          <motion.h1 variants={fader} className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tight leading-[0.93]">
            Mushroom <br /><span className="italic">Farming Projects</span>
          </motion.h1>
          <motion.p variants={fader} className="text-white/60 text-xl font-light leading-relaxed max-w-2xl">
            Build a profitable mushroom farming business with complete turnkey solutions — technical support, infrastructure development, production guidance, and post-harvest assistance.
          </motion.p>
          <motion.div variants={fader} className="mt-10">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-agri-gold-500 text-white text-[10px] font-bold rounded-full hover:bg-white hover:text-agri-green-800 transition-all uppercase tracking-widest shadow-2xl shadow-agri-gold-500/30"
            >
              <MessageCircle className="w-4 h-4" /> Start Your Mushroom Project
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Intro */}
    <section className="py-20 md:py-28 container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">The Opportunity</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-agri-green-800 mb-6 tracking-tight">India's Fastest-Growing Agri Business</h2>
        </div>
        <div className="text-black/70 font-light leading-relaxed space-y-5 text-lg">
          <p>The demand for fresh, hygienically grown mushrooms is increasing rapidly across India. From restaurants and supermarkets to food processing industries and export markets, mushrooms have become one of the fastest-growing agricultural products due to their high nutritional value and commercial demand.</p>
          <p>IGO Agritech Farms provides complete turnkey mushroom farming solutions designed for farmers, entrepreneurs, professionals, and investors — with years of expertise in modern agriculture, controlled environment farming, and commercial farm development.</p>
        </div>
      </div>
    </section>

    {/* Advantages */}
    <section className="py-20 md:py-28 bg-agri-earth-15">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">Why Mushroom Farming</span>
            <div className="h-px w-8 bg-agri-gold-500/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-agri-green-800 tracking-tight">A Highly Profitable Business Model</h2>
          <p className="text-black/50 font-light mt-4">Mushroom cultivation requires less land, utilizes vertical growing techniques, and offers multiple production cycles throughout the year.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {ADVANTAGES.map((a) => (
            <motion.div
              key={a}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-start gap-3 bg-white rounded-2xl p-5 shadow-sm border border-black/5"
            >
              <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-agri-gold-500" />
              <span className="text-sm font-medium text-agri-green-800 leading-relaxed">{a}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-20 md:py-28 bg-agri-green-950 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">Why IGO</span>
            <div className="h-px w-8 bg-agri-gold-500/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-4">Why Choose IGO Agritech Farms?</h2>
          <p className="text-white/70 font-light">Our expert team manages every stage of your project — from planning and construction to production and technical guidance.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <div key={s.title} className="bg-white/5 border border-white/10 rounded-[1.75rem] p-8">
              <div className="w-11 h-11 rounded-full bg-agri-gold-500/15 text-agri-gold-500 flex items-center justify-center mb-5">{s.icon}</div>
              <h3 className="text-lg font-serif text-white mb-2">{s.title}</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-white/70 font-light mt-14 max-w-2xl mx-auto">
          Whether you are starting a small commercial unit or planning a large-scale production facility, we provide end-to-end project execution.
        </p>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 bg-agri-green-800 text-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 flex items-center gap-3"><Wind className="w-8 h-8 text-agri-gold-500" /> Start your mushroom farming journey</h2>
          <p className="text-white/60 font-light">Connect with our team to explore a profitable mushroom farming project tailored to your goals.</p>
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

export default MushroomFarming;
