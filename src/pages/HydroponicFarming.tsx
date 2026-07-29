import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import {
  ArrowRight, MessageCircle, CheckCircle2, Droplets, TrendingUp, Sprout,
  ShieldCheck, LayoutGrid, CalendarClock, Waves, Layers, Container, GitBranch,
} from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const fader: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const CROPS = [
  "Leafy Vegetables", "Lettuce", "Spinach", "Kale", "Mint", "Coriander", "Basil",
  "Tomatoes", "Cucumbers", "Capsicum", "Strawberries", "Exotic Vegetables",
  "Medicinal Plants", "Microgreens",
];

const WHY = [
  { icon: <TrendingUp className="w-5 h-5" />, title: "Higher Crop Productivity", desc: "Plants receive balanced nutrients continuously, resulting in faster growth and higher yields." },
  { icon: <Droplets className="w-5 h-5" />, title: "Water Conservation", desc: "Uses up to 90% less water than traditional farming because water is recycled within the system." },
  { icon: <Sprout className="w-5 h-5" />, title: "Faster Plant Growth", desc: "Controlled nutrient delivery promotes quicker crop development and earlier harvesting." },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Better Crop Quality", desc: "Hydroponically grown vegetables are cleaner, healthier, and more uniform in size and appearance." },
  { icon: <CheckCircle2 className="w-5 h-5" />, title: "Reduced Pest Problems", desc: "Since crops are grown without soil, many soil-borne diseases and pests are significantly reduced." },
  { icon: <LayoutGrid className="w-5 h-5" />, title: "Efficient Land Utilization", desc: "Maximum production even in limited spaces, making it suitable for urban and semi-urban farming." },
  { icon: <CalendarClock className="w-5 h-5" />, title: "Year-Round Production", desc: "Protected cultivation enables farming regardless of seasonal weather conditions." },
];

const SYSTEMS = [
  { icon: <Waves className="w-5 h-5" />, title: "NFT (Nutrient Film Technique)", desc: "Ideal for leafy vegetables and herbs — a thin film of nutrient solution continuously flows over plant roots." },
  { icon: <Container className="w-5 h-5" />, title: "Deep Water Culture (DWC)", desc: "Plants are suspended above oxygen-rich nutrient water, promoting rapid root development." },
  { icon: <Layers className="w-5 h-5" />, title: "Dutch Bucket System", desc: "Suitable for large fruiting crops such as tomatoes, cucumbers, and capsicum." },
  { icon: <LayoutGrid className="w-5 h-5" />, title: "Vertical Hydroponics", desc: "Maximizes production by utilizing vertical growing space, ideal for urban farming." },
  { icon: <GitBranch className="w-5 h-5" />, title: "Drip Hydroponic System", desc: "Provides precise nutrient delivery for commercial crop production." },
];

const SERVICES = [
  "Site inspection and feasibility study",
  "Customized project planning",
  "Greenhouse and shade-net construction",
  "Hydroponic system installation",
  "Nutrient and irrigation management",
  "Climate control solutions",
  "Crop selection guidance",
  "Technical training",
  "Farm maintenance support",
  "Harvest planning",
  "Market linkage assistance",
  "Buyback support for selected projects",
];

const waLink = "https://wa.me/917397789803?text=I'm%20interested%20in%20a%20Hydroponic%20Farming%20Project.%20Please%20share%20details.";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.igoagritechfarms.com/" },
    { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.igoagritechfarms.com/projects" },
    { "@type": "ListItem", "position": 3, "name": "Hydroponic Farming Projects", "item": "https://www.igoagritechfarms.com/projects/hydroponic" },
  ],
};

const HydroponicFarming = () => (
  <div className="bg-white min-h-screen selection:bg-agri-green-50 selection:text-agri-green-800">
    <SEO
      title="Best Hydroponic Farming Projects in India – Modern Soilless Farming"
      description="IGO Agritech Farms designs, constructs, and manages complete hydroponic farming projects across India — greenhouse construction, irrigation systems, crop management, and market linkage."
      keywords="best hydroponic farming projects, hydroponic companies in India, low-cost hydroponic farming system, NFT DWC hydroponics"
      url="/projects/hydroponic"
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
          src="/assets/compressed/projects/igo-hydroponic-farming-1774957407427.webp"
          alt="Hydroponic Farming Projects in India"
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
          <span className="text-agri-gold-500">Hydroponic Farming Projects</span>
        </div>

        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.15 } } }} className="max-w-4xl">
          <motion.div variants={fader} className="flex items-center gap-4 mb-8">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">Modern Soilless Farming</span>
          </motion.div>
          <motion.h1 variants={fader} className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tight leading-[0.93]">
            Hydroponic <br /><span className="italic">Farming Projects</span>
          </motion.h1>
          <motion.p variants={fader} className="text-white/60 text-xl font-light leading-relaxed max-w-2xl">
            Complete turnkey hydroponic solutions — project planning, greenhouse construction, irrigation systems, crop management, technical support, and market linkage.
          </motion.p>
          <motion.div variants={fader} className="mt-10">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-agri-gold-500 text-white text-[10px] font-bold rounded-full hover:bg-white hover:text-agri-green-800 transition-all uppercase tracking-widest shadow-2xl shadow-agri-gold-500/30"
            >
              <MessageCircle className="w-4 h-4" /> Start Your Hydroponic Project
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* What is Hydroponic Farming */}
    <section className="py-20 md:py-28 container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">The Method</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-agri-green-800 mb-6 tracking-tight">What is Hydroponic Farming?</h2>
        </div>
        <div className="text-black/70 font-light leading-relaxed space-y-5 text-lg">
          <p>Hydroponics is a soil-free cultivation technique where plants grow in water enriched with essential nutrients, delivered directly through specially designed irrigation systems instead of soil.</p>
          <p>This innovative method creates an ideal growing environment where plants develop faster, healthier, and with higher productivity — with consistent production throughout the year.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {CROPS.map((c) => (
              <span key={c} className="px-4 py-2 rounded-full bg-agri-earth-15 text-agri-green-800 text-xs font-semibold">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Why choose */}
    <section className="py-20 md:py-28 bg-agri-earth-15">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">The Advantages</span>
            <div className="h-px w-8 bg-agri-gold-500/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-agri-green-800 tracking-tight">Why Choose the Best Hydroponic Farming Projects?</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY.map((w) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[1.75rem] p-8 shadow-sm border border-black/5"
            >
              <div className="w-11 h-11 rounded-full bg-agri-gold-500/15 text-agri-gold-500 flex items-center justify-center mb-5">{w.icon}</div>
              <h3 className="text-lg font-serif text-agri-green-800 mb-2">{w.title}</h3>
              <p className="text-black/60 font-light text-sm leading-relaxed">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Types of systems */}
    <section className="py-20 md:py-28 container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-8 bg-agri-gold-500/60" />
          <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">Technology</span>
          <div className="h-px w-8 bg-agri-gold-500/60" />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-agri-green-800 tracking-tight mb-4">Types of Hydroponic Systems</h2>
        <p className="text-black/50 font-light">We recommend the most suitable hydroponic technology based on your land availability and crop selection.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {SYSTEMS.map((s) => (
          <div key={s.title} className="rounded-[1.75rem] p-8 border border-black/10">
            <div className="w-11 h-11 rounded-full bg-agri-green-800/10 text-agri-green-800 flex items-center justify-center mb-5">{s.icon}</div>
            <h3 className="text-lg font-serif text-agri-green-800 mb-2">{s.title}</h3>
            <p className="text-black/60 font-light text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Services */}
    <section className="py-20 md:py-28 bg-agri-green-950 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-agri-gold-500/60" />
            <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">Our Services</span>
            <div className="h-px w-8 bg-agri-gold-500/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">Hydroponic Companies in India — Why IGO Agritech Farms?</h2>
          <p className="text-white/50 font-light max-w-2xl mx-auto">A successful hydroponic farm requires more than just equipment — it needs proper planning, installation, training, and ongoing technical support.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {SERVICES.map((s) => (
            <div key={s} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-5">
              <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-agri-gold-500" />
              <span className="text-sm font-light text-white/80">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 bg-agri-green-800 text-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-3 flex items-center gap-3"><Droplets className="w-8 h-8 text-agri-gold-500" /> Start your hydroponic farming journey</h2>
          <p className="text-white/60 font-light">Connect with our team to design a hydroponic system tailored to your crop and space.</p>
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

export default HydroponicFarming;
