import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import {
  ArrowRight, MessageCircle, CheckCircle2, Warehouse, Sprout, Droplets,
  ShieldCheck, TrendingUp, Leaf, MapPin, ClipboardList, Wrench,
} from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const fader: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const BENEFITS = [
  "Higher crop productivity throughout the year",
  "Protection against changing weather conditions",
  "Better crop quality and uniform growth",
  "Reduced pest and disease incidence",
  "Efficient water management through drip irrigation",
  "Improved nutrient absorption with fertigation",
  "Lower production losses",
  "Higher market value for premium-quality produce",
  "Sustainable and environmentally friendly farming",
];

const SERVICES = [
  { icon: <ClipboardList className="w-5 h-5" />, title: "Project Consultation & Planning", desc: "Site inspection and feasibility analysis for every project." },
  { icon: <Warehouse className="w-5 h-5" />, title: "Polyhouse Design & Construction", desc: "UV-stabilized structures engineered for your crop and climate." },
  { icon: <Droplets className="w-5 h-5" />, title: "Drip Irrigation & Fertigation", desc: "Efficient water and nutrient delivery systems built in." },
  { icon: <Sprout className="w-5 h-5" />, title: "Crop Planning & Selection", desc: "Guidance on the right crops for your land, budget, and market." },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Farm Management Support", desc: "Technical training and advisory services throughout the cycle." },
  { icon: <TrendingUp className="w-5 h-5" />, title: "Harvest & Marketing Assistance", desc: "Harvest planning and market linkage for premium returns." },
];

const STEPS = [
  { num: "01", icon: <MapPin className="w-5 h-5" />, title: "Select Suitable Land", desc: "Choose land with good sunlight, proper drainage, reliable water availability, and easy transportation access." },
  { num: "02", icon: <Warehouse className="w-5 h-5" />, title: "Decide the Polyhouse Type", desc: "Select from naturally ventilated polyhouses, climate-controlled polyhouses, shade net houses, or polycarbonate greenhouses." },
  { num: "03", icon: <ClipboardList className="w-5 h-5" />, title: "Prepare a Detailed Project Plan", desc: "Include construction cost, irrigation setup, crop selection, labour requirements, maintenance expenses, and expected returns." },
  { num: "04", icon: <Droplets className="w-5 h-5" />, title: "Install Irrigation & Fertigation", desc: "Drip irrigation and fertigation systems deliver water and nutrients efficiently, improving crop health and productivity." },
  { num: "05", icon: <Leaf className="w-5 h-5" />, title: "Choose Profitable Crops", desc: "Tomatoes, capsicum, cucumbers, strawberries, roses, gerbera, herbs, and leafy vegetables perform well under polyhouse conditions." },
  { num: "06", icon: <ShieldCheck className="w-5 h-5" />, title: "Manage the Crop Carefully", desc: "Monitor temperature, humidity, pest control, and nutrient levels regularly for healthy, consistent yield." },
  { num: "07", icon: <TrendingUp className="w-5 h-5" />, title: "Market Your Produce Effectively", desc: "Sell through wholesale markets, supermarkets, exporters, retail outlets, and online platforms to maximize profits." },
];

const waLink = "https://wa.me/917397789803?text=I'm%20interested%20in%20a%20Polyhouse%20Farming%20Project.%20Please%20share%20details.";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.igoagritechfarms.com/" },
    { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.igoagritechfarms.com/projects" },
    { "@type": "ListItem", "position": 3, "name": "Polyhouse Farming Projects", "item": "https://www.igoagritechfarms.com/projects/polyhouse" },
  ],
};

const PolyhouseFarming = () => (
  <div className="bg-white min-h-screen selection:bg-agri-green-50 selection:text-agri-green-800">
    <SEO
      title="Polyhouse Farming Projects – Top Polyhouse Farming in India"
      description="IGO Agritech Farms delivers customized Polyhouse Farming Projects across India — planning, construction, irrigation systems, crop selection, and technical support for protected cultivation."
      keywords="top polyhouse farming in India, low-cost polyhouse farming ideas, how to start polyhouse farming business, polyhouse construction"
      url="/projects/polyhouse"
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
          src="/assets/compressed/projects/igo-polyhouse-farming-1774957390686.webp"
          alt="Polyhouse Farming Projects in India"
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
          <span className="text-agri-gold-500">Polyhouse Farming Projects</span>
        </div>

        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.15 } } }} className="max-w-4xl">
          <motion.div variants={fader} className="flex items-center gap-4 mb-8">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">Protected Cultivation</span>
          </motion.div>
          <motion.h1 variants={fader} className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tight leading-[0.93]">
            Polyhouse <br /><span className="italic">Farming Projects</span>
          </motion.h1>
          <motion.p variants={fader} className="text-white/60 text-xl font-light leading-relaxed max-w-2xl">
            Customized Polyhouse Farming Projects combining advanced infrastructure, expert guidance, and modern farming techniques for controlled, year-round production.
          </motion.p>
          <motion.div variants={fader} className="mt-10">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-agri-gold-500 text-white text-[10px] font-bold rounded-full hover:bg-white hover:text-agri-green-800 transition-all uppercase tracking-widest shadow-2xl shadow-agri-gold-500/30"
            >
              <MessageCircle className="w-4 h-4" /> Start Your Polyhouse Project
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* What is Polyhouse Farming */}
    <section className="py-20 md:py-28 container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">The Method</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-agri-green-800 mb-6 tracking-tight">What is Polyhouse Farming?</h2>
        </div>
        <div className="text-black/70 font-light leading-relaxed space-y-5 text-lg">
          <p>Polyhouse farming is a protected cultivation technique in which crops are grown inside specially designed structures covered with UV-stabilized polyethylene sheets, regulating temperature, humidity, light intensity, and ventilation.</p>
          <p>Unlike conventional farming, polyhouse cultivation protects crops from harsh climatic conditions, heavy rainfall, frost, strong winds, and pest infestations — enabling premium-quality vegetables, fruits, flowers, herbs, and nursery plants throughout the year.</p>
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="py-20 md:py-28 bg-agri-earth-15">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">Benefits</span>
            <div className="h-px w-8 bg-agri-gold-500/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-agri-green-800 tracking-tight">Benefits of Polyhouse Farming</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {BENEFITS.map((b) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-start gap-3 bg-white rounded-2xl p-5 shadow-sm border border-black/5"
            >
              <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-agri-gold-500" />
              <span className="text-sm font-medium text-agri-green-800 leading-relaxed">{b}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How to start - steps */}
    <section className="py-20 md:py-28 container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-8 bg-agri-gold-500/60" />
          <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">The Process</span>
          <div className="h-px w-8 bg-agri-gold-500/60" />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-agri-green-800 tracking-tight mb-4">How to Start Polyhouse Farming Business</h2>
        <p className="text-black/50 font-light">A clear plan based on your land, budget, crop choice, and market demand reduces risk and improves long-term success.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {STEPS.map((s) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[1.75rem] p-8 shadow-sm border border-black/5"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl font-serif text-agri-gold-500/50">{s.num}</span>
              <span className="w-9 h-9 rounded-full bg-agri-gold-500/15 text-agri-gold-500 flex items-center justify-center">{s.icon}</span>
            </div>
            <h3 className="text-lg font-serif text-agri-green-800 mb-2">{s.title}</h3>
            <p className="text-black/60 font-light leading-relaxed text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Why choose us + Low cost note */}
    <section className="py-20 md:py-28 bg-agri-green-950 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">Why IGO</span>
            <div className="h-px w-8 bg-agri-gold-500/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">Why Choose IGO Agritech Farms?</h2>
          <p className="text-white/50 font-light">Complete project solutions designed to meet the specific needs of farmers, investors, and agribusiness entrepreneurs.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {SERVICES.map((s) => (
            <div key={s.title} className="bg-white/5 border border-white/10 rounded-[1.75rem] p-8">
              <div className="w-11 h-11 rounded-full bg-agri-gold-500/15 text-agri-gold-500 flex items-center justify-center mb-5">{s.icon}</div>
              <h3 className="text-lg font-serif mb-2">{s.title}</h3>
              <p className="text-white/50 font-light text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto flex items-start gap-4 bg-white/5 border border-white/10 rounded-[1.75rem] p-8">
          <Wrench className="w-6 h-6 shrink-0 text-agri-gold-500 mt-1" />
          <div>
            <h3 className="text-lg font-serif mb-2">Low-Cost Polyhouse Farming Ideas</h3>
            <p className="text-white/60 font-light text-sm leading-relaxed">Starting with naturally ventilated polyhouses, using drip irrigation, selecting high-demand vegetable crops, and expanding gradually are practical ways to reduce investment while delivering excellent productivity. We guide farmers in selecting the right project model based on their land, budget, and production goals.</p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 bg-agri-green-800 text-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-3 flex items-center gap-3"><Warehouse className="w-8 h-8 text-agri-gold-500" /> Start your polyhouse farming journey</h2>
          <p className="text-white/60 font-light">Connect with our team for complete support from planning and construction to crop management and marketing.</p>
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

export default PolyhouseFarming;
