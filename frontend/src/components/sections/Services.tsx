
import Container from "../layout/Container";
import { Check } from "lucide-react"


export default function Services() {
  const services = [
    {
      title: "Brickbat Coba Waterproofing",
      desc: "Traditional and highly effective brickbat coba treatment for terrace waterproofing that lasts for decades.",
      img: "/services/brickbat.jpeg",
      features: [
        "Long-lasting protection for 15+ years",
        "Excellent crack resistance",
        "Natural heat insulation",
        "Cost-effective traditional method",
      ]
    },
    {
      title: "China Mosaic Treatment",
      desc: "Decorative and waterproof china mosaic application that protects terraces while adding visual appeal.",
      img: "/services/china.jpeg",
      features: [
        "Beautiful decorative finish",
        "Superior heat reflection",
        "Waterproof and weatherproof",
        "Low maintenance solution",
      ]
    },
    {
      title: "Khoba Waterproofing",
      desc: "Specialized khoba waterproofing for external walls and surfaces to prevent dampness and seepage.",
      img: "/services/khoba.jpeg",
      features: [
        "Complete seepage prevention",
        "Mold and fungus protection",
        "Non-toxic, safe materials",
        "10-year warranty coverage",
      ]
    },
    {
      title: "Terrace Leakage Repair",
      desc: "Expert diagnosis and repair of terrace leakage problems using advanced waterproofing techniques.",
      img: "/services/terrace.jpg",
      features: [
        "Permament dampness elimination",
        "Injection grouting technology",
        "Paint-ready surface finish",
        "Health-safe environment",
      ]
    },
    {
      title: "Bathroom Waterproofing",
      desc: "Complete bathroom waterproofing solutions to prevent leakage and protect structural integrity.",
      img: "/services/bathroom.jpeg",
      features: [
        "Complete seepage prevention",
        "Mold and fungus protection",
        "Non-toxic, safe materials",
        "10-year warranty coverage",
      ]
    },
    {
      title: "Water Tank Waterproofing",
      desc: "Internal and external water tank waterproofing to prevent leakage and contamination.",
      img: "/services/watertank.jpg",
      features: [
        "Permanent dampness elimination",
        "Injection grouting technology",
        "Paint-ready surface finish",
        "Health-safe environment",
      ]
    },
  ];

  return (
    <section className="bg-[#f8fafc] py-20">
      <Container>
        {/*Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            What we do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mt-2">Our Services
          </h2>
        </div>

        {/*Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (

            <div key={index}
              className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">

              <div className="relative h-60 md:h-64 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#0f172a] mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  {service.desc}
                </p>

                <ul className="space-y-2 mt-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600 gap-3">
                      <span className="bg-blue-100 text-blue-600 p-1 rounded-full mt-0.5"><Check size={14} /></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        </div>

      </Container>

    </section>
  );
}