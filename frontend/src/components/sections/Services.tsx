import Container from "../layout/Container";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../services/api";

interface ServiceType {
  _id: string;
  title: string;
  shortDescription: string;
  coverImage: string;
  benefits: string[];
  isActive: boolean;
}

export default function Services() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        setServices(response.data.filter((s: ServiceType) => s.isActive));
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="bg-[#f8fafc] py-20">
      <Container>
        {/*Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            What we do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mt-2">Our Services
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/*Services grid */}
            {services.map((service) => (
              <div key={service._id}
                className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">

                <div className="relative h-60 md:h-64 overflow-hidden">
                  <img
                    src={service.coverImage}
                    alt={service.title}
                    className="w-full h-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#0f172a] mb-2">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-2 mt-4">
                    {service.benefits.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600 gap-3">
                        <span className="bg-blue-100 text-blue-600 p-1 rounded-full mt-0.5"><Check size={14} /></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}