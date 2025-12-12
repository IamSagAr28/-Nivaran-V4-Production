import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full">
              <span className="text-sm">Sustainable Living Made Beautiful</span>
            </div>
            <h1 className="text-5xl leading-tight">
              Transforming Waste into{" "}
              <span className="text-emerald-700">Wonderful Products</span>
            </h1>
            <p className="text-lg text-gray-600">
              Discover our collection of handcrafted, eco-friendly products made from upcycled materials. 
              Each piece tells a story of sustainability and artisan craftsmanship.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-emerald-700 text-white hover:bg-emerald-800 rounded-lg transition-colors">
                Shop Now
              </button>
              <button className="px-8 py-3 border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1588766381125-c29bced9d2d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cGN5Y2xlZCUyMGNyYWZ0cyUyMGhhbmRtYWRlfGVufDF8fHx8MTc2MzAzMTI1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Handcrafted upcycled products"
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
