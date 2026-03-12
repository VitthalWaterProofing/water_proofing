import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";


export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center text-white pt-24"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg-image.png')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b254f]/95 via-[#1e3a6d]/80 to-[#1e3a6d]/50" />
      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 py-20">
        <div className="max-w-3xl">

          {/* Badge */}
          <span className="inline-block bg-[#2c5aa0] text-sm px-5 py-2 rounded-full mb-6">
            ✓ 10+ Years Trusted Service
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-6">
            Permanent <br />
            Waterproofing <br />
            Solutions
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-gray-200 mb-4">
            Brickbat Coba | China Mosaic | Khoba Waterproofing | Terrace Treatment
          </p>

          <p className="text-sm sm:text-base text-gray-300 max-w-xl mb-8">
            Protecting homes and buildings across Bangalore with industry-leading waterproofing solutions. Government & private projects completed successfully.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">

            <a href="tel:+919867233817" className="w-full sm:w-auto">
              <button className="min-w-[220px] flex items-center justify-center gap-2 bg-[#1443a8] hover:bg-[#1d4ed8] px-6 py-3 rounded-lg font-semibold transition">
                <Phone size={16} /> Get Free Inspection
              </button>
            </a>

            <a
              href="https://wa.me/919867233817?text=Hello%2C%0A%0AI%20would%20like%20to%20enquire%20about%20waterproofing%20services.%0A%0AName%3A%0ALocation%3A%0AProblem%20Type%3A%0APreferred%20Inspection%20Date%3A%0A%0ALooking%20forward%20to%20your%20response."
              target="_blank"
              className="w-full sm:w-auto"
            >
              <button className="min-w-[220px] flex items-center justify-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1e3a6d] transition">
                <FaWhatsapp size={18} />
                Send Enquiry
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}