import { useState } from "react";
import InspectionModal from "../components/InspectionModal"
import Footer from "../components/layout/Footer";
import LeakageCTA from "../components/sections/LeakageCTA";
import {
  ShieldCheck,
  Phone,
  Layers,
  Grid,
  Droplets,
  Paintbrush,
  Bath,
  Box,
  Home,
  Building2,
  Search, Stethoscope, CheckCircle, PaintBucket,
  Award, Users, Package, MapPin, Check
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import FloatingActions from "../components/FloatingActions";


export default function ServicesPage() {

  const [isInspectionOpen, setIsInspectionOpen] = useState(false);

  const detailedServices = [
    {
      title: "Brickbat Coba Waterproofing",
      image: "/services/brickbat.jpeg",
      description:
        "Cracked terraces allow water to seep through, causing ceiling damage and structural weakening over time.",
      points: [
        "Long-lasting protection for 15+ years",
        "Excellent crack resistance",
        "Natural heat insulation",
        "Cost-effective traditional method"
      ],
      badge: "Best For: Residential Terraces & Flat Roofs"
    },
    {
      title: "China Mosaic Treatment",
      image: "/services/china.jpeg",
      description:
        "Decorative waterproofing with broken ceramic tiles providing both aesthetics and durability.",
      points: [
        "Thermal insulation",
        "Waterproof sealing",
        "Long-lasting surface finish"
      ],
      badge: "Best For: Premium Terrace Finishes"
    },
    {
      title: "Khoba Waterproofing",
      image: "/services/khoba.jpeg",
      description:
        "Cement-polymer based coating system ensuring crack-resistant protection.",
      points: [
        "High adhesion strength",
        "Crack resistance",
        "Durable terrace coating"
      ],
      badge: "Best For: Cement-Based Terrace Systems"
    },
    {
      title: "Terrace Leakage Repair",
      image: "/services/terrace.jpg",
      description:
        "Expert diagnosis and repair of terrace leaks using advanced sealants.",
      points: [
        "Leak source detection",
        "Advanced sealing",
        "Long-term protection"
      ],
      badge: "Best For: Existing Leak Issues"
    }
  ];

  function ServiceDetail({
    service,
    index,
    openInspection
  }:
    { service: { 
      title: string, 
      image: string, 
      description: string, 
      points: string[], 
      badge?: string 
    }, 
      index: number ,
      openInspection: () => void
    }) {

    const isReverse = index % 2 === 1;
    const bgClass = index % 2 === 0 ? "bg-white" : "bg-[#f3f6fc]";

    return (
      <section className={`${bgClass} py-12 md:py-20`}>
        <div className="max-w-6xl mx-auto px-6">

          <div
            className={`flex flex-col ${isReverse ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-10 md:gap-16`}
          >

            {/* IMAGE */}
            <div className="md:w-1/2 w-full">
              <img
                src={service.image}
                alt={service.title}
                className="rounded-2xl shadow-md w-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="md:w-1/2 w-full">

              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3 mb-6">
                {service.points.map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mt-1">
                      <Check size={14} />
                    </div>
                    {point}
                  </li>
                ))}
              </ul>

              {/* Badge + Button Wrapper */}
              <div className="flex flex-col items-start gap-5">

                {service.badge && (
                  <div className="inline-flex items-center bg-blue-500/10 text-blue-600 text-xs font-semibold px-5 py-2 rounded-full backdrop-blur-sm border border-blue-200">
                    {service.badge}
                  </div>
                )}

                <button
                  onClick={openInspection}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium transition">
                  Book Inspection
                </button>

              </div>

            </div>
          </div>

        </div>
      </section>
    );
  }

  return (
    <>
      <main className="pt-15">

        {/* ================= HERO SECTION ================= */}
        <section className="bg-[#0a1f3c] text-white pt-20">
          <div className="px-8 sm:px-12 md:px-16 lg:px-24 py-16 md:py-20">
            <div className="flex flex-col md:grid md:grid-cols-[1fr_minmax(0,520px)] gap-6 items-center">

              {/* LEFT CONTENT */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center bg-white/10 text-blue-300 px-4 py-2 rounded-full text-sm mb-6 w-fit">
                  <ShieldCheck className="mr-2 shrink-0" size={16} />
                  10+ Years of Waterproofing Expertise
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                  Professional<br />
                  Waterproofing<br />
                  Services in<br />
                  <span className="text-blue-400">Bangalore</span>
                </h1>

                <p className="text-gray-300 mb-8 text-base">
                  Durable, long-lasting, and cost-effective waterproofing<br className="hidden md:block" />
                  solutions for residential and commercial properties.
                </p>

                <div className="flex flex-wrap gap-4 sm:flex-row">
                  <a href="tel:+9867233817" className="w-full sm:w-auto">
                    <button className="min-w-[200px] w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-sm transition duration-300">
                      <Phone size={17} />
                      Get Free Inspection
                    </button>
                  </a>

                  <a href="https://wa.me/9867233817" className="w-full sm:w-auto">
                    <button className="min-w-[200px] w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white px-6 py-3 rounded-lg font-semibold text-sm transition duration-300">
                      <FaWhatsapp size={18} />
                      WhatsApp Now
                    </button>
                  </a>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative pb-10 hidden md:block">
                <img
                  src="/service-hero.png"
                  alt="Professional waterproofing worker applying coating"
                  className="rounded-2xl shadow-2xl w-full h-full min-h-[380px] max-h-[410px] object-cover"
                />
                {/* Badge */}
                <div className="absolute bottom-2 left-[-10px] bg-white text-black px-4 py-3 rounded-xl shadow-lg">
                  <p className="text-xl font-bold">500+</p>
                  <p className="text-sm text-gray-500">Projects Completed</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= SERVICES SECTION ================= */}
        <section className="bg-[#f3f4f5] py-20">
          <div className="max-w-[1400px] mx-auto px-6">

            {/* Top Label */}
            <p className="text-center text-blue-500 text-xs font-semibold tracking-widest mb-4">
              WHAT WE OFFER
            </p>

            {/* Heading */}
            <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-14 leading-snug">
              Our Specialized <br className="sm:hidden" />
              <span className="whitespace-nowrap">
                Waterproofing Services
              </span>
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {/* Card */}
              {[
                {
                  icon: <Layers size={16} />,
                  title: "Brickbat Coba Waterproofing",
                  desc: "Traditional & durable terrace waterproofing using brick pieces and waterproof mortar for long-lasting protection.",
                  features: [
                    "Long-lasting protection for 15+ years",
                    "Excellent crack resistance",
                    "Natural heat insulation",
                    "Cost-effective traditional method"
                  ]
                },
                {
                  icon: <Grid size={16} />,
                  title: "China Mosaic Treatment",
                  desc: "Decorative waterproofing with broken ceramic tiles providing both aesthetics and thermal insulation.",
                  features: [
                    "Beautiful decorative finish",
                    "Superior heat reflection",
                    "Waterproof and weatherproof",
                    "Low maintenance solution"
                  ]
                },
                {
                  icon: <Paintbrush size={16} />,
                  title: "Khoba Waterproofing",
                  desc: "Specialized cement-polymer coating system for terraces, ensuring crack-resistant protection.",
                  features: [
                    "Complete seepage prevention",
                    "Mold and fungus protection",
                    "Non-toxic, safe materials",
                    "10-year warranty coverage"
                  ]
                },
                {
                  icon: <Droplets size={16} />,
                  title: "Terrace Leakage Repair",
                  desc: "Expert diagnosis and repair of terrace leaks using advanced sealants and waterproof membranes.",
                  features: [
                    "Permanent dampness elimination",
                    "Injection grouting technology",
                    "Paint-ready surface finish",
                    "Health-safe environment"
                  ]
                },
                {
                  icon: <Bath size={16} />,
                  title: "Bathroom Waterproofing",
                  desc: "Complete bathroom waterproofing solutions preventing seepage to walls and lower floors.",
                  features: [
                    "Complete seepage prevention",
                    "Mold and fungus protection",
                    "Non-toxic, safe materials",
                    "10-year warranty coverage"
                  ]
                },
                {
                  icon: <Box size={16} />,
                  title: "Water Tank Waterproofing",
                  desc: "Food-grade safe waterproofing for overhead and underground water tanks with guaranteed results.",
                  features: [
                    "Complete seepage prevention",
                    "Mold and fungus protection",
                    "Non-toxic, safe materials",
                    "10-year warranty coverage"
                  ]
                },
                {
                  icon: <Home size={16} />,
                  title: "Wall Dampness Treatment",
                  desc: "Eliminate wall dampness and seepage with injection grouting and surface treatment methods.",
                  features: [
                    "Permanent dampness elimination",
                    "Injection grouting technology",
                    "Paint-ready surface finish",
                    "Health-safe environment"
                  ]
                },
                {
                  icon: <Building2 size={16} />,
                  title: "New Construction Waterproofing",
                  desc: "Preventive waterproofing during construction phase for long-term structural protection.",
                  features: [
                    "Permanent dampness elimination",
                    "Injection grouting technology",
                    "Paint-ready surface finish",
                    "Health-safe environment"
                  ]
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300"
                >
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    {service.icon}
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">

                        <span
                          className="bg-blue-100 text-blue-600 p-1 rounded-full mt-0.5 "><Check size={14} /></span>

                        {feature}

                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            </div>

          </div>
        </section>



        {/* ================= DETAILED SERVICE SECTIONS ================= */}
        {detailedServices.map((service, index) => (
          <ServiceDetail
            key={index}
            service={service}
            index={index}
            openInspection={() => setIsInspectionOpen(true)}
          />
        ))}

        {/* ================= OUR PROCESS ================= */}
        <section className="bg-[#eaf3ff] py-28">
          <div className="max-w-7xl mx-auto px-6 text-center">

            <p className="text-blue-600 text-xs font-semibold tracking-widest mb-4">
              OUR PROCESS
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-20">
              4-Step Waterproofing Approach
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {[
                {
                  icon: <Search size={20} />,
                  number: "01",
                  title: "Site Inspection",
                  desc: "Thorough assessment of the affected area to identify source and extent of water damage."
                },
                {
                  icon: <Stethoscope size={20} />,
                  number: "02",
                  title: "Problem Diagnosis",
                  desc: "Expert analysis to determine the right waterproofing method for your specific situation."
                },
                {
                  icon: <PaintBucket size={20} />,
                  number: "03",
                  title: "Material Application",
                  desc: "Professional application using premium grade waterproofing materials and techniques."
                },
                {
                  icon: <CheckCircle size={20} />,
                  number: "04",
                  title: "Final Quality Check",
                  desc: "Rigorous testing and inspection to ensure complete waterproof protection."
                }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center h-full">

                  {/* ICON */}
                  <div className="aspect-square w-14 md:w-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md mb-8">
                    {step.icon}
                  </div>

                  {/* CARD */}
                  <div className="bg-white rounded-xl px-8 py-10 shadow-md text-center w-full h-full flex flex-col justify-between">
                    <p className="text-blue-600 font-semibold text-sm mb-3">
                      {step.number}
                    </p>

                    <h3 className="font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          </div>
        </section>


        { /*================WHY OUR SERVICES==============*/}
        <section className="bg-[#03183d] py-24 text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-16">
              Why Our Services Stand Out
            </h2>

            {/*features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                {
                  icon: <Award size={22} />,
                  title: "10+ Years Experience",
                  desc: "Decade of expertise in residential and commercial waterproofing projects."
                },
                {
                  icon: <Users size={22} />,
                  title: "Skilled Labor Team",
                  desc: "Trained professionals ensuring precision and quality in every project."
                },
                {
                  icon: <Package size={22} />,
                  title: "Premium Materials",
                  desc: "Only top-grade waterproofing materials from trusted manufacturers."
                },
                {
                  icon: <ShieldCheck size={22} />,
                  title: "Warranty-Backed Solutions",
                  desc: "Confidence in our work with comprehensive warranty coverage."
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">

                  {/* Icon Circle */}
                  <div className="aspect-square w-16 rounded-full flex items-center justify-center mb-6
                    *: bg-blue-600/20 border border-blue-400/40
                    shadow-[0_0_25px_rgba(59,130,246,0.35)]">
                    <div className="text-blue-300">
                      {item.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-lg mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-blue-100/80 text-sm leading-relaxed max-w-[260px]">
                    {item.desc}
                  </p>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= REAL RESULTS ================= */}
        <section className="bg-[#f4f6f8] py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">

            <p className="text-blue-600 text-xs font-semibold tracking-widest mb-4">
              REAL RESULTS
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-16">
              Real Results, Proven Protection
            </h2>

            <div className="bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.08)] overflow-hidden text-left">

              {/*  Image */}
              <div className="relative">
                <img
                  src="/before-after-waterproofing.jpg"
                  alt="Terrace Waterproofing Before and After"
                  className="w-full aspect-[4/5] md:aspect-[4/3] object-cover"
                />

                {/*before/after overlay */}
                <div className="absolute bottom-0 left-0 w-full grid grid-cols-2">
                  <div className="bg-[#c8c98a] text-white text-lg md:text-2xl font-bold py-3 md:py-5 text-center uppercase tracking-wide">
                    BEFORE
                  </div>

                  <div className="bg-[#c8c98a] text-white text-lg md:text-2xl font-bold py-3 md:py-5 text-center uppercase tracking-wide">
                    AFTER
                  </div>
                </div>
              </div>
              <div className="px-8 py-10">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  Terrace Waterproofing — Before & After
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Complete terrace restoration with brickbat coba waterproofing.
                  Cracks sealed, surface protected for 15+ years.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/*=============CTA=============*/}
        <section className="bg-[#d6e3f5] py-28 relative">

          <div className="max-w-3xl mx-auto px-6 text-center">

            {/* Small Label */}
            <div className="flex items-center justify-center gap-2 text-blue-600 text-xs font-semibold tracking-widest mb-6">
              <MapPin size={14} />
              SERVICE AREA
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Serving Across Bangalore
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-base">
              We provide waterproofing services across residential societies,
              independent houses, commercial buildings, and government projects
              throughout Bangalore.
            </p>

          </div>

        </section>
      </main>
      <LeakageCTA />
      <Footer />
      <InspectionModal
        open={isInspectionOpen}
        onClose={() => setIsInspectionOpen(false)}
      />
      <FloatingActions hide={isInspectionOpen} />
    </>
  );
}