import Container from "../layout/Container";
import { MapPin, Phone, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [problem, setProblem] = useState("");

  const handleSubmit = () => {

    //if all fields are empty
    if(!name.trim() && !phone.trim() && !location.trim() && (!problem || problem === "Select Problem Type") ){
      alert("Enter details");
      return;
    }
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    if (!phone.trim()) {
      alert("Phone number is required");
      return;
    }
    if (phone.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }

    if (!location.trim()) {
      alert("Location is required");
      return;
    }

    if (!problem || problem === "Select Problem Type") {
      alert("Please select problem type");
      return;
    }

    const message = `New Enquiry: 
    Name: ${name}
    Phone: ${phone}
    Location: ${location}
    Problem: ${problem}`;

    const whatsappUrl = `https://wa.me/919867233817?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Left Form */}
          <div className="space-y-4 w-full md:max-w-md">

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // remove non-numbers
                if (value.length <= 10) {
                  setPhone(value);
                }
              }}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Your Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={problem}
              onChange={(e) => setProblem(e.target.value)}

              className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select Problem Type</option>
              <option>Terrace Leakage</option>
              <option>Bathroom Leakage</option>
              <option>Water Tank Issue</option>
              <option>Wall Dampness</option>
            </select>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white py-3 rounded-xl font-semibold shadow-md transition mt-5">
              <Send size={18} className="inline mr-2" />Send Enquiry via WhatsApp
            </button>


          </div>

          {/* Right Info Cards */}
          <div className="space-y-6">

            <div className="bg-gray-100 p-6 rounded-2xl hover:shadow-md transition">
              <h3 className="font-semibold text-[#0f172a] mb-2">
                <MapPin className="inline mr-2" size={17} /> Our Office
              </h3>
              <p className="text-sm text-gray-600">

                Pandarinath Vitthal Waterproofing Agency<br />
                Bangalore, India
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-2xl hover:shadow-md transition">
              <h3 className="font-semibold text-[#0f172a] mb-2">
                <Phone className="inline mr-2" size={17} />Contact Info
              </h3>
              <p className="text-sm text-gray-600">
                Phone: +91 98672 33817<br />
                WhatsApp: +91 98672 33817
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-2xl hover:shadow-md transition">
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