
import Footer from "../components/layout/Footer";
import LeakageCTA from "../components/sections/LeakageCTA";
import { Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";



export default function ProjectsPage() {

  const [active, setActive] = useState("All");

  const categories = ["All", "Residential", "Commercial", "Terrace", "Bathroom", "Water Tank"];


  const projects = [
    {
      title: "Residential Terrace Waterproofing – Bangalore",
      category: ["Residential", "Terrace"],
      location: "Bangalore, Karnataka",
      desc: "Complete terrace leakage repair using brickbat coba and waterproof membrane coating.",
      img: "/projects/terrace.jpg",
    },
    {
      title: "Commercial Building Roof Treatment – Bangalore",
      category: ["Commercial"],
      location: "Bangalore, Karnataka",
      desc: "Applied high-performance waterproof coating for long-term protection against heavy rainfall.",
      img: "/projects/commercial.jpg",
      status: "Ongoing",
    },
    {
      title: "Society Terrace Renovation – Bangalore",
      category: ["Residential", "Terrace"],
      location: "Bangalore, Karnataka",
      desc: "Large-scale terrace waterproofing project covering 15,000 sq. ft.",
      img: "/projects/society.jpg",
    },
    {
      title: "Bathroom Leakage Repair – Bangalore",
      category: ["Bathroom"],
      location: "Bangalore, Karnataka",
      desc: "Advanced chemical injection treatment to stop seepage without tile removal.",
      img: "/projects/bathroom.jpg",
      status: "Ongoing",
    },
    {
      title: "Overhead Water Tank Waterproofing – Bangalore",
      category: ["Water Tank"],
      location: "Bangalore, Karnataka",
      desc: "Internal tank waterproofing using food-grade waterproof coating system.",
      img: "/projects/watertank.jpg",
    },
    {
      title: "Wall Dampness Treatment – Bangalore",
      category: ["Residential"],
      location: "Bangalore, Karnataka",
      desc: "Exterior wall crack sealing and waterproof plaster protection.",
      img: "/projects/wall.jpg",
    },
    {
      title: "Industrial Shed Waterproofing – Bangalore",
      category: ["Commercial"],
      location: "Bangalore, Karnataka",
      desc: "Industrial roof wateproofing with heat-reflective membrane application.",
      img: "/projects/industrial.jpg",
      status: "Ongoing",
    },
    {
      title: "New Construction Waterproofing – Bangalore",
      category: ["Residential", "Commercial"],
      location: "Bangalore, Karnataka",
      desc: "Full building waterproofing during construction stage for long-term durability.",
      img: "/projects/newConstruction.jpg",
    },
  ];

  const filteredProjects =
    active === "All"
      ? projects
      : projects.filter((project) =>
        project.category.includes(active)
      );



  const transformations = [
    {
      img: "/projects/before-after-1.png",
      title: "Terrace Leakage Repair",
      desc: "Waterproofing completed using premium-grade materials and expert supervision."
    },
    {
      img: "/projects/before-after-2.png",
      title: "Bathroom Seepage Fix",
      desc: "Waterproofing completed using premium-grade materials and expert supervision."
    },
    {
      img: "/projects/before-after-3.png",
      title: "Wall Dampness Treatment",
      desc: "Waterproofing completed using premium-grade materials and expert supervision."
    }
  ];
  return (


    <>
      {/*======================= hero section============ */}
      <section className="bg-[#f8fafc] pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6">

        <div className="max-w-4xl mx-auto text-center">

          {/* Label */}
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4">
            Our Projects
          </p>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-6">
            Ongoing & Completed <br />
            Waterproofing Projects
          </h1>

          {/* Description */}
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto mb-10">
            Explore our successfully executed residential and commercial waterproofing
            projects across Bangalore. From terrace leakage repairs to large-scale
            society waterproofing, we deliver durable and long-lasting solutions.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <a href="tel:+919867233817" >
              <button className="flex items-center justify-center gap-2 bg-[#1a1a83] text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto">
                <Phone size={16} />
                Get Free Inspection
              </button>
            </a>

            <a href="https://wa.me/9867233817">
              <button className="flex items-center justify-center gap-2 border border-[#1d1d81] px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition w-full sm:w-auto ">
                <FaWhatsapp size={20} />
                WhatsApp Now
              </button>
            </a>

          </div>

        </div>

      </section>


      {/*======================= projects section ============ */}
      <section className="bg-[#f0f1f3] px-4 sm:px-6 pb-16">
        < div className="flex flex-wrap justify-center gap-3 mb-12">

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm transition mt-10
                ${active === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-50 hover:bg-gray-200"
                }`}
            >
              {cat === "All" ? "All Projects" : cat}
            </button>
          ))}

        </div>

        {/* PROJECT GRID */}

        <div className="max-w-[1150px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredProjects.map((project, index) => (

            <div
              key={index}
              className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >

              {/* IMAGE */}

              <div className="relative h-60 md:h-64 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                />
              </div>


              {/* CONTENT */}

              <div className="p-4">

                <div className="flex gap-2 mb-2 flex-wrap">

                  {project.category.map((cat, i) => (

                    <span
                      key={i}
                      className="text-[11px] bg-blue-100 text-blue-800 px-2 py-[2px] rounded-full font-medium"
                    >
                      {cat}
                    </span>

                  ))}

                  {
                    project.status === "Ongoing" && (
                      <span className="text-xs text-orange-500 font-medium ml-auto">
                        Ongoing
                      </span>
                    )
                  }



                </div>

                <h3 className="font-semibold text-[#0f172a] text-lg mb-1">
                  {project.title}
                </h3>

                <p className="text-xs text-gray-500 mb-2">
                  <MapPin size={16} className="inline mr-1" />
                  {project.location}
                </p>

                <p className="text-sm text-gray-600">
                  {project.desc}
                </p>

              </div>

            </div>

          ))}

        </div>
      </section >

      {/*=========before-after ===============*/}
      <section className="bg-[#f8fafc] py-16 md:py-20 px-4 sm:px-6">

        {/* Heading */}
        <div className="max-w-6xl mx-auto text-center">

          <p className="text-xs sm:text-sm font-semibold tracking-widest text-blue-600 uppercase mb-3">
            Transformations
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
            Before & After Results
          </h2>

          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto mb-10 md:mb-12">
            See the transformation achieved through our professional waterproofing services.
          </p>

        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {transformations.map((item, index) => (

            <div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >

              <div className="relative h-60 md:h-64 overflow-hidden">

                <img
                  src={item.img}
                  className="w-full h-full object-cover"
                  alt={item.title}
                />

                <span className="absolute top-2 left-2 text-xs bg-black text-white px-2 py-1 rounded-full">
                  Before
                </span>

                <span className="absolute top-2 right-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                  After
                </span>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full">
                  ↔
                </div>

              </div>

              <div className="p-4 text-center">
                <h3 className="font-semibold text-[#0f172a] mb-1">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.desc}
                </p>
              </div>

            </div>

          ))}

        </div>


      </section>


      {/*============stats section================*/}

      <section className="bg-gradient-to-r from-[#0f2a44] to-[#122f4d] py-16 md:py-20 px-4 sm:px-6 text-center text-white">

        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Our Work Speaks for Itself
          </h2>

          {/* Subtitle */}
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-12 md:mb-14">
            Delivering consistent waterproofing excellence across <br />Bangalore.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

            {/* Stat */}
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400">
                120+
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-2">
                Projects Completed
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400">
                10+
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-2">
                Years of Experience
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400">
                95%
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-2">
                Client Satisfaction
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400">
                50+
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-2">
                Residential Societies Served
              </p>
            </div>

          </div>

        </div>

      </section>

      <LeakageCTA />
      <Footer />
    </>
  );
}