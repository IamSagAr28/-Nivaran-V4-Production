import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Recycle, Heart, Users, Award } from "lucide-react";

export function InfoBlocks() {
  const cardData = [
    {
      icon: Recycle,
      title: "Pooja Waste Upcycling",
      description:
        "We specialize in upcycling pooja waste, repurposing discarded religious materials into high-quality, eco-friendly products including natural dyes, organic fertilizers, and artisanal crafts.",
    },
    {
      icon: Heart,
      title: "Cultural Preservation",
      description:
        "Transforming traditional practices into opportunities for positive social and environmental impact. We collaborate with temples, religious organizations, and local communities for culturally sensitive solutions.",
    },
    {
      icon: Users,
      title: "Community Empowerment",
      description:
        "We work with local communities, providing fair employment and skill development opportunities. Together, we're building a sustainable future through collaborative engagement.",
    },
    {
      icon: Award,
      title: "Circular Economy",
      description:
        "Creating a circular economy where waste is reimagined as a valuable resource. Our research-based approach ensures effective and culturally sensitive upcycling techniques.",
    },
  ];

  const [cards, setCards] = useState(cardData);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const updated = [...prev];
        updated.push(updated.shift());
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-[#dad7cd]/30">
      <div className="px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          {cards.map((block) => {
            const IconComponent = block.icon;

            return (
              <motion.div
                key={block.title}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-row items-start gap-6 bg-white rounded-2xl shadow-md hover:shadow-lg p-6"
              >
                {/* ICON */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-[#a3b18a]/40 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-[#4a3b2c]" />
                  </div>
                </div>

                {/* TEXT */}
                <div className="flex-1 text-[#4a3b2c]">
                  <h3 className="text-xl font-bold mb-1">{block.title}</h3>
                  <p className="text-base leading-relaxed">{block.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
