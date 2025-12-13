import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader2, Calendar, Users, Building2, Phone, User, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface WorkshopFormProps {
    onClose: () => void;
}

interface FormData {
    name: string;
    organization: string;
    email: string;
    phone: string;
    date: string;
    participants: string;
    message: string;
}

export const WorkshopForm: React.FC<WorkshopFormProps> = ({ onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            // Mock submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (err) {
            setError("Failed to submit booking. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative p-8 md:p-10 bg-[#FFFEF5]">
            {/* Close Button Top Right */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 text-[#4a3b2c]/60 hover:text-[#4a3b2c] transition-all z-10"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Success Overlay */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-30 bg-[#FFFEF5]/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 rounded-3xl"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="w-20 h-20 bg-[#F8D548]/20 rounded-full flex items-center justify-center mb-6"
                        >
                            <CheckCircle className="w-10 h-10 text-[#DBB520]" />
                        </motion.div>
                        <h3 className="text-2xl font-black text-[#4a3b2c] mb-2">Request Sent!</h3>
                        <p className="text-[#4a3b2c]/70">We'll be in touch shortly to plan your workshop.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mb-8 pr-12">
                <h2 className="text-3xl font-black text-[#4a3b2c] mb-2 tracking-tight">Book Workshop</h2>
                <p className="text-[#4a3b2c]/70 font-medium">Customize an exclusive fabric upcycling session.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/50 ml-1">Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DBB520]" />
                            <input
                                {...register('name', { required: true })}
                                className="w-full bg-white border border-[#E5E5E5] focus:border-[#F8D548] rounded-xl py-3.5 pl-12 pr-4 transition-all outline-none text-[#4a3b2c] font-semibold placeholder:text-[#4a3b2c]/30 shadow-sm focus:shadow-md focus:ring-4 focus:ring-[#F8D548]/10"
                                placeholder="Your Name"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/50 ml-1">Phone</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DBB520]" />
                            <input
                                {...register('phone', { required: true })}
                                className="w-full bg-white border border-[#E5E5E5] focus:border-[#F8D548] rounded-xl py-3.5 pl-12 pr-4 transition-all outline-none text-[#4a3b2c] font-semibold placeholder:text-[#4a3b2c]/30 shadow-sm focus:shadow-md focus:ring-4 focus:ring-[#F8D548]/10"
                                placeholder="+91..."
                            />
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/50 ml-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DBB520]" />
                        <input
                            {...register('email', { required: true })}
                            type="email"
                            className="w-full bg-white border border-[#E5E5E5] focus:border-[#F8D548] rounded-xl py-3.5 pl-12 pr-4 transition-all outline-none text-[#4a3b2c] font-semibold placeholder:text-[#4a3b2c]/30 shadow-sm focus:shadow-md focus:ring-4 focus:ring-[#F8D548]/10"
                            placeholder="you@email.com"
                        />
                    </div>
                </div>

                {/* Organization */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/50 ml-1">Organization / School</label>
                    <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DBB520]" />
                        <input
                            {...register('organization', { required: true })}
                            className="w-full bg-white border border-[#E5E5E5] focus:border-[#F8D548] rounded-xl py-3.5 pl-12 pr-4 transition-all outline-none text-[#4a3b2c] font-semibold placeholder:text-[#4a3b2c]/30 shadow-sm focus:shadow-md focus:ring-4 focus:ring-[#F8D548]/10"
                            placeholder="Organization Name"
                        />
                    </div>
                </div>

                {/* Date & Participants */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/50 ml-1">Preferred Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DBB520]" />
                            <input
                                {...register('date')}
                                type="date"
                                className="w-full bg-white border border-[#E5E5E5] focus:border-[#F8D548] rounded-xl py-3.5 pl-12 pr-4 transition-all outline-none text-[#4a3b2c] font-semibold cursor-pointer shadow-sm focus:shadow-md focus:ring-4 focus:ring-[#F8D548]/10"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/50 ml-1">Batch Size</label>
                        <div className="relative">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DBB520]" />
                            <select
                                {...register('participants')}
                                className="w-full bg-white border border-[#E5E5E5] focus:border-[#F8D548] rounded-xl py-3.5 pl-12 pr-8 transition-all outline-none text-[#4a3b2c] font-semibold appearance-none cursor-pointer shadow-sm focus:shadow-md focus:ring-4 focus:ring-[#F8D548]/10"
                            >
                                <option value="10-20">10-20 People</option>
                                <option value="20-50">20-50 People</option>
                                <option value="50+">50+ People</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/50 ml-1">Message (Optional)</label>
                    <textarea
                        {...register('message')}
                        rows={3}
                        className="w-full bg-white border border-[#E5E5E5] focus:border-[#F8D548] rounded-xl p-4 transition-all outline-none text-[#4a3b2c] font-semibold resize-none placeholder:text-[#4a3b2c]/30 shadow-sm focus:shadow-md focus:ring-4 focus:ring-[#F8D548]/10"
                        placeholder="Any specific requirements?"
                    />
                </div>

                {error && <p className="text-red-500 text-sm text-center font-bold bg-red-50 py-3 rounded-xl">{error}</p>}

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#F8D548] hover:bg-[#F3D040] text-[#4a3b2c] py-4 rounded-xl font-black shadow-lg shadow-[#F8D548]/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg tracking-wide uppercase"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                        </>
                    ) : (
                        "Confirm Booking Request"
                    )}
                </motion.button>

            </form>
        </div>
    );
};
