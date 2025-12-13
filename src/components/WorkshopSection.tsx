import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Phone, Mail, Award, Lightbulb, Heart, ArrowRight, GraduationCap, Building2, Users } from 'lucide-react';

export const WorkshopSection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const highlights = [
    {
      title: "Hands-on Learning",
      description: "Engaging, practical sessions where you learn by doing. Transform waste into beautiful art.",
      icon: Lightbulb,
      color: "#F8D548" // Primary Yellow
    },
    {
      title: "Expert Guidance",
      description: "Learn from skilled artisans who are masters of upcycling. Get personalized tips.",
      icon: Award,
      color: "#DBB520" // Gold Yellow
    },
    {
      title: "Creative & Sustainable",
      description: "Focus on creativity, sustainability, and waste reduction. Make a positive impact.",
      icon: Heart,
      color: "#F8D548" // Primary Yellow
    }
  ];

  const pricingAudiences = [
    { name: 'Schools & Educational Institutions', icon: GraduationCap },
    { name: 'Colleges & Universities', icon: GraduationCap },
    { name: 'Residential Societies', icon: Users },
    { name: 'Corporate Groups', icon: Building2 }
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.25, 1, 0.35, 1],
        delay: index * 0.15,
      },
    }),
  };

  const contactRowVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.25, 1, 0.35, 1] },
    },
  };

  return (
    <>
      <style>{`
        @keyframes premiumFloat {
          0% { transform: translateY(0px); }
          25% { transform: translateY(-2px); }
          50% { transform: translateY(0px); }
          75% { transform: translateY(2px); }
          100% { transform: translateY(0px); }
        }
        .premium-float {
          animation: premiumFloat 9s ease-in-out infinite;
        }
        .soft-glow::after {
          content: "";
          position: absolute;
          inset: -12px;
          border-radius: 20px;
          background: radial-gradient(circle at 30% 30%, rgba(248,213,72,0.16), transparent 45%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 0;
        }
        .group:hover .soft-glow::after {
          opacity: 1;
        }
        .breathing-btn {
          will-change: transform;
        }
        .contact-row:hover .contact-icon {
          animation: iconPulse 0.6s ease-in-out;
        }
        .contact-row:hover .contact-text {
          transform: translateX(3px);
          transition: transform 0.25s ease-out;
        }
        .contact-underline {
          display: block;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease-out;
        }
        .contact-row:hover .contact-underline {
          transform: scaleX(1);
        }
        @keyframes iconPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
      <section
        id="workshops"
        ref={sectionRef}
        className="py-24 bg-gradient-to-b from-[#FFFEF5] via-[#FFFBF0] to-[#FFF6D1]/40 relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/workshops/workbg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFEF5]/90 via-[#FFFBF0]/85 to-[#FFF6D1]/80" />

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#F8D548]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#DBB520]/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center px-5 py-2 rounded-full mb-8 border shadow-sm" style={{ backgroundColor: '#4a3b2c' }}>
              <span className="text-[#F8D548] font-bold text-sm uppercase tracking-widest letter-spacing-wide">Learn With Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tight leading-tight relative inline-block" style={{ color: '#4a3b2c', fontWeight: 900 }}>
              Workshops & Training
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-[#F8D548] via-[#DBB520] to-[#F8D548] rounded-full mt-4"></span>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed font-normal tracking-wide mb-12" style={{ lineHeight: '1.75', marginBottom: '3rem', color: '#4a3b2c' }}>
              Join our expert-led sessions to master the art of upcycling.
              Perfect for schools, corporates, and creative individuals.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  animate={
                    inView
                      ? { y: [0, -3, 0, 2, 0] }
                      : {}
                  }
                  transition={{
                    duration: 9,
                    delay: index * 1.6, // stagger phases: card 1 -> card 2 -> card 3
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.03,
                    boxShadow:
                      '0 22px 45px rgba(0,0,0,0.08), 0 0 30px rgba(248, 213, 72, 0.25), 0 0 50px rgba(42, 42, 42, 0.08)',
                  }}
                  className="group bg-white rounded-2xl p-6 md:p-7 shadow-md transition-all duration-500 border border-[#2A2A2A]/5 hover:border-[#F8D548]/30 flex flex-col items-center text-center h-full relative overflow-hidden premium-float"
                >
                  {/* Gradient top border on hover */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F8D548] via-[#DBB520] to-[#F8D548] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon with gradient and animation */}
                  <div className="w-20 h-20 bg-gradient-to-br from-[#FFF6D1] via-[#F8D548]/20 to-[#FFF6D1] rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-lg shadow-[#F8D548]/10 relative soft-glow">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F8D548]/20 to-[#DBB520]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div
                      className="relative z-10"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent
                        className="w-10 h-10 text-[#DBB520] group-hover:text-[#F8D548] transition-colors duration-500"
                        strokeWidth={2.5}
                        style={{
                          filter: 'drop-shadow(0 0 10px rgba(248, 213, 72, 0.45))'
                        }}
                      />
                    </motion.div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black mb-4 tracking-tight" style={{ letterSpacing: '-0.02em', color: '#4a3b2c', fontWeight: 900 }}>
                    {highlight.title}
                  </h3>

                  <p className="leading-relaxed text-base" style={{ lineHeight: '1.7', color: '#4a3b2c' }}>
                    {highlight.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA for Booking Workshop - since detailed section moved */}
          <div className="text-center mt-12">
            <motion.button
              onClick={() => {
                document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F8D548] text-[#4a3b2c] rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Book a Workshop <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
};
