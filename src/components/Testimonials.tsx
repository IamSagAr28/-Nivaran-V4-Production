import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Mumbai",
      text: "Absolutely love my upcycled notebook! The quality is amazing and I feel good knowing I'm supporting sustainable practices. The craftsmanship is evident in every page.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Delhi",
      text: "Bought a tote bag as a gift and my friend was thrilled! It's sturdy, stylish, and the story behind it makes it even more special. Will definitely order again.",
      rating: 5
    },
    {
      name: "Anita Desai",
      role: "Bangalore",
      text: "The workshop I attended was eye-opening! Learning to create something beautiful from waste materials was inspiring. The team is passionate and knowledgeable.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-[#dad7cd]/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-3 text-[#344e41]">What Our Customers Say</h2>
          <p className="text-[#3a5a40]">Real stories from people who believe in sustainable living</p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#588157] text-[#588157]" />
                ))}
              </div>
              <p className="text-[#3a5a40] mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#a3b18a]/40 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-[#3a5a40]">{testimonial.name[0]}</span>
                </div>
                <div>
                  <h4 className="text-[#344e41]">{testimonial.name}</h4>
                  <p className="text-sm text-[#3a5a40]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
