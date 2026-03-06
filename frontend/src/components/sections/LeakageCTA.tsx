import Container from "../layout/Container";
import { Phone } from "lucide-react";


export default function LeakageCTA() {
  return (
    <section className="bg-gradient-to-r from-[#1e3a8a] to-[#0a2375] py-20 text-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Leakage Problem?
          </h2>
          <p className="text-blue-100 mb-8">Book your free site visit today and get a professional <br />assessment from our expert team.</p>

          <a href="tel:+9867233817"
            className="inline-flex items-center gap-2 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1e3a8a] transition">
            <Phone size={18} />
            Call Now
          </a>
        </div>
      </Container>
    </section>
  );
}