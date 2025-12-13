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
        <div className="flex flex-col h-full bg-[#FFFEF5] relative">

            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#F8D548]/20 bg-white">
                <div>
                    <h2 className="text-2xl font-black text-[#4a3b2c]">Book Workshop</h2>
                    <p className="text-sm text-[#4a3b2c]/60">Customize a session for your group</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <X className="w-6 h-6 text-[#4a3b2c]" />
                </button>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-[#FFFEF5] flex flex-col items-center justify-center text-center p-8"
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

            {/* Scrollable Form Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Name</label>
                            <div className="relative group">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DBB520] group-focus-within:text-[#F8D548] transition-colors" />
                                <input
                                    {...register('name', { required: true })}
                                    className="w-full bg-white border-2 border-transparent focus:border-[#F8D548] ring-1 ring-gray-200 focus:ring-4 focus:ring-[#F8D548]/10 rounded-xl py-3 pl-11 pr-4 transition-all outline-none text-[#4a3b2c] font-medium placeholder:text-gray-400"
                                    placeholder="Your Name"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Phone</label>
                            <div className="relative group">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DBB520] group-focus-within:text-[#F8D548] transition-colors" />
                                <input
                                    {...register('phone', { required: true })}
                                    className="w-full bg-white border-2 border-transparent focus:border-[#F8D548] ring-1 ring-gray-200 focus:ring-4 focus:ring-[#F8D548]/10 rounded-xl py-3 pl-11 pr-4 transition-all outline-none text-[#4a3b2c] font-medium placeholder:text-gray-400"
                                    placeholder="+91..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DBB520] group-focus-within:text-[#F8D548] transition-colors" />
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                className="w-full bg-white border-2 border-transparent focus:border-[#F8D548] ring-1 ring-gray-200 focus:ring-4 focus:ring-[#F8D548]/10 rounded-xl py-3 pl-11 pr-4 transition-all outline-none text-[#4a3b2c] font-medium placeholder:text-gray-400"
                                placeholder="you@email.com"
                            />
                        </div>
                    </div>

                    {/* Organization */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Organization / School</label>
                        <div className="relative group">
                            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DBB520] group-focus-within:text-[#F8D548] transition-colors" />
                            <input
                                {...register('organization', { required: true })}
                                className="w-full bg-white border-2 border-transparent focus:border-[#F8D548] ring-1 ring-gray-200 focus:ring-4 focus:ring-[#F8D548]/10 rounded-xl py-3 pl-11 pr-4 transition-all outline-none text-[#4a3b2c] font-medium placeholder:text-gray-400"
                                placeholder="Organization Name"
                            />
                        </div>
                    </div>

                    {/* Date & Participants */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Preferred Date</label>
                            <div className="relative group">
                                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DBB520] group-focus-within:text-[#F8D548] transition-colors" />
                                <input
                                    {...register('date')}
                                    type="date"
                                    className="w-full bg-white border-2 border-transparent focus:border-[#F8D548] ring-1 ring-gray-200 focus:ring-4 focus:ring-[#F8D548]/10 rounded-xl py-3 pl-11 pr-4 transition-all outline-none text-[#4a3b2c] font-medium cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Batch Size</label>
                            <div className="relative group">
                                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DBB520] group-focus-within:text-[#F8D548] transition-colors" />
                                <select
                                    {...register('participants')}
                                    className="w-full bg-white border-2 border-transparent focus:border-[#F8D548] ring-1 ring-gray-200 focus:ring-4 focus:ring-[#F8D548]/10 rounded-xl py-3 pl-11 pr-8 transition-all outline-none text-[#4a3b2c] font-medium appearance-none cursor-pointer"
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
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4a3b2c]/70">Message (Optional)</label>
                        <textarea
                            {...register('message')}
                            rows={4}
                            className="w-full bg-white border-2 border-transparent focus:border-[#F8D548] ring-1 ring-gray-200 focus:ring-4 focus:ring-[#F8D548]/10 rounded-xl p-4 transition-all outline-none text-[#4a3b2c] font-medium resize-none placeholder:text-gray-400"
                            placeholder="Any specific requirements?"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg">{error}</p>}
                </form>
            </div>

            {/* Footer / Submit Button */}
            <div className="p-6 border-t border-[#F8D548]/20 bg-white">
                <motion.button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#F8D548] to-[#DBB520] text-[#4a3b2c] py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                        </>
                    ) : (
                        "Submit Request"
                    )}
                </motion.button>
            </div>
        </div>
    );
};
