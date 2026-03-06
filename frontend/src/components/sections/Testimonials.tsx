
import Container from "../layout/Container";
import { Star } from "lucide-react";

export default function Testimonials() {

  const reviews = [
    {
      text: "Excellent work on our society terrace. No leakage even after heavy monsoon. Highly recommended!",
      name: "Rajesh Patil",
      location: "Pune",
    },
    {
      text: "Professional team, quality materials, and delivered on time. Our bathroom leakage is completely fixed.",
      name: "Sunita Deshmukh",
      location: "Mumbai",
    },
    {
      text: "We got brickbat coba done for our bungalow terrace. Great quality work at reasonable price.",
      name: "Amit Kulkarni",
      location: "Nagpur",
    },
    {
      text: "The china mosaic work on our terrace looks beautiful and no more water seepage. Very satisfied!",
      name: "Priya Sharma",
      location: "Nashik",
    },
  ];
  return (
    <section id="testimonials" className="bg-[#cfe0f5] py-20">
      <Container>
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Client Feedback
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mt-2">What Our Clients Say
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 text-blue-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-sm text-gray-600 mb-6 italic">
                "{review.text}"
              </p>

              <div>
                <p className="font-semibold text-[#0f172a]">
                  {review.name}
                </p>
                <p className="text-xs text-gray-500">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}