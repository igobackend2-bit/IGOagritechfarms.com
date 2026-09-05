import { useParams, Link, Navigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import SEO from "@/components/SEO";
import {
  ArrowRight, Handshake, CheckCircle2, TrendingUp, MessageCircle, ClipboardList,
} from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { JOINT_VENTURE_PACKAGES } from "@/data/jointVenturePackages";

// Dedicated detail page for a single Joint Venture package (Quarter Acre /
// Half Acre / One Acre). Previously, all three sidebar menu links pointed to
// the same shared /projects/joint-venture overview page, so clicking any of
// them looked identical. This page gives each package its own real URL
// (/projects/joint-venture/quarter-acre, /half-acre, /one-acre) with content
// specific to that package, pulled from src/data/jointVenturePackages.ts.
//
// Purely additive: does not change the existing /projects/joint-venture
// overview page, its content, or any other route.

const fader: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const waLink = (pkgName: string) =>
  `https://wa.me/917397789803?text=I'm%20interested%20in%20the%20${encodeURIComponent(
    pkgName
  )}%20Joint%20Venture%20Farming%20Project.%20Please%20share%20details.`;

const JointVentureDetail = () => {
  const { size } = useParams<{ size: string }>();
  const pkg = size ? JOINT_VENTURE_PACKAGES[size] : undefined;

  if (!pkg) {
    return <Navigate to="/projects/joint-venture" replace />;
  }

  const jvBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.igoagritechfarms.com/" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.igoagritechfarms.com/projects" },
      { "@type": "ListItem", position: 3, name: "Joint Venture Projects", item: "https://www.igoagritechfarms.com/projects/joint-venture" },
      { "@type": "ListItem", position: 4, name: pkg.name, item: `https://www.igoagritechfarms.com/projects/joint-venture/${pkg.slug}` },
    ],
  };

  return (
    <div className="bg-white min-h-screen selection:bg-agri-green-50 selection:text-agri-green-800">
      <SEO
        title={`${pkg.name} — Joint Venture Farming in India`}
        description={pkg.metaDescription}
        keywords={pkg.keywords}
        url={`/projects/joint-venture/${pkg.slug}`}
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
            src="/assets/compressed/projects/joint-venture-handshake.jpg"
            alt={`${pkg.name} — Joint Venture Farming in India`}
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
            <Link to="/projects/joint-venture" className="hover:text-agri-gold-500 transition-colors">Joint Venture Projects</Link>
            <span>/</span>
            <span className="text-agri-gold-500">{pkg.name}</span>
          </div>

          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.15 } } }} className="max-w-4xl">
            <motion.div variants={fader} className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-agri-gold-500/60" />
              <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">{pkg.eyebrow}</span>
            </motion.div>
            <motion.h1 variants={fader} className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tight leading-[0.93]">
              {pkg.name}
            </motion.h1>
            <motion.p variants={fader} className="text-white/60 text-xl font-light leading-relaxed max-w-2xl">
              {pkg.heroDescription}
            </motion.p>
            <motion.div variants={fader} className="mt-10">
              <a
                href={waLink(pkg.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 bg-agri-gold-500 text-white text-[10px] font-bold rounded-full hover:bg-white hover:text-agri-green-800 transition-all uppercase tracking-widest shadow-2xl shadow-agri-gold-500/30"
              >
                <MessageCircle className="w-4 h-4" /> Enquire About This Project
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Investment snapshot */}
      <section className="py-20 md:py-28 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-agri-gold-500/60" />
              <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">About This Project</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-agri-green-800 mb-6 tracking-tight">{pkg.name} Overview</h2>
            <div className="text-black/70 font-light leading-relaxed space-y-5 text-lg">
              {pkg.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div
            className={`rounded-[2rem] p-10 flex flex-col ${
              pkg.featured
                ? "bg-agri-green-800 text-white shadow-2xl"
                : "bg-white border border-black/10 text-black"
            }`}
          >
            {pkg.featured && (
              <span className="self-start mb-4 px-3 py-1 rounded-full bg-agri-gold-500 text-white text-[9px] font-bold uppercase tracking-widest">Most Chosen</span>
            )}
            <h3 className={`text-2xl font-serif mb-6 ${pkg.featured ? "text-white" : "text-agri-green-800"}`}>Investment Snapshot</h3>
            <div className="space-y-4 mb-8">
              {pkg.investment.map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className={`text-xs uppercase tracking-widest ${pkg.featured ? "text-white/70" : "text-black/40"}`}>{row.label}</span>
                  <span className={`font-semibold flex items-center gap-1 ${row.label === "Est. Annual Income" ? (pkg.featured ? "text-agri-gold-400" : "text-agri-green-800") : ""}`}>
                    {row.label === "Est. Annual Income" && <TrendingUp className="w-3.5 h-3.5" />}
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${pkg.featured ? "text-white/70" : "text-black/40"}`}>Suitable for</p>
            <ul className="space-y-2 mb-8 flex-1">
              {pkg.suitableFor.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm font-light">
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.featured ? "text-agri-gold-400" : "text-agri-green-800"}`} />
                  <span className={pkg.featured ? "text-white/80" : "text-black/70"}>{s}</span>
                </li>
              ))}
            </ul>
            <a
              href={waLink(pkg.name)}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                pkg.featured
                  ? "bg-agri-gold-500 text-white hover:bg-white hover:text-agri-green-800"
                  : "bg-agri-green-800 text-white hover:bg-agri-gold-500"
              }`}
            >
              Enquire Now <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-agri-earth-15">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-8 bg-agri-gold-500/60" />
              <span className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em]">How It Works</span>
              <div className="h-px w-8 bg-agri-gold-500/60" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-agri-green-800 tracking-tight mb-6">Managing Your {pkg.name}</h2>
            <p className="text-black/60 font-light leading-relaxed text-lg">{pkg.timeline}</p>
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
          <h2 className="text-4xl font-serif text-agri-green-800 mb-10 tracking-tight">{pkg.name} — Frequently Asked Questions</h2>
          <div className="divide-y divide-black/10 border-t border-b border-black/10">
            {pkg.faqs.map((f) => (
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

      {/* Other options */}
      <section className="py-16 container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-black/50 font-light">
            Looking for a different project size?{" "}
            <Link to="/projects/joint-venture" className="text-agri-green-800 font-semibold underline underline-offset-4 hover:text-agri-gold-500 transition-colors">
              Compare all Joint Venture project options
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-agri-green-800 text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 flex items-center gap-3"><Handshake className="w-8 h-8 text-agri-gold-500" /> Start your {pkg.name} journey</h2>
            <p className="text-white/60 font-light">Connect with our team to move forward with the {pkg.name}.</p>
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
};

export default JointVentureDetail;
