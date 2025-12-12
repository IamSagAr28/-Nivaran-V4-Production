import React, { useState } from 'react';
import { ShoppingBag, Phone, Mail, MapPin, Menu, Search, User, ShoppingCart } from 'lucide-react';
import Login from './Login';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll function for navigation
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setMobileMenuOpen(false);
  };

  // If login modal is open, render it
  if (showLogin) {
    return <Login onClose={() => setShowLogin(false)} />;
  }

  return (
    <header className="bg-white border-b border-[#a3b18a]/30">
      {/* Top Navigation Bar */}
      <div className="bg-[#3a5a40] text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 9129455565</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@nivaranupcyclers.in</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Free shipping on orders above ₹999</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-[#3a5a40]" />
            <h1 className="text-2xl font-bold text-[#3a5a40]">Nivarn</h1>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-[#3a5a40] hover:text-[#588157] transition-colors font-medium"
            >
              Home
            </button>
            <div className="relative group">
              <button 
                onClick={() => scrollToSection('products')} 
                className="text-[#3a5a40] hover:text-[#588157] transition-colors font-medium"
              >
                Products
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#a3b18a]/30 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button 
                  onClick={() => scrollToSection('products')} 
                  className="block w-full text-left px-4 py-2 text-[#3a5a40] hover:bg-[#dad7cd] transition-colors"
                >
                  Wall Hangings
                </button>
                <button 
                  onClick={() => scrollToSection('products')} 
                  className="block w-full text-left px-4 py-2 text-[#3a5a40] hover:bg-[#dad7cd] transition-colors"
                >
                  Clutches & Pouches
                </button>
                <button 
                  onClick={() => scrollToSection('products')} 
                  className="block w-full text-left px-4 py-2 text-[#3a5a40] hover:bg-[#dad7cd] transition-colors"
                >
                  Home Textiles
                </button>
                <button 
                  onClick={() => scrollToSection('products')} 
                  className="block w-full text-left px-4 py-2 text-[#3a5a40] hover:bg-[#dad7cd] transition-colors"
                >
                  Festival Items
                </button>
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-[#3a5a40] hover:text-[#588157] transition-colors font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-[#3a5a40] hover:text-[#588157] transition-colors font-medium"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-[#3a5a40] hover:text-[#588157] transition-colors font-medium"
            >
              Contact
            </button>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="h-5 w-5 text-[#3a5a40] cursor-pointer hover:text-[#588157] transition-colors" />
            </div>
            <button 
              onClick={() => setShowLogin(true)}
              className="relative"
            >
              <User className="h-5 w-5 text-[#3a5a40] cursor-pointer hover:text-[#588157] transition-colors" />
            </button>
            <div className="relative">
              <ShoppingCart className="h-5 w-5 text-[#3a5a40] cursor-pointer hover:text-[#588157] transition-colors" />
              <span className="absolute -top-2 -right-2 bg-[#588157] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              <Menu className="h-6 w-6 text-[#3a5a40]" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#a3b18a]/30 mt-4 pt-4">
            <nav className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="text-left text-[#3a5a40] hover:text-[#588157] transition-colors font-medium py-2"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('products')} 
                className="text-left text-[#3a5a40] hover:text-[#588157] transition-colors font-medium py-2"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-left text-[#3a5a40] hover:text-[#588157] transition-colors font-medium py-2"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="text-left text-[#3a5a40] hover:text-[#588157] transition-colors font-medium py-2"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-left text-[#3a5a40] hover:text-[#588157] transition-colors font-medium py-2"
              >
                Contact
              </button>
              <button 
                onClick={() => setShowLogin(true)} 
                className="text-left text-[#588157] hover:text-[#3a5a40] transition-colors font-medium py-2 border-t border-[#a3b18a]/30 mt-2 pt-4"
              >
                Login / Sign Up
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Category Icons Strip */}
      <div className="border-t border-[#a3b18a]/30 bg-[#dad7cd]/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center gap-8 overflow-x-auto">
            {[
              {
                name: "Wall Hangings",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center"
              },
              {
                name: "Clutches & Pouches",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center"
              },
              {
                name: "Home Textiles",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center"
              },
              {
                name: "File Covers",
                image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop&crop=center"
              },
              {
                name: "Festival Items",
                image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop&crop=center"
              },
              {
                name: "Diya Decorations",
                image: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a80e?w=400&h=400&fit=crop&crop=center"
              },
              {
                name: "Bangle Boxes",
                image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&crop=center"
              },
              {
                name: "Bottle Covers",
                image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop&crop=center"
              }
            ].map((category) => (
              <button
                key={category.name}
                onClick={() => scrollToSection('products')}
                className="flex flex-col items-center gap-2 min-w-[80px] text-[#344e41] hover:text-[#588157] transition-colors group"
              >
                <div className="w-12 h-12 bg-[#a3b18a]/40 group-hover:bg-[#588157] rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 shadow-sm">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-6 h-6 bg-[#588157] group-hover:bg-white rounded transition-colors"></div>';
                    }}
                  />
                </div>
                <span className="text-xs text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;