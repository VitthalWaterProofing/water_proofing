import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight, CheckCircle, ChevronDown, Copy, Gift, Phone, Send, Share2,
  ShieldCheck, UserPlus, PhoneCall, Trophy, Utensils, WashingMachine, AirVent,
  Sandwich, CookingPot, Laptop, Plane, Smartphone, Refrigerator, Tv, Headphones,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "../components/layout/Footer";
import FloatingActions from "../components/FloatingActions";
import api from "../services/api";

const SITE_URL = "https://vitthalwaterproofing.com";
const PHONE = "+917478027079";
const PHONE_DISPLAY = "+91 74780 27079";

const shareMessage = `Facing leakage, seepage or damp walls? I recommend Vitthal Waterproofing for terrace, bathroom and building waterproofing. ${SITE_URL}`;

type Reward = {
  name: string;
  icon: LucideIcon;
  image?: string;
  // Photos (not product shots) fill the frame instead of being contained
  cover?: boolean;
  // Banner art on a black background: shown whole, letterboxed in black
  dark?: boolean;
  badge?: string;
};

const rewards: Reward[] = [
  { name: "Holiday Trip To Maldives", icon: Plane, image: "/rewards/maldives-trip.webp", cover: true, badge: "Top Reward" },
  { name: "Samsung Galaxy S26 Ultra Phone", icon: Smartphone, image: "/rewards/samsung-galaxy-s26.webp" },
  { name: "Haier Vogue Series 598 L Fridge (Double Door)", icon: Refrigerator, image: "/rewards/haier-fridge-598l.webp" },
  { name: "LED TV", icon: Tv, image: "/rewards/led-tv.webp" },
  { name: "Bosch 13 Place Settings Dishwasher", icon: Utensils, image: "/rewards/bosch-dishwasher.webp" },
  { name: "Samsung Washing Machine Bespoke AI", icon: WashingMachine, image: "/rewards/samsung-washing-machine.webp", dark: true },
  { name: "Carrier 1.5 Ton 3 Star Flexicool Inverter Split Air Conditioner", icon: AirVent, image: "/rewards/carrier-ac-1-5-ton.webp" },
  { name: "Dell Business Laptop 3410 i5 10th Gen 8 GB RAM & 512 GB SSD", icon: Laptop, image: "/rewards/dell-laptop-3410.webp" },
  { name: "Prestige Endura Mixer Grinder", icon: CookingPot, image: "/rewards/prestige-mixer-grinder.webp" },
  { name: "Noise Earpods", icon: Headphones, image: "/rewards/noise-earpods.webp" },
  { name: "Morphy Richards Sandwich Maker 2in1 750 Watt", icon: Sandwich, image: "/rewards/morphy-richards-sandwich-maker.webp" },
];

const steps = [
  { icon: Share2, title: "Refer a customer", text: "Share our website or fill the referral form for someone who needs waterproofing." },
  { icon: PhoneCall, title: "We contact them", text: "Our team calls the customer, inspects the site and shares a clear quotation." },
  { icon: ShieldCheck, title: "Work is completed", text: "We complete the agreed waterproofing work with quality materials." },
  { icon: Gift, title: "You get rewarded", text: "Once the work and payment are completed, your reward is confirmed." },
];

const terms = [
  "Referrals must be genuine and shared with the customer's consent.",
  "Existing customers or earlier enquiries may not qualify as new referrals.",
  "Duplicate referrals are reviewed; the first verified referral is considered.",
  "Rewards are given only after the project is completed and full payment is received.",
  "The reward depends on the size and value of the completed project, as decided by Vitthal Waterproofing.",
  "Fraudulent, misleading or self-generated referrals will be rejected.",
  "Vitthal Waterproofing may change or end the program at any time.",
];

const faqs = [
  { q: "How does Refer & Earn work?", a: "Refer someone who needs waterproofing. After we complete their work and receive payment, you receive a reward based on the project." },
  { q: "Who can refer a customer?", a: "Anyone — past customers, friends, family, contractors, builders and property owners." },
  { q: "Which services are eligible?", a: "Terrace, bathroom, basement, wall seepage, external wall, water tank and complete building waterproofing." },
  { q: "When will I receive my reward?", a: "After the referred project is completed and the full payment is received by us." },
  { q: "Can I refer more than one customer?", a: "Yes. Every referral is reviewed separately, so more referrals mean more rewards." },
  { q: "Whom do I contact about my reward?", a: `Call or WhatsApp us on ${PHONE_DISPLAY} with your name and the customer's name.` },
];

const inputClass = (hasError?: boolean) =>
  `w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${hasError ? "ring-2 ring-red-500" : "focus:ring-blue-500"}`;

const emptyForm = {
  referrerName: "",
  referrerPhone: "",
  referrerEmail: "",
  customerName: "",
  customerPhone: "",
  city: "",
  service: "",
  details: "",
};

export default function ReferEarnPage() {
  const [formData, setFormData] = useState(emptyForm);
  const [consent, setConsent] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const validateField = (name: string, value: string) => {
    if ((name === "referrerName" || name === "customerName") && value.trim().length < 2) {
      return "Name must be at least 2 characters.";
    }
    if ((name === "referrerPhone" || name === "customerPhone") && !/^[6-9]\d{9}$/.test(value)) {
      return "Enter a valid 10-digit mobile number.";
    }
    if (name === "referrerEmail" && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return "Please enter a valid email address.";
    }
    if (name === "city" && value.trim().length < 2) return "Please enter the location.";
    if (name === "service" && value === "") return "Please select a service.";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === "referrerPhone" || name === "customerPhone") {
      value = value.replace(/\D/g, "").replace(/^0+/, "").slice(0, 10);
    }
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) errors[key] = error;
    });
    if (!consent) errors.consent = "Please confirm the customer agreed to be contacted.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const message = [
      `REFERRAL`,
      `Referred by: ${formData.referrerName} (${formData.referrerPhone}, ${formData.referrerEmail})`,
      `Customer location: ${formData.city}`,
      `Details: ${formData.details.trim() || "-"}`,
    ].join("\n");

    try {
      await api.post("/leads", {
        customerName: formData.customerName,
        email: formData.referrerEmail,
        phone: formData.customerPhone,
        serviceRequested: `Referral - ${formData.service}`,
        message,
      });
      setIsSuccess(true);
      setFormData(emptyForm);
      setConsent(false);
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setErrorMsg(err.response?.data?.message || "Failed to submit referral. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Vitthal Waterproofing", text: shareMessage, url: SITE_URL });
      } catch {
        // user cancelled the share sheet
      }
    } else {
      handleCopy();
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  return (
    <>
      <div className="pt-16">
        {/* 1. Hero */}
        <section className="relative overflow-hidden bg-[#0f2d5c] text-white">
          <div
            className="absolute inset-0 bg-cover bg-[70%_center] bg-no-repeat lg:bg-[length:auto_100%] lg:bg-right"
            style={{ backgroundImage: "url('/refer-earn-hero.webp')" }}
            aria-hidden="true"
          ></div>
          {/* Darken the left side so the text stays readable over the image */}
          <div className="absolute inset-0 bg-[#0f2d5c]/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#0f2d5c] lg:via-[#0f2d5c]/80 lg:to-transparent"></div>

          <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24 lg:min-h-[560px] flex items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 bg-amber-400/15 text-amber-300 border border-amber-400/40 rounded-full px-4 py-1.5 text-sm font-semibold">
                <Gift size={16} /> Refer Karo, Reward Pao
              </span>

              <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Refer Vitthal Waterproofing.{" "}
                <span className="text-amber-300">Win Exciting Rewards!</span>
              </h1>

              <p className="mt-5 text-base md:text-lg text-blue-100">
                Know someone dealing with leakage, seepage, damp walls, terrace or bathroom leakage?
                Refer them to us and get rewarded when their waterproofing work is successfully completed.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#refer-form"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0f2d5c] font-semibold px-6 py-3 rounded-xl shadow-lg transition"
                >
                  Refer Someone Now <ArrowRight size={18} />
                </a>
                <a
                  href="#rewards"
                  className="inline-flex items-center gap-2 border border-white/60 hover:bg-white/10 px-6 py-3 rounded-xl font-semibold transition"
                >
                  View Rewards
                </a>
              </div>

              <div className="mt-8 flex items-center gap-3 text-sm text-blue-100">
                <Trophy className="text-amber-300 shrink-0" size={22} />
                <span>
                  <span className="font-bold text-amber-300">{rewards.length} exciting rewards</span> to win
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. How it works */}
        <section className="bg-[#f3f6fc] py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">How It Works</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mt-2">
                4 Simple Steps to Earn
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => {
                const last = i === steps.length - 1;
                return (
                  <div
                    key={step.title}
                    className={`relative p-6 rounded-2xl shadow-sm hover:shadow-md transition ${last ? "bg-[#1e3a6d] text-white" : "bg-white"}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${last ? "bg-amber-400 text-[#0f2d5c]" : "bg-blue-100 text-blue-600"}`}>
                        <step.icon size={22} />
                      </div>
                      <span className={`text-3xl font-bold ${last ? "text-blue-300/60" : "text-blue-100"}`}>0{i + 1}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className={`text-sm leading-relaxed ${last ? "text-blue-100" : "text-gray-600"}`}>{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Rewards */}
        <section id="rewards" className="bg-white py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Rewards</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mt-2">
                Your Referrals. Your Rewards.
              </h2>
              <p className="text-gray-600 mt-4">
                Earn exciting rewards when the customer you refer completes their waterproofing work with us.
                Bigger projects unlock bigger rewards.
              </p>
            </div>

            {/* Flex-wrap (not grid) so a short last row is centered */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
              {rewards.map((r) => (
                <div
                  key={r.name}
                  className="group relative flex flex-col w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-16px)] rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {r.badge && (
                    <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-amber-400 text-[#0f2d5c] text-xs font-semibold px-3 py-1 rounded-full shadow">
                      <Trophy size={14} /> {r.badge}
                    </span>
                  )}

                  <div className={`aspect-[4/3] border-b border-gray-100 overflow-hidden ${r.dark ? "bg-black" : "bg-white"}`}>
                    {r.image ? (
                      <img
                        src={r.image}
                        alt={r.name}
                        width={800}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full transition-transform duration-300 group-hover:scale-[1.03] ${
                          r.cover ? "object-cover" : r.dark ? "object-contain" : "object-contain p-6"
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#f3f6fc] text-blue-300">
                        <r.icon size={56} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <h3
                      title={r.name}
                      className="font-semibold leading-snug text-[#0f172a] line-clamp-2 min-h-[2.75rem]"
                    >
                      {r.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 text-sm text-gray-600 bg-[#f3f6fc] rounded-xl px-5 py-4 text-center">
              The reward you receive depends on the size and value of the referred project, as confirmed by the Vitthal Waterproofing team.
            </p>
          </div>
        </section>

        {/* 4. Share + Referral form */}
        <section id="refer-form" className="bg-[#f3f6fc] py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Refer Someone</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mt-2">
                Share a Link or Send Us Their Details
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
              {/* Share card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-5">
                <h3 className="text-xl font-semibold text-[#0f172a]">Share with friends & family</h3>
                <p className="text-sm text-gray-600">
                  Send our website to anyone who needs waterproofing and ask them to mention your name when they contact us.
                </p>

                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-3 rounded-xl transition"
                >
                  <FaWhatsapp size={20} /> Share on WhatsApp
                </a>

                <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1.5 pl-4">
                  <span className="flex-1 min-w-0 truncate text-sm text-gray-600">{SITE_URL.replace("https://", "")}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="shrink-0 inline-flex items-center gap-1.5 bg-[#1e3a6d] hover:bg-[#16305c] text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                  >
                    {copied ? <><CheckCircle size={16} /> Copied</> : <><Copy size={16} /> Copy link</>}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="flex items-center justify-center gap-2 w-full border-2 border-[#1e3a6d] text-[#1e3a6d] hover:bg-[#1e3a6d] hover:text-white font-semibold py-3 rounded-xl transition"
                >
                  <Share2 size={18} /> Share using other apps
                </button>

                <div className="border-t border-gray-200 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Prefer to call?</p>
                  <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 text-lg font-bold text-[#1e3a6d] hover:text-blue-600">
                    <Phone size={18} /> {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              {/* Referral form */}
              <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
                <h3 className="text-xl font-semibold text-[#0f172a] flex items-center gap-2">
                  <UserPlus size={22} className="text-blue-600" /> Submit a Referral
                </h3>

                {isSuccess && (
                  <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 border border-green-200">
                    <CheckCircle size={20} className="shrink-0" />
                    <p className="text-sm font-medium">Thank you! Your referral has been received. Our team will contact the customer shortly.</p>
                  </div>
                )}

                {errorMsg && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm">{errorMsg}</div>
                )}

                <fieldset className="space-y-4">
                  <legend className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-3">Your Details</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input type="text" name="referrerName" value={formData.referrerName} onChange={handleChange} placeholder="Your Name *" autoComplete="name" className={inputClass(!!formErrors.referrerName)} />
                      {formErrors.referrerName && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.referrerName}</p>}
                    </div>
                    <div>
                      <input type="tel" name="referrerPhone" value={formData.referrerPhone} onChange={handleChange} placeholder="Your Mobile Number *" inputMode="numeric" autoComplete="tel-national" className={inputClass(!!formErrors.referrerPhone)} />
                      {formErrors.referrerPhone && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.referrerPhone}</p>}
                    </div>
                  </div>
                  <div>
                    <input type="email" name="referrerEmail" value={formData.referrerEmail} onChange={handleChange} placeholder="Your Email Address *" autoComplete="email" className={inputClass(!!formErrors.referrerEmail)} />
                    {formErrors.referrerEmail && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.referrerEmail}</p>}
                  </div>
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-3">Person You Are Referring</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Customer's Name *" className={inputClass(!!formErrors.customerName)} />
                      {formErrors.customerName && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.customerName}</p>}
                    </div>
                    <div>
                      <input type="tel" name="customerPhone" value={formData.customerPhone} onChange={handleChange} placeholder="Customer's Mobile Number *" inputMode="numeric" className={inputClass(!!formErrors.customerPhone)} />
                      {formErrors.customerPhone && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.customerPhone}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Location / Area *" className={inputClass(!!formErrors.city)} />
                      {formErrors.city && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.city}</p>}
                    </div>
                    <div>
                      <select name="service" value={formData.service} onChange={handleChange} className={inputClass(!!formErrors.service)}>
                        <option value="" disabled>Service Required *</option>
                        <option value="Terrace Waterproofing">Terrace Waterproofing</option>
                        <option value="Bathroom Waterproofing">Bathroom Waterproofing</option>
                        <option value="Water Tank Waterproofing">Water Tank Waterproofing</option>
                        <option value="Wall Leakage / Seepage">Wall Leakage / Seepage</option>
                        <option value="Basement Waterproofing">Basement Waterproofing</option>
                        <option value="Complete Building">Complete Building</option>
                        <option value="Other">Other</option>
                      </select>
                      {formErrors.service && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.service}</p>}
                    </div>
                  </div>
                  <textarea name="details" value={formData.details} onChange={handleChange} placeholder="Describe the problem (optional)" rows={3} className={`${inputClass()} resize-none`} />
                </fieldset>

                <div>
                  <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (formErrors.consent) setFormErrors({ ...formErrors, consent: "" });
                      }}
                      className="mt-0.5 w-5 h-5 shrink-0 accent-blue-600"
                    />
                    I confirm the person I am referring has agreed to be contacted by Vitthal Waterproofing.
                  </label>
                  {formErrors.consent && <p className="text-red-500 text-xs mt-1 ml-8">{formErrors.consent}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-white py-3 rounded-xl font-semibold shadow-md transition flex items-center justify-center gap-2 ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-[#1e3a8a] hover:bg-[#1e40af]"}`}
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <><Send size={18} /> Submit Referral</>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Your details are used only by Vitthal Waterproofing to process this referral and are never shared publicly.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* 5. Terms */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Terms & Conditions</p>
              <h2 className="text-3xl font-bold text-[#0f172a] mt-2">Program Rules</h2>
            </div>
            <div className="space-y-3">
              {terms.map((t) => (
                <div key={t} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="bg-[#f3f6fc] py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      aria-expanded={open}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-[#0f172a]"
                    >
                      {f.q}
                      <ChevronDown size={20} className={`shrink-0 text-blue-600 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{f.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. CTA */}
        <section className="py-20 bg-gradient-to-r from-[#181a85] to-[#092788] text-center text-white px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Know Someone Who Needs Waterproofing?</h2>
            <p className="text-blue-100 text-sm mb-8">
              Help your friends and family find the right waterproofing solution — and get rewarded for it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#refer-form" className="bg-amber-400 hover:bg-amber-300 text-[#0f2d5c] transition px-6 py-3 rounded-lg text-sm font-semibold">
                Refer Someone Now
              </a>
              <a href={`tel:${PHONE}`} className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-lg text-sm font-medium inline-flex items-center">
                <Phone size={16} className="mr-2" /> Contact Us Today
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <FloatingActions />
    </>
  );
}
