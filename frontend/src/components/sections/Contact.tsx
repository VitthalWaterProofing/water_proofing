import Container from "../layout/Container";

import { MapPin, Phone, Clock, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import api from "../../services/api";
import FloatingActions from "../FloatingActions";

export default function Contact() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    serviceRequested: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");



  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "customerName" && value.trim().length < 2) {
      error = "Name must be at least 2 characters.";
    }
    if (name === "email" && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      error = "Please enter a valid email address.";
    }
    if (name === "phone") {
      if (!/^\d{10}$/.test(value)) {
        error = "Valid 10-digit phone number is required.";
      } else if (!/^[6-9]\d{9}$/.test(value)) {
        error = "Enter a valid mobile number (must start with 6, 7, 8 or 9).";
      }
    }
    if (name === "serviceRequested" && value === "") {
      error = "Please select a service type.";
    }
    if (name === "message" && value.trim().length < 10) {
      error = "Message must be at least 10 characters.";
    }
    return error;
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, '');
      const noLeadingZero = digitsOnly.replace(/^0+/, '');
      const formattedValue = noLeadingZero.slice(0, 10);
      setFormData({ ...formData, [name]: formattedValue });
      if (formErrors[name]) setFormErrors({ ...formErrors, [name]: validateField(name, formattedValue) });
      return;
    }

    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

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

            <div>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Your Name *"
                required
                className={`w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${formErrors.customerName ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'}`}
              />
              {formErrors.customerName && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.customerName}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                required
                className={`w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${formErrors.email ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'}`}
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.email}</p>}
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number *"
                required
                className={`w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${formErrors.phone ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'}`}
              />
              {formErrors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.phone}</p>}
            </div>

            <div>
              <select
                name="serviceRequested"
                value={formData.serviceRequested}
                onChange={handleChange}
                required
                className={`w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${formErrors.serviceRequested ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'}`}
              >
                <option value="" disabled>Select Problem Type *</option>
                <option value="Terrace Leakage">Terrace Leakage</option>
                <option value="Bathroom Leakage">Bathroom Leakage</option>
                <option value="Water Tank Issue">Water Tank Issue</option>
                <option value="Wall Dampness">Wall Dampness</option>
                <option value="Other">Other Issues</option>
              </select>
              {formErrors.serviceRequested && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.serviceRequested}</p>}
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Provide details about the issue... *"
                required
                rows={4}
                className={`w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 resize-none ${formErrors.message ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'}`}
              />
              {formErrors.message && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-3 rounded-xl font-semibold shadow-md transition flex items-center justify-center gap-2 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-[#1e3a8a] hover:bg-[#1e40af]'
                }`}
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <><Send size={18} /> Submit Enquiry</>
              )}
            </button>

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
      <FloatingActions
        formData={formData}
      />
    </section>
  );
}