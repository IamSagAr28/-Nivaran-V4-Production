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
      <style jsx global>{`
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
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-24" style={{ marginBottom: '4rem' }}>
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

        {/* Contact & Info Section */}
        <div className="bg-white shadow-2xl border border-[#2A2A2A]/10 backdrop-blur-sm mt-16" style={{ boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(248, 213, 72, 0.05)', marginTop: '4rem', borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem', borderBottomLeftRadius: '0', borderBottomRightRadius: '0', overflow: 'hidden' }}>
          <div className="grid lg:grid-cols-2">

            {/* Left Column: Get in Touch */}
            <div className="p-10 md:p-14 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#2A2A2A]/10 bg-gradient-to-br from-white to-[#FFFEF5]" style={{ paddingTop: '4rem' }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3.5 bg-gradient-to-br from-[#FFF6D1] to-[#F8D548]/20 rounded-xl shadow-md">
                  <Phone className="w-7 h-7 text-[#DBB520]" strokeWidth={2} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight relative" style={{ color: '#4a3b2c', fontWeight: 900 }}>
                  Get in Touch
                  <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-[#F8D548] to-[#DBB520] rounded-full"></span>
                </h3>
              </div>

              <p className="mb-12 text-lg leading-relaxed font-normal" style={{ lineHeight: '1.75', paddingLeft: '0.75rem', color: '#4a3b2c' }}>
                We conduct engaging Fabric Upcycling Workshops in schools, colleges, and residential societies.
                Reach out to customize a session for your group.
              </p>

              <div className="space-y-4">
                <motion.a
                  href="tel:+919129455565"
                  variants={contactRowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-5 rounded-xl border border-[#F8D548]/30 hover:border-[#F8D548] transition-all duration-300 group shadow-sm hover:shadow-lg hover:-translate-y-1 contact-row"
                  style={{
                    backgroundColor: '#FFF44F', // Lemon yellow background
                    backgroundImage: 'none',
                    padding: '1.25rem 1.5rem 1.25rem 2rem' // More left padding for icon and text
                  }}
                >
                  <motion.div
                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 border border-[#F8D548]/20 contact-icon"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Phone className="w-6 h-6 text-[#DBB520] group-hover:text-[#F8D548] transition-colors duration-300" strokeWidth={2} />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: '#4a3b2c' }}>Call Us</p>
                    <p className="font-semibold text-lg contact-text" style={{ color: '#4a3b2c' }}>+91 9129-45-55-65</p>
                    <span className="inline-block h-0.5 bg-gradient-to-r from-[#F8D548] to-[#DBB520] contact-underline" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#DBB520]/50 group-hover:text-[#DBB520] group-hover:translate-x-1 transition-all duration-300" />
                </motion.a>

                <motion.a
                  href="mailto:info@nivaranupcyclers.in"
                  variants={contactRowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-5 rounded-xl border border-[#F8D548]/30 hover:border-[#F8D548] transition-all duration-300 group shadow-sm hover:shadow-lg hover:-translate-y-1 contact-row"
                  style={{
                    backgroundColor: '#FFF44F', // Lemon yellow background
                    backgroundImage: 'none',
                    padding: '1.25rem 1.5rem 1.25rem 2rem' // More left padding for icon and text
                  }}
                >
                  <motion.div
                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 border border-[#F8D548]/20 contact-icon"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Mail className="w-6 h-6 text-[#DBB520] group-hover:text-[#F8D548] transition-colors duration-300" strokeWidth={2} />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: '#4a3b2c' }}>Email Us</p>
                    <p className="font-semibold text-lg contact-text" style={{ color: '#4a3b2c' }}>info@nivaranupcyclers.in</p>
                    <span className="inline-block h-0.5 bg-gradient-to-r from-[#F8D548] to-[#DBB520] contact-underline" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#DBB520]/50 group-hover:text-[#DBB520] group-hover:translate-x-1 transition-all duration-300" />
                </motion.a>
              </div>
            </div>

            {/* Right Column: Pricing & Plans */}
            <div className="p-10 md:p-14 lg:p-16 bg-gradient-to-br from-[#FFF6D1]/20 via-[#FFF6D1]/10 to-white border-l-0 lg:border-l border-[#2A2A2A]/10">
              <div className="flex items-center gap-4 mb-10 mt-8" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
                <div className="p-3.5 bg-gradient-to-br from-[#FFF6D1] to-[#F8D548]/20 rounded-xl shadow-md">
                  <Award className="w-7 h-7 text-[#DBB520]" strokeWidth={2} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight relative" style={{ color: '#4a3b2c', fontWeight: 900 }}>
                  Pricing & Plans
                  <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-[#F8D548] to-[#DBB520] rounded-full"></span>
                </h3>
              </div>

              <p className="mb-10 text-lg leading-relaxed font-normal" style={{ lineHeight: '1.75', paddingLeft: '0.75rem', color: '#4a3b2c' }}>
                Nominal fees based on batch size and location. We offer customized pricing packages for:
              </p>

              <ul className="space-y-4 mb-12" style={{ paddingLeft: '0.75rem' }}>
                {pricingAudiences.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <li 
                      key={idx} 
                      className="flex items-center gap-4 font-medium text-base group/item hover:translate-x-1 transition-transform duration-300"
                      style={{ paddingLeft: '0.75rem', color: '#4a3b2c' }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FFF6D1] to-[#F8D548]/20 rounded-lg flex items-center justify-center shadow-sm group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300 border border-[#F8D548]/20">
                        <IconComponent className="w-5 h-5 text-[#DBB520]" strokeWidth={2} />
                      </div>
                      <span className="flex-1" style={{ letterSpacing: '-0.01em', color: '#4a3b2c' }}>{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Book a Workshop Button - Full Width */}
          <motion.a
            href="tel:+919129455565"
            className="group/btn w-full flex items-center justify-center py-5 font-bold text-lg transition-all duration-500 shadow-lg shadow-[#F8D548]/30 relative overflow-hidden border-0 breathing-btn"
            style={{
              backgroundColor: '#FFF44F', // Lemon yellow background
              backgroundImage: 'none',
              borderTopLeftRadius: '0.75rem',
              borderTopRightRadius: '0.75rem',
              borderBottomLeftRadius: '0',
              borderBottomRightRadius: '0',
              width: '100%',
              display: 'flex',
              marginTop: '1.5rem',
              color: '#4a3b2c',
              paddingTop: '22.5px',
              paddingBottom: '22.5px'
            }}
              animate={inView ? { scale: [1, 1.015, 1] } : { scale: 1 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 24px 50px rgba(248, 213, 72, 0.35)',
              }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -translate-x-full opacity-70"
                animate={{ x: ['-120%', '120%'] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 10, ease: 'easeInOut' }}
              ></motion.span>
              <span className="relative z-10 flex items-center gap-2" style={{ color: '#4a3b2c' }}>
                Book a Workshop
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" style={{ color: '#4a3b2c' }} />
              </span>
            </motion.a>
        </div>
      </div>
    </section>
    </>
  );
};
