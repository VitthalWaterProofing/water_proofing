import Container from "../layout/Container";

import { MapPin, Phone, Clock, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import api from "../../services/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    serviceRequested: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      await api.post('/leads', formData);
      setIsSuccess(true);
      setFormData({
        customerName: "",
        email: "",
        phone: "",
        serviceRequested: "",
        message: ""
      });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setErrorMsg(err.response?.data?.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
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
          <form onSubmit={handleSubmit} className="space-y-4 w-full md:max-w-md">
            
            {isSuccess && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 border border-green-200">
                <CheckCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Thank you! Your enquiry has been received. Our team will contact you shortly.</p>
              </div>
            )}
            
            {errorMsg && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm">
                {errorMsg}
              </div>
            )}

            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Your Name *"
              required
              className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address *"
              required
              className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number *"
              required
              className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="serviceRequested"
              value={formData.serviceRequested}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Problem Type *</option>
              <option value="Terrace Leakage">Terrace Leakage</option>
              <option value="Bathroom Leakage">Bathroom Leakage</option>
              <option value="Water Tank Issue">Water Tank Issue</option>
              <option value="Wall Dampness">Wall Dampness</option>
              <option value="Other">Other Issues</option>
            </select>
            
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Provide details about the issue... *"
              required
              rows={4}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full text-white py-3 rounded-xl font-semibold shadow-md transition flex items-center justify-center gap-2 ${
                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-[#1e3a8a] hover:bg-[#1e40af]'
              }`}
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <><Send size={18} /> Submit Enquiry</>
              )}
            </button>
            
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">Or contact us directly via</span>
              <a href="https://wa.me/9867233817" target="_blank" rel="noreferrer" className="block mt-2 text-[#25D366] font-medium hover:underline">
                WhatsApp Chat
              </a>
            </div>

          </form>

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