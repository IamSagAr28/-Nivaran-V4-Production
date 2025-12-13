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
            // Send to backend (we will treat this as a generic contact/workshop submission)
            // For now, we utilize the membership endpoint or similar, 
            // but ideally we'd have a dedicated /api/workshops endpoint.
            // We'll mock it for now or send to /api/contact if available. 
            // Assuming we treat it as a specialized message.

            // Simulating network request for workshop booking
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
        <div className="relative bg-[#FFFEF5] rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full p-8 border border-[#F8D548]/20">

            {/* Success Overlay */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-[#FFFEF5] flex flex-col items-center justify-center text-center p-8"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                        >
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-[#4a3b2c] mb-2">Booking Requested!</h3>
                        <p className="text-[#4a3b2c]/70">We will contact you shortly to confirm the details.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-black text-[#4a3b2c]">Book Workshop</h2>
                    <p className="text-sm text-[#4a3b2c]/60">Customize a session for your group</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <X className="w-6 h-6 text-[#4a3b2c]" />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Name & Phone */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-[#DBB520]" />
                            <input
                                {...register('name', { required: true })}
                                className="w-full bg-white border border-[#F8D548]/30 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F8D548] transition-all"
                                placeholder="Your Name"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Phone</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 w-5 h-5 text-[#DBB520]" />
                            <input
                                {...register('phone', { required: true })}
                                className="w-full bg-white border border-[#F8D548]/30 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F8D548] transition-all"
                                placeholder="+91..."
                            />
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-[#DBB520]" />
                        <input
                            {...register('email', { required: true })}
                            type="email"
                            className="w-full bg-white border border-[#F8D548]/30 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F8D548] transition-all"
                            placeholder="you@email.com"
                        />
                    </div>
                </div>

                {/* Organization */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Organization / School</label>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-3 w-5 h-5 text-[#DBB520]" />
                        <input
                            {...register('organization', { required: true })}
                            className="w-full bg-white border border-[#F8D548]/30 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F8D548] transition-all"
                            placeholder="Organization Name"
                        />
                    </div>
                </div>

                {/* Date & Participants */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Preferred Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-[#DBB520]" />
                            <input
                                {...register('date')}
                                type="date"
                                className="w-full bg-white border border-[#F8D548]/30 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F8D548] transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Batch Size</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-3 w-5 h-5 text-[#DBB520]" />
                            <select
                                {...register('participants')}
                                className="w-full bg-white border border-[#F8D548]/30 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F8D548] transition-all appearance-none"
                            >
                                <option value="10-20">10-20 People</option>
                                <option value="20-50">20-50 People</option>
                                <option value="50+">50+ People</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Message (Optional)</label>
                    <textarea
                        {...register('message')}
                        rows={3}
                        className="w-full bg-white border border-[#F8D548]/30 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F8D548] transition-all resize-none"
                        placeholder="Any specific requirements?"
                    />
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#F8D548] to-[#DBB520] text-[#4a3b2c] py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                        </>
                    ) : (
                        "Submit Request"
                    )}
                </motion.button>

            </form>
        </div>
    );
};
