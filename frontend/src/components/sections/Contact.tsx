import Container from "../layout/Container";
import { MapPin, Phone, Clock, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-20">
      <Container>

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mt-2">
            Contact Us
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left Form */}
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Your Location"
              className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select Problem Type</option>
              <option>Terrace Leakage</option>
              <option>Bathroom Leakage</option>
              <option>Water Tank Issue</option>
              <option>Wall Dampness</option>
            </select>

            <button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white py-3 rounded-xl font-semibold shadow-md transition">
              <Send size={18} className="inline mr-2" />Send Enquiry via WhatsApp
            </button>

          </div>

          {/* Right Info Cards */}
          <div className="space-y-6">

            <div className="bg-gray-100 p-6 rounded-2xl">
              <h3 className="font-semibold text-[#0f172a] mb-2">
                <MapPin className="inline mr-2" size={17} /> Our Office
              </h3>
              <p className="text-sm text-gray-600">

                Pandarinath Vitthal Waterproofing Agency<br />
                Bangalore, India
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-2xl">
              <h3 className="font-semibold text-[#0f172a] mb-2">
                <Phone className="inline mr-2" size={17} />Contact Info
              </h3>
              <p className="text-sm text-gray-600">
                Phone: +91 98672 33817<br />
                WhatsApp: +91 98672 33817
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-2xl">
              <h3 className="font-semibold text-[#0f172a] mb-2">
                <Clock className="inline mr-2" size={17} />Working Hours
              </h3>
              <p className="text-sm text-gray-600">
                Mon – Sat: 8:00 AM – 7:00 PM<br />
                Sunday: By Appointment
              </p>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}