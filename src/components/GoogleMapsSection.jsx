import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

const GoogleMapsSection = () => {
  // Example coordinates for a location (you can change these to your desired location)
  const location = {
    lat: 28.6139,
    lng: 77.2090,
    address: "New Delhi, India",
    name: "Nivaran Headquarters"
  };

  // Function to open Google Maps in new tab
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${location.lat},${location.lng}&z=15`;
    window.open(url, '_blank');
  };

  // Embedded Google Maps URL for iframe
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.3736981507793!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1637000000000!5m2!1sen!2sin`;

  return (
    <section className="py-16 bg-gradient-to-br from-[#3a5a40] to-[#588157]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Visit Our Location
          </h2>
          <p className="text-lg text-[#dad7cd] max-w-2xl mx-auto">
            Come visit us at our headquarters to explore our sustainable products and learn more about our mission
          </p>
        </div>

        {/* Map Container - Full Width */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div 
            className="w-full h-64 md:h-80 lg:h-96 cursor-pointer relative overflow-hidden group"
            onClick={openGoogleMaps}
          >
            {/* Interactive Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 
                           transition-all duration-300 z-10 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                             bg-white bg-opacity-90 rounded-lg px-4 py-2 shadow-lg">
                <span className="text-[#3a5a40] font-semibold flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Click to open in Google Maps
                </span>
              </div>
            </div>

            {/* Embedded Map */}
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nivaran Location Map"
              className="w-full h-full"
            ></iframe>

            {/* Custom Marker Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           pointer-events-none z-20">
              <div className="animate-bounce">
                <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg 
                               flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-[#dad7cd] text-sm">
            Click anywhere on the map to open Google Maps and get detailed directions
          </p>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapsSection;