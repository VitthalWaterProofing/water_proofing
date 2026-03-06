import Container from "../layout/Container";
import { useState } from "react";

export default function Projects() {
  const categories = ["All", "Terrace", "Bathroom", "Tank", "Commercial"];

  const projects = [
    {
      img: "/projects/commercial.jpg",
      category: "Terrace",
    },

    {
      img: "/services/brickbat.jpeg",
      category: "Commercial",
    },
    {
      img: "/projects/terrace.jpg",
      category: "Terrace",
    },
    {
      img: "/projects/wall.jpg",
      category: "Commercial",
    },
    {
      img: "/projects/bathroom.jpg",
      category: "Bathroom",
    },
    {
      img: "/projects/industrial.jpg",
      category: "Commercial",
    },
    {
      img: "/services/khoba.jpeg",
      category: "Terrace",
    },

    {
      img: "/services/watertank.jpg",
      category: "Tank",
    },

  ];

  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

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
          {filtered.map((project, index) => (
            <div
              key={index}
              className="w-full h-48 sm:h-56 lg:h-60 overflow-hidden rounded-xl"
            >
              <img
                src={project.img}
                alt="Project"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </Container>

    </section>
  );
}