
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";

type Props = {
  hide?: boolean;
};

export default function FloatingActions({ hide }: Props) {
  if (hide) return null;

  return (
    <>
      {/* Phone - Mobile Only (Left Side) */}
      <a
        href="tel:+919867233817"
        className="sm:hidden fixed bottom-6 left-6 bg-[#1e3a6d] hover:bg-[#16305c] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition z-50"
      >
        <Phone size={20} />
      </a>

      {/* WhatsApp - Always Visible (Right Side) */}
      <a
        href="https://wa.me/9867233817"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1ebe5d] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transition z-50"
      >
        <FaWhatsapp size={18} />
      </a>
    </>
  );
}
