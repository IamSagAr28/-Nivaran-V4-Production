import { useState, useEffect } from "react";
import { User, Phone, Mail, MapPin, MapPinned, Navigation, Building2 } from "lucide-react";

export function MembershipForm({ plan, onBack }: { plan: any, onBack: () => void }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    landmark: '',
    city: '',
    pincode: ''
  });
  const [selectedState, setSelectedState] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
  };

  const getSelectedPrice = () => {
    if (!plan || !selectedState) return '';
    const region = plan.regions.find((r: any) => r.name === selectedState);
    return region ? region.price : '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState) {
      alert('Please select a region.');
      return;
    }
    
    const submissionData = {
      planTitle: plan.title,
      region: selectedState,
      price: getSelectedPrice(),
      ...formData
    };

    try {
      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        alert('Registration submitted successfully!');
        setFormData({
            fullName: '',
            mobile: '',
            email: '',
            address: '',
            landmark: '',
            city: '',
            pincode: ''
        });
        setSelectedState('');
        onBack(); // Go back to plans view
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting your registration.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 relative z-10">
      <div className="max-w-2xl mx-auto" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '2rem' }}>
        <button onClick={onBack} className="text-sm font-semibold mb-4" style={{ color: '#4A3F35' }}>
          &larr; Back to Plans
        </button>
        <div className="p-6 border-b" style={{ borderColor: '#E5E5E5', backgroundColor: '#F7F4ED' }}>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📦</span>
                <h4 className="text-lg font-bold" style={{ color: '#4A3F35' }}>
                    {plan.title}
                </h4>
            </div>
            <p className="text-sm mb-3" style={{ color: '#333333' }}>
                {plan.features[0]}
            </p>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium" style={{ color: '#4A3F35' }}>Price:</span>
                <span className="text-xl font-bold" style={{ color: '#4A3F35' }}>
                    {selectedState ? getSelectedPrice() : 'Select region to see price'}
                </span>
            </div>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-5 h-5" style={{ color: '#4A3F35' }} />
                    <h4 className="text-lg font-semibold" style={{ color: '#4A3F35' }}>
                        Which region do you belong to?
                    </h4>
                </div>

                <div className="space-y-4">
                    {plan?.regions.map((region: any, idx: number) => (
                        <button
                            type="button"
                            key={idx}
                            onClick={() => handleStateSelect(region.name)}
                            className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${selectedState === region.name
                                ? 'border-[#4A3F35] shadow-md'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            style={{
                                backgroundColor: selectedState === region.name ? '#F7F4ED' : '#FFFFFF',
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedState === region.name ? 'border-[#4A3F35]' : 'border-gray-300'
                                        }`}>
                                        {selectedState === region.name && (
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4A3F35' }} />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold" style={{ color: '#4A3F35' }}>
                                            {region.name}
                                        </p>
                                        <p className="text-sm" style={{ color: '#666666' }}>
                                            {region.price}
                                        </p>
                                    </div>
                                </div>
                                <Navigation className="w-5 h-5" style={{ color: selectedState === region.name ? '#4A3F35' : '#999999' }} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5" style={{ color: '#4A3F35' }} />
                    <h4 className="text-lg font-semibold" style={{ color: '#4A3F35' }}>
                        Enter Your Details
                    </h4>
                </div>
                <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#4A3F35' }}>
                            <User className="w-4 h-4 inline mr-2" />
                            Full Name *
                        </label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors"
                            style={{ borderColor: '#E5E5E5' }}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    {/* Mobile Number */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#4A3F35' }}>
                            <Phone className="w-4 h-4 inline mr-2" />
                            Mobile Number *
                        </label>
                        <input
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => handleInputChange('mobile', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors"
                            style={{ borderColor: '#E5E5E5' }}
                            placeholder="Enter your mobile number"
                            required
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#4A3F35' }}>
                            <Mail className="w-4 h-4 inline mr-2" />
                            Email *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors"
                            style={{ borderColor: '#E5E5E5' }}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#4A3F35' }}>
                            <MapPinned className="w-4 h-4 inline mr-2" />
                            Address *
                        </label>
                        <textarea
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors resize-none"
                            style={{ borderColor: '#E5E5E5', minHeight: '80px' }}
                            placeholder="Enter your complete address"
                            required
                        />
                    </div>
                    {/* Optional Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                                <Navigation className="w-4 h-4 inline mr-2" />
                                Landmark (Optional)
                            </label>
                            <input
                                type="text"
                                value={formData.landmark}
                                onChange={(e) => handleInputChange('landmark', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors"
                                style={{ borderColor: '#E5E5E5' }}
                                placeholder="Landmark"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                                <Building2 className="w-4 h-4 inline mr-2" />
                                City (Optional)
                            </label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors"
                                style={{ borderColor: '#E5E5E5' }}
                                placeholder="City"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                            <MapPin className="w-4 h-4 inline mr-2" />
                            Pincode (Optional)
                        </label>
                        <input
                            type="text"
                            value={formData.pincode}
                            onChange={(e) => handleInputChange('pincode', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#4A3F35] transition-colors"
                            style={{ borderColor: '#E5E5E5' }}
                            placeholder="Pincode"
                        />
                    </div>
                </div>
                <div className="flex gap-4 mt-6">
                    <button
                        type="submit"
                        className="flex-1 py-3 rounded-[10px] font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
                        style={{
                            backgroundColor: '#F3D55B',
                            color: '#4A3F35',
                            boxShadow: '0 2px 8px rgba(74, 63, 53, 0.15)'
                        }}
                    >
                        Confirm & Proceed
                    </button>
                </div>
            </div>
        </form>
      </div>
    </div>
  );
}
