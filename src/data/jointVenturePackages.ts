// Dedicated content for each individual Joint Venture package.
//
// Why this file exists: the sidebar menu ("Joint Venture Projects" ->
// Quarter Acre / Half Acre / One Acre) previously pointed all three links at
// the SAME url (/projects/joint-venture), so every click landed on the one
// shared overview page and looked identical. This file supplies unique,
// package-specific content so each option now has its own real page at
// /projects/joint-venture/quarter-acre, /half-acre and /one-acre.
//
// Consumed by src/pages/JointVentureDetail.tsx. Purely additive — does not
// change the existing /projects/joint-venture overview page or any of its
// content.

export interface JointVenturePackage {
  slug: "quarter-acre" | "half-acre" | "one-acre";
  name: string;
  eyebrow: string;
  size: string;
  cost: string;
  income: string;
  featured: boolean;
  heroDescription: string;
  metaDescription: string;
  keywords: string;
  about: string[];
  suitableFor: string[];
  investment: { label: string; value: string }[];
  timeline: string;
  faqs: { q: string; a: string }[];
}

export const JOINT_VENTURE_PACKAGES: Record<string, JointVenturePackage> = {
  "quarter-acre": {
    slug: "quarter-acre",
    name: "Quarter Acre Project",
    eyebrow: "The Starter Model",
    size: "1000 Sq.m",
    cost: "₹4,00,000",
    income: "₹2,00,000 per year",
    featured: false,
    heroDescription:
      "A compact, professionally managed Joint Venture farming project designed for first-time agricultural participants who want to enter commercial farming without a large upfront commitment or prior farming experience.",
    metaDescription:
      "Quarter Acre Joint Venture Farming Project by IGO Agritech Farms — 1000 Sq.m project, ₹4,00,000 investment, ₹2,00,000/year estimated income. Ideal starter model for first-time agricultural participants.",
    keywords:
      "quarter acre joint venture farming, small joint venture farming project India, 1000 sq.m farming investment, IGO Agritech Farms quarter acre project",
    about: [
      "The Quarter Acre Project is IGO Agritech Farms' entry-level Joint Venture model, built for individuals who want to understand and participate in modern commercial farming on a smaller, more manageable scale before committing to a larger project.",
      "Spread across 1000 Sq.m, this project is professionally planned and executed by our agricultural team — covering land preparation, crop selection, irrigation setup, and day-to-day farm management — so you do not need any prior farming background to participate.",
      "Because the project size is smaller, the Quarter Acre model carries a lower entry investment while still following the same scientific cultivation practices, crop monitoring, and structured payout schedule used across all IGO Joint Venture projects.",
      "Many participants use the Quarter Acre Project as a way to evaluate the Joint Venture model firsthand, with the option to scale up to a Half Acre or One Acre project once they are familiar with how the partnership works.",
    ],
    suitableFor: [
      "First-time agricultural participants",
      "Small-scale farming projects",
      "Professionals exploring commercial agriculture",
    ],
    investment: [
      { label: "Project Size", value: "1000 Sq.m" },
      { label: "Project Cost", value: "₹4,00,000" },
      { label: "Est. Annual Income", value: "₹2,00,000 per year" },
      { label: "Crop Cycles", value: "3 per year" },
      { label: "Payout Structure", value: "7 payouts per year" },
    ],
    timeline:
      "As with all IGO Joint Venture projects, the Quarter Acre model follows a structured six-stage process — consultation, project recommendation, planning, development, cultivation & farm management, and harvest & market support — so the entire farming cycle is handled on your behalf from start to finish.",
    faqs: [
      { q: "Is the Quarter Acre Project a good starting point if I have no farming background?", a: "Yes. It is specifically designed as an entry-level model — our team manages every technical and operational aspect, so no prior farming experience is required." },
      { q: "Can I upgrade from a Quarter Acre Project to a larger project later?", a: "Yes. Many participants begin with the Quarter Acre model and expand into a Half Acre or One Acre project once they are comfortable with the Joint Venture process." },
      { q: "What is included in the ₹4,00,000 project cost?", a: "The cost covers land development, infrastructure setup, crop inputs, irrigation, and professional farm management for the project duration." },
      { q: "How is the ₹2,00,000 per year estimated income calculated?", a: "It is based on projected yields across 3 crop cycles per year for a 1000 Sq.m project, supported by organized market linkage for the harvested produce." },
    ],
  },
  "half-acre": {
    slug: "half-acre",
    name: "Half Acre Project",
    eyebrow: "The Most Chosen Model",
    size: "2000 Sq.m",
    cost: "₹7,75,000",
    income: "₹4,00,000 per year",
    featured: true,
    heroDescription:
      "IGO Agritech Farms' most popular Joint Venture model — a balanced project size that gives landowners, entrepreneurs, and agriculture investors meaningful scale without the larger commitment of a full acre.",
    metaDescription:
      "Half Acre Joint Venture Farming Project by IGO Agritech Farms — 2000 Sq.m project, ₹7,75,000 investment, ₹4,00,000/year estimated income. Our most chosen Joint Venture model for investors and entrepreneurs.",
    keywords:
      "half acre joint venture farming, 2000 sq.m farming investment India, most chosen joint venture project, IGO Agritech Farms half acre project",
    about: [
      "The Half Acre Project is IGO Agritech Farms' most chosen Joint Venture model, sitting at a size that most landowners and investors find gives real production scale while still remaining a manageable, professionally-run commitment.",
      "Covering 2000 Sq.m, the project benefits from the same end-to-end management as every IGO Joint Venture — land preparation, crop planning, irrigation design, cultivation, and market linkage — but with a larger cropping area that improves overall yield efficiency and income potential compared to the Quarter Acre model.",
      "Because of its balance between investment size and returns, the Half Acre Project is popular among entrepreneurs and business professionals who want a serious agricultural asset without stepping directly into the larger One Acre commitment.",
      "As with all IGO Joint Venture projects, the Half Acre Project follows the same structured 3-crop-cycle annual schedule and 7-payout model, giving participants a predictable, professionally supported income stream throughout the year.",
    ],
    suitableFor: [
      "Landowners",
      "Entrepreneurs",
      "Agriculture investors",
      "Business professionals",
    ],
    investment: [
      { label: "Project Size", value: "2000 Sq.m" },
      { label: "Project Cost", value: "₹7,75,000" },
      { label: "Est. Annual Income", value: "₹4,00,000 per year" },
      { label: "Crop Cycles", value: "3 per year" },
      { label: "Payout Structure", value: "7 payouts per year" },
    ],
    timeline:
      "The Half Acre Project follows IGO's standard six-stage Joint Venture process — consultation, project recommendation, planning, development, cultivation & farm management, and harvest & market support — scaled to the project's 2000 Sq.m footprint and managed end-to-end by our agricultural team.",
    faqs: [
      { q: "Why is the Half Acre Project the most chosen model?", a: "It offers a strong balance between investment size and returns — larger production scale than the Quarter Acre model, without the full commitment of a One Acre project." },
      { q: "Do I need farmland of my own to start a Half Acre Project?", a: "Landowners can use their own land, and the team can also advise on suitable arrangements if you do not currently own agricultural land — this is discussed during the initial consultation." },
      { q: "How does the Half Acre Project's income compare to the Quarter Acre model?", a: "The Half Acre Project is projected at ₹4,00,000 per year, roughly double the Quarter Acre Project's ₹2,00,000, reflecting its larger 2000 Sq.m production area." },
      { q: "Can I visit the farm site during the Half Acre Project?", a: "Yes. Participants can stay updated on farm progress, and site visits can be arranged through your assigned project contact." },
    ],
  },
  "one-acre": {
    slug: "one-acre",
    name: "One Acre Project",
    eyebrow: "The Commercial-Scale Model",
    size: "4000 Sq.m",
    cost: "₹15,00,000",
    income: "₹8,00,000 per year",
    featured: false,
    heroDescription:
      "IGO Agritech Farms' largest standard Joint Venture model — a full commercial-scale farming project built for participants pursuing serious, long-term agricultural income and expansion.",
    metaDescription:
      "One Acre Joint Venture Farming Project by IGO Agritech Farms — 4000 Sq.m project, ₹15,00,000 investment, ₹8,00,000/year estimated income. Commercial-scale model for long-term agricultural expansion.",
    keywords:
      "one acre joint venture farming, 4000 sq.m commercial farming investment, large scale joint venture project India, IGO Agritech Farms one acre project",
    about: [
      "The One Acre Project is IGO Agritech Farms' largest standard Joint Venture model, designed for participants who are ready to commit to a full commercial-scale farming operation with correspondingly higher production and income potential.",
      "At 4000 Sq.m, the project supports larger-scale crop planning and infrastructure — including expanded irrigation systems and cultivation zones — while still being fully managed by IGO's agricultural team from planning through to harvest and market linkage.",
      "The One Acre Project suits commercial farming ventures and long-term agricultural expansion plans, where the goal is a substantial, professionally operated income-generating asset rather than a smaller-scale entry project.",
      "Participants benefit from the same structured 3-crop-cycle, 7-payout annual model used across all IGO Joint Venture projects, scaled to the larger production area to maximise the return on a bigger investment.",
    ],
    suitableFor: [
      "Commercial farming",
      "Larger agricultural ventures",
      "Long-term farming expansion",
    ],
    investment: [
      { label: "Project Size", value: "4000 Sq.m" },
      { label: "Project Cost", value: "₹15,00,000" },
      { label: "Est. Annual Income", value: "₹8,00,000 per year" },
      { label: "Crop Cycles", value: "3 per year" },
      { label: "Payout Structure", value: "7 payouts per year" },
    ],
    timeline:
      "The One Acre Project follows IGO's standard six-stage Joint Venture process — consultation, project recommendation, planning, development, cultivation & farm management, and harvest & market support — scaled up to manage the project's larger 4000 Sq.m footprint and infrastructure requirements.",
    faqs: [
      { q: "Who is the One Acre Project best suited for?", a: "It is designed for participants pursuing commercial-scale farming, larger agricultural ventures, or long-term expansion, rather than those testing the Joint Venture model for the first time." },
      { q: "Is the One Acre Project's income guaranteed?", a: "The ₹8,00,000 per year figure is an estimate based on projected yields across 3 crop cycles; actual returns depend on crop performance, market conditions, and seasonal factors." },
      { q: "Can I start with a smaller project and move to a One Acre Project later?", a: "Yes. Many participants begin with a Quarter Acre or Half Acre Project and expand to a One Acre Project once they are familiar with the Joint Venture process." },
      { q: "What kind of infrastructure is included in the One Acre Project?", a: "The project includes land development, expanded irrigation systems, and cultivation infrastructure appropriate to a 4000 Sq.m commercial farming operation, all set up and managed by IGO's team." },
    ],
  },
};
