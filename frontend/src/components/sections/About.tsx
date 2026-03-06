import {
  Award,
  ShieldCheck,
  Users,
  Wrench,
  BadgeCheck,
} from "lucide-react";

import Container from "../layout/Container";

export default function About() {
  return (
    <section className="bg-white py-20">
      <Container>

        {/*Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/*Left content - image*/}
          <div className="relative w-full h-[420px] lg:h-[450px]">
            <img src="/about.png"
              alt="Waterproofing work"
              className="w-full h-full object-cover rounded-2xl shadow-lg" />
          </div>
          {/*Right content - text*/}
          <div>
            {/*small label*/}
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
              About Us
            </p>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-6">
              Your Trusted Waterproofing Partner
            </h2>

            {/* Paragraph */}
            <p className="text-gray-600 leading-relaxed mb-8">
              Pandarinath Vitthal Waterproofing Agency has been delivering
              premium waterproofing solutions for over a decade. We specialize
              in residential and commercial projects, using only the highest
              quality materials and skilled professionals to ensure lasting
              protection for your property.
            </p>

            {/* Features list */}
            <div className="space-y-5">

              <Feature icon={<Award size={18} />} text="10+ Years Experience" />
              <Feature icon={<ShieldCheck size={18} />} text="Government & Private Projects" />
              <Feature icon={<Users size={18} />} text="Skilled Labour Team" />
              <Feature icon={<Wrench size={18} />} text="Quality Materials Only" />
              <Feature icon={<BadgeCheck size={18} />} text="Warranty Assurance" />

            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}

/* Reusable Feature Item */
function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
        {icon}
      </div>
      <p className="text-gray-700 font-medium">{text}</p>
    </div>
  );
}