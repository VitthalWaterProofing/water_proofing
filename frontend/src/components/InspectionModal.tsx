import { Phone, ShieldCheck, Users, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InspectionModal({ open, onClose }: Props) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [problem, setProblem] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");


  const handleSubmit = () => {

    if (!name.trim() && !phone.trim() && !location.trim() && !date && (!problem || problem === "Select problem type")) {
      alert("Enter details");
      return;
    }

    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (!phone.trim()) {
      alert("Mobile number is required");
      return;
    }

    if (phone.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }

    if (!date) {
      alert("Please select inspection date");
      return;
    }
    if (!problem || problem === "Select problem type") {
      alert("Please select problem type");
      return;
    }

    const message = `Inspection Request:
Name: ${name}
Phone: ${phone}
Location: ${location}
Problem: ${problem}
Preferred Date: ${date}
Details: ${details}`;

    const whatsappUrl = `https://wa.me/919867233817?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-4 pt-10 sm:pt-0">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-[95%] max-w-md sm:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.25)]">

        {/* Header */}
        <div className="bg-[#0f2b4c] text-white px-6 py-4 flex items-start gap-3 rounded-t-2xl">

          <img
            src="/logo.png"
            alt="Pandarinath Vitthal"
            className="w-9 h-9 object-contain mt-1 shrink-0"
          />

          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">
              Book Free Site Inspection
            </h3>

            <p className="text-xs text-blue-100 mt-1">
              Schedule a professional waterproofing inspection with our expert team.
            </p>

            <p className="text-[11px] text-blue-200 italic mt-1">
              Protect your property before leakage damage spreads.
            </p>
          </div>

        </div>

        {/* Form */}
        <div className="p-5 sm:p-6 lg:p-7 space-y-4 pb-16 sm:pb-6">

          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) setPhone(value);
              }}
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">
              Location / Address
            </label>
            <input
              type="text"
              placeholder="Enter property location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Problem Type */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">
              Type of Problem
            </label>
            <select
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select problem type</option>
              <option>Terrace Leakage</option>
              <option>Bathroom Leakage</option>
              <option>Wall Dampness</option>
              <option>Water Tank Leakage</option>
              <option>Roof Crack Repair</option>
              <option>New Construction Waterproofing</option>
              <option>Other</option>

            </select>
          </div>

          {/* Date */}


          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">
              Preferred Inspection Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Details */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">
              Additional Details (Optional)
            </label>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe your leakage or waterproofing problem"
              rows={3}
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition">
            <FaWhatsapp size={16} />
            Book Inspection via WhatsApp
          </button>


          {/* Call Button */}
          <a href="tel:+919867233817" className="block">
            <button className="w-full border border-gray-300 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <Phone size={16} />
              Call Now
            </button>
          </a>

          {/* Bottom Features */}
          <div className="flex flex-wrap justify-center sm:justify-between gap-3 text-[11px] text-gray-500 pt-3 border-t mt-2">

            <span className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-[#3a3aec]" />
              Free Inspection
            </span>

            <span className="flex items-center gap-1">
              <Users size={12} className="text-[#3a3aec]" />
              Expert Team
            </span>

            <span className="flex items-center gap-1">
              <Clock size={12} className="text-[#3a3aec]" />
              10+ Years
            </span>

            <span className="flex items-center gap-1">
              <Phone size={12} className="text-[#3a3aec]" />
              Fast Response
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}