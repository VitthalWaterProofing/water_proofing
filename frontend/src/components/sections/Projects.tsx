import Container from "../layout/Container";
import { useState, useEffect } from "react";
import api from "../../services/api";

interface Project {
  _id: string;
  images: string[];
  serviceType: {
    title: string;
    parentCategory?: string;
  };
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories] = useState<string[]>(["All", "Terrace", "Bathroom", "Tank", "Commercial"]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.serviceType?.parentCategory === active);

  return (
    <section className="bg-[#f8fafc] py-20">
      <Container>
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Our Work
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mt-2">Completed Projects
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition 
                    ${active === cat
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-blue-50"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>


            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((project) => (
                <div
                  key={project._id}
                  className="w-full h-48 sm:h-56 lg:h-60 overflow-hidden rounded-xl bg-gray-200"
                >
                  <img
                    src={project.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt="Project"
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}