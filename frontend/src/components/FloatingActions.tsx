import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Phone, X } from "lucide-react";

type Props = {
  hide?: boolean;
};

export default function FloatingActions({ hide }: Props) {
  const [isWhatsappFormOpen, setIsWhatsappFormOpen] = useState(false);

  const [waForm, setWaForm] = useState({
    name: "",
    phone: "",
    location: "",
    problem: "",
  });

  if (hide) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWaForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();

    const name = waForm.name.trim();
    const rawPhone = waForm.phone.replace(/\D/g, "");
    const location = waForm.location.trim();
    const problem = waForm.problem.trim();

    const phone = rawPhone.startsWith("91") && rawPhone.length === 12
      ? rawPhone.slice(2)
      : rawPhone;

    const nameValid = name.length >= 2;
    const phoneValid = /^\d{10}$/.test(phone);
    const locationValid = location.length >= 2;
    const problemValid = problem.length >= 5;

    if (!nameValid) {
      alert("Please enter a valid name.");
      return;
    }

    if (!phoneValid) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!locationValid) {
      alert("Please enter your location.");
      return;
    }

    if (!problemValid) {
      alert("Please describe your problem.");
      return;
    }

    const message = [
      `Hello, my name is ${name}.`,
      ``,
      `I want to enquire about waterproofing services.`,
      ``,
      `Phone: ${phone}`,
      `Location: ${location}`,
      `Problem: ${problem}`,
    ].join("\n");

    const url = `https://wa.me/919867233817?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    setIsWhatsappFormOpen(false);
    setWaForm({
      name: "",
      phone: "",
      location: "",
      problem: "",
    });
  };

  return (
    <>
      {/* Phone button */}
      <a
        href="tel:+919867233817"
        className="sm:hidden fixed bottom-6 left-6 bg-[#1e3a6d] hover:bg-[#16305c] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition z-50"
      >
        <Phone size={20} />
      </a>

      {/* WhatsApp floating button */}
      <button
        type="button"
        onClick={() => setIsWhatsappFormOpen(true)}
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1ebe5d] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transition z-50"
      >
        <FaWhatsapp size={18} />
      </button>

      {/* WhatsApp modal form */}
      {isWhatsappFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setIsWhatsappFormOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-[#1e3a6d] mb-2">
              WhatsApp Enquiry
            </h2>
            <p className="text-gray-600 mb-5 text-sm">
              Fill in your details and continue to WhatsApp.
            </p>

            <form onSubmit={handleWhatsAppSend} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={waForm.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#1e3a6d]"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={waForm.phone}
                inputMode="numeric"
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");

                  if (value.startsWith("91") && value.length > 10) {
                    value = value.slice(2);
                  }

                  setWaForm((prev) => ({
                    ...prev,
                    phone: value.slice(0, 10),
                  }));
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#1e3a6d]"
              />

              <input
                type="text"
                name="location"
                placeholder="Your Location"
                value={waForm.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#1e3a6d]"
              />

              <textarea
                name="problem"
                placeholder="Describe your problem"
                rows={4}
                value={waForm.problem}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#1e3a6d] resize-none"
              />

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-3 rounded-lg transition"
              >
                Send on WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}