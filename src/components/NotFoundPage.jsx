import React from 'react';
import { Home, ArrowLeft, ShoppingBag } from 'lucide-react';

const NotFoundPage = () => {
  const goToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dad7cd] via-[#a3b18a] to-[#588157] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[#344e41]/10 via-transparent to-[#588157]/10"></div>
      
      {/* 404 Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden text-center">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3a5a40] to-[#588157] px-8 py-12 text-white">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="w-16 h-16 text-[#a3b18a]" />
          </div>
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-[#dad7cd] text-sm">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          <div className="mb-8">
            <p className="text-[#3a5a40] mb-6">
              Don't worry! You can navigate back to our homepage and explore our sustainable products.
            </p>
            
            <div className="bg-[#dad7cd]/30 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-[#3a5a40] mb-2">Popular Pages:</h3>
              <div className="text-sm text-[#344e41] space-y-1">
                <div>• Home - Discover our mission</div>
                <div>• Products - Browse eco-friendly items</div>
                <div>• About - Learn about Nivaran Upcyclers</div>
                <div>• Login - Access your account</div>
              </div>
            </div>

            <button
              onClick={goToHome}
              className="w-full bg-gradient-to-r from-[#3a5a40] to-[#588157] text-white py-3 px-6 rounded-lg font-medium hover:from-[#588157] hover:to-[#a3b18a] transform hover:scale-[1.02] transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Homepage
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#dad7cd]/30 px-8 py-4 text-center">
          <p className="text-xs text-[#344e41]">
            Need help? Contact us at{' '}
            <a href="mailto:info@nivaranupcyclers.in" className="text-[#588157] hover:underline">
              info@nivaranupcyclers.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;