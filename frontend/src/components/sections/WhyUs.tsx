import { Award, Gem, ShieldCheck, IndianRupee, Clock } from "lucide-react";

import Container from "../layout/Container";


export default function WhyUs() {
  const features = [
    {
      icon: <Award size={28} />,
      title: "10+ Years Experience",
      desc: "Proven expertise across hundreds of successful projects",
    },
    {
      icon: <Gem size={28} />,
      title: "Quality Materials",
      desc: "Only premium-grade waterproofing products and materials",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Warranty Support",
      desc: "Comprehensive warranty on all our waterproofing work",
    },
    {
      icon: <IndianRupee size={28} />,
      title: "Affordable Pricing",
      desc: "Competitive rates without compromising on quality",
    },
    {
      icon: <Clock size={28} />,
      title: "On-Time Completion",
      desc: "Committed to completing every project within deadline",
    },
  ];

  return (
    <section id="whyus" className="bg-white py-20">
      <Container>

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Our Promise
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mt-2">
            Why Choose Us
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-center">

              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="font-semibold text-[#0f172a] mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 max-w-[240px] mx-auto leading-relaxed min-h-[48px]">
                {item.desc}
              </p>

            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}