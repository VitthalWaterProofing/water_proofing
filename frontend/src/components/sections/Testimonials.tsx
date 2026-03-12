import Container from "../layout/Container";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../services/api";

interface Testimonial {
  _id: string;
  customerName: string;
  rating: number;
  reviewText: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimonials');
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cards */}
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4 text-blue-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                  ))}
                </div>

                <p className="text-sm text-gray-600 mb-6 italic">
                  "{review.reviewText}"
                </p>

                <div>
                  <p className="font-semibold text-[#0f172a]">
                    {review.customerName}
                  </p>
                </div>
              </div>
            ))}
            
            {reviews.length === 0 && (
              <div className="col-span-full py-10 text-center text-gray-500">
                More testimonials coming soon.
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}