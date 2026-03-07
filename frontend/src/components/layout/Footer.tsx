import Container from "../layout/Container";
import { MapPin, Phone, MailIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f2d5c] text-white pt-16 pb-8">
      <Container>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Logo + About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Logo" className="w-10 h-10" />
              <div>
                <h3 className="font-semibold">Pandarinath Vitthal</h3>
                <p className="text-sm text-[#3999da]">
                  Waterproofing Agency
                </p>
              </div>
            </div>

            <p className="text-sm text-blue-200">
              10+ years of trusted waterproofing solutions for residential
              and commercial properties across Bangalore.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>Brickbat Coba</li>
              <li>China Mosaic</li>
              <li>Khoba Waterproofing</li>
              <li>Terrace Repair</li>
              <li>Bathroom Waterproofing</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="/" className="hover:text-blue-300">Home</a></li>
              <li><a href="/about" className="hover:text-blue-300">About</a></li>
              <li><a href="/services" className="hover:text-blue-300">Services</a></li>
              <li><a href="/projects" className="hover:text-blue-300">Projects</a></li>
              <li><a href="#contact" className="hover:text-blue-300">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Phone className="inline mr-2" size={15}/>+91 98672 33817</li>
              <li><MailIcon className="inline mr-2" size={15} />info@pvwaterproofing.com</li>
              <li><MapPin className="inline mr-2" size={15} />Bangalore, India</li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-blue-800 pt-6 text-center text-sm text-blue-300">
          © 2026 Pandarinath Vitthal Waterproofing Agency. All rights reserved.
        </div>

      </Container>
    </footer>
  );
}