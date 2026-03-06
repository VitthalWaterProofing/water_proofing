
import Footer from "../components/layout/Footer";
import { Target, Rocket, Users, ShieldCheck, BadgeCheck, Eye, Clock, CheckCircle, Star, Phone } from "lucide-react";

export default function AboutPage() {


  const timeline = [
    {
      "year": "2013",
      "title": "Company Founded",
      "description": "Started with a vision to provide quality waterproofing."
    },
    {
      "year": "2015",
      "title": "First Major Project",
      "description": "Completed our first large commercial project."
    },
    {
      "year": "2018",
      "title": "100+ Projects",
      "description": "Crossed 100 successful project completions."
    },
    {
      "year": "2021",
      "title": "Expanded Area",
      "description": "Extended services across Bangalore."
    },
    {
      "year": "2023",
      "title": "10+ Years",
      "description": "A decade of trusted waterproofing solutions."
    }
  ];
  return (
    <>


      <div className="pt-15">
        {/*1. hero section */}
        <section className="relative h-[60vh] md:h-[75vh] flex items-center justify-center text-center px-4">

          <img
            src="/about.png"
            alt="waterproofing about"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-blue-900/70"></div>

          <div className="relative z-10 text-white max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-4">
              10+ Years of Protecting Homes & Buildings
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/90">
              Delivering long-lasting waterproofing solutions with quality, trust, and commitment.
            </p>
          </div>

        </section>

        {/*2. our story */}
        <section className="py-16 md:py-20 px-4 md:px-20 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[45%_55%] gap-12 items-center">

            {/* Image */}
            <div className="w-full h-[300px] sm:h-[350px] md:h-[380px] lg:h-[420px] overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/founder.png"
                alt="founder"
                className="w-full h-full object-cover"
              />
            </div>

            {/*text */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Our Story</h2>

              <p className="text-gray-600 mb-4 text-sm md:text-base">Established over <b className="text-black">10 years ago</b>, Pandarinath Vitthal Waterproofing Agency has grown from a small local operation to one of the most trusted names in waterproofing across Bangalore. </p>

              <p className="text-gray-600 mb-4 text-sm md:text-base">With <b className="text-black">hundreds of satisfied clients</b> and projects ranging from residential homes to large commercial buildings, we bring unmatched expertise to every job.</p>

              <p className="text-gray-600 mb-4 text-sm md:text-base">Our <b className="text-black">quality-first approach</b> means we never compromise on materials or workmanship, ensuring your property stays protected for years to come.</p>
            </div>
          </div>
        </section>

        {/*3. journey */}
        <section className="py-16 bg-gray-100 px-4 md:px-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800">Our Journey</h2>
          <div className="relative max-w-3xl mx-auto">

            {/* Vertical Line */}
            <div className="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 w-[2px] bg-blue-300"
              style={{ top: '18px', bottom: '0' }}
            ></div>

            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative mb-10 flex items-start">

                  {/* Circle */}
                  <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-0 w-9 h-9 bg-blue-500 text-white text-sm font-semibold rounded-full flex items-center justify-center shadow-md z-10">
                    {item.year.slice(2)}
                  </div>

                  {/* Card */}
                  <div
                    className={`
              w-full ml-20 md:ml-0 md:w-[47%] bg-white p-5 rounded-2xl shadow-sm
              md:mt-5
              ${isEven ? "md:ml-auto md:pl-6" : "md:mr-auto md:pr-6"}
            `}
                  >
                    <p className="text-blue-500 font-semibold text-sm mb-1">{item.year}</p>
                    <h3 className="font-bold text-lg mb-1 text-gray-900">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>

                </div>
              );
            })}

          </div>
        </section>

        {/*4. mission vision */}

        <section className="py-16 bg-white px-4 md:px-20">
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-blue-100/40 p-8 rounded-2xl text-center min-h-[230px]">
              <div className="flex justify-center mb-4">
                <Target size={24} className="text-blue-500" />
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">
                Our Mission
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                Deliver long-lasting waterproofing solutions using quality materials,
                skilled workmanship, and honest service — protecting every property we touch.
              </p>
            </div>

            <div className="bg-blue-100/40 p-8 rounded-2xl text-center min-h-[230px]">
              <div className="flex justify-center mb-4">
                <Rocket size={24} className="text-blue-500" />
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">
                Our Vision
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                Become the most trusted and recommended waterproofing agency in the region,
                known for reliability, innovation, and customer satisfaction.
              </p>
            </div>

          </div>
        </section>

        {/*5. strength */}
        <section className="py-16 bg-gray-200 px-4 md:px-20">

          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-gray-800">Our Strengths
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

              {/*card 1*/}
              <div className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
                <div className="flex justify-center mb-3 text-blue-500">

                  <Users size={22} />
                </div>
                <h4 className="font-medium text-gray-800 text-sm mb-2">
                  Experienced Team
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Skilled professionals with years of field experience.
                </p>
              </div>

              {/*card 2*/}
              <div className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
                <div className="flex justify-center mb-3 text-blue-500">

                  <ShieldCheck size={22} />
                </div>
                <h4 className="font-medium text-gray-800 text-sm mb-2">
                  Quality Materials
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Only certified, tested waterproofing materials.
                </p>
              </div>
              {/*card 3*/}
              <div className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
                <div className="flex justify-center mb-3 text-blue-500">

                  <BadgeCheck size={22} />
                </div>
                <h4 className="font-medium text-gray-800 text-sm mb-2">
                  Warranty Support
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  5-10 year warranty on all our work.
                </p>
              </div>

              {/*card 4*/}
              <div className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
                <div className="flex justify-center mb-3 text-blue-500">

                  <Eye size={22} />
                </div>
                <h4 className="font-medium text-gray-800 text-sm mb-2">
                  Transparent Pricing
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  No hidden costs, clear project estimates.
                </p>
              </div>
              {/*card 5*/}
              <div className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
                <div className="flex justify-center mb-3 text-blue-500">

                  <Clock size={22} />
                </div>
                <h4 className="font-medium text-gray-800 text-sm mb-2">
                  On-Time Delivery
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  We respect deadlines and deliver on time.
                </p>
              </div>
            </div>
          </div>

        </section>

        {/*6. safety */}
        <section className="py-16 bg-white px-4 md:px-20">
          <div className="max-w-3xl mx-auto text-center">

            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-10">Safety & Work Standards</h2>
            <div className="space-y-4 text-left">

              {[
                "Safety gear compliance for all workers",
                "Professional-grade tools & equipment",
                "Quality inspections at every stage",
                "Standardized waterproofing process"
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg"
                >
                  <CheckCircle size={18} className="text-blue-500" />
                  <p className="text-gray-600 text-sm">{item}</p>
                </div>
              )
              )}

            </div>
          </div>

        </section>

        {/* 7. Trusted Section */}
        <section className="py-14 bg-gray-100 text-center">
          <div className="max-w-xl mx-auto">

            <div className="flex justify-center gap-1 mb-4 text-blue-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>

            <h3 className="text-xl font-semibold text-gray-800">
              Trusted by 500+ Clients
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Serving Residential & Commercial Clients Across Bangalore
            </p>

          </div>
        </section>

        {/* 8. CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#181a85] to-[#092788] text-center text-white px-4">
          <div className="max-w-2xl mx-auto">

            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Your Property Deserves Long-Term Protection.
            </h2>

            <p className="text-blue-100 text-sm mb-8">
              Let our experienced team safeguard your investment.
            </p>

            <button className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-lg text-sm font-medium">
              <Phone size={16} className="inline mr-2" />
              Contact Us Today
            </button>

          </div>
        </section>
      </div>
      <Footer />


    </>

  )
}