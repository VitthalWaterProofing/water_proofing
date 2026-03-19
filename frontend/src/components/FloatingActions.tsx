import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";

type Props = {
  hide?: boolean;
  formData?: {
    customerName?: string;
    phone?: string;
    serviceRequested?: string;
    message?: string;
  };
};

export default function FloatingActions({ hide, formData }: Props) {
  if (hide) return null;

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    console.log("formData received:", formData);
    console.log("name:", formData?.customerName);
    console.log("phone:", formData?.phone);

    const name = formData?.customerName?.trim() || "";
    const rawPhone = formData?.phone?.replace(/\D/g, "") || "";

    // normalize: strip leading 91 if 12 digits
    const phone = rawPhone.startsWith("91") && rawPhone.length === 12
      ? rawPhone.slice(2)
      : rawPhone;

    // ✅ Validate here inside the handler with fresh values
    const nameValid = name.length >= 2;
    const phoneValid = /^\d{10}$/.test(phone);

    if (!nameValid || !phoneValid) {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        alert("Please fill in your Name and a valid 10-digit Phone number in the contact form first.");
      }, 400);
      return;
    }

    const message = [
      `Hello, my name is ${name}.`,
      ``,
      `I would like to enquire about waterproofing services.`,
      ``,
      `Mobile: ${phone}`,
      `Problem Type: ${formData?.serviceRequested || "Not specified"}`,
      `Preferred Inspection Date: Please suggest available slots`,
      
      `Please confirm availability.`,
    ].join("\n");

    const url = `https://wa.me/919867233817?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Phone (mobile only) */}

      <a
        href="tel:+919867233817"
        className="sm:hidden fixed bottom-6 left-6 bg-[#1e3a6d] hover:bg-[#16305c] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition z-50">
        <Phone size={20} />
      </a>

      {/* WhatsApp */}

      <a
        href="#"
        onClick={handleWhatsAppClick}
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1ebe5d] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transition z-50"
      >
        <FaWhatsapp size={18} />
      </a>
    </>
  );
}