import React, { useRef, useState } from 'react';
import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Award, ArrowRight, GraduationCap, Building2, Users } from 'lucide-react';
import { WorkshopForm } from './WorkshopForm';

export const ContactSection = () => {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.2 });
    const [showWorkshopForm, setShowWorkshopForm] = useState(false);

    const pricingAudiences = [
        { name: 'Schools & Educational Institutions', icon: GraduationCap },
        { name: 'Colleges & Universities', icon: GraduationCap },
        { name: 'Residential Societies', icon: Users },
        { name: 'Corporate Groups', icon: Building2 }
    ];

    const contactRowVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: [0.25, 1, 0.35, 1] },
        },
    };

    return (
        <section id="contact-info" ref={sectionRef} className="py-16 bg-[#FFFBF0] relative">

            {/* Modal Overlay for Workshop Form */}
            <AnimatePresence>
                {showWorkshopForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowWorkshopForm(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative z-10 w-full max-w-lg"
                        >
                            <WorkshopForm onClose={() => setShowWorkshopForm(false)} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                <style>{`
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
                {/* Contact & Info Section */}
                <div className="bg-white shadow-2xl border border-[#2A2A2A]/10 backdrop-blur-sm" style={{ boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(248, 213, 72, 0.05)', borderRadius: '2rem', overflow: 'hidden' }}>
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
                    <motion.button
                        onClick={() => setShowWorkshopForm(true)}
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
                    </motion.button>
                </div>
            </div>
        </section>
    );
};
