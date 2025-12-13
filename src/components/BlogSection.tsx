import React from 'react';
import { Calendar } from 'lucide-react';
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from '../utils/Router';
import { useShopifyBlogs } from '../hooks/useShopifyBlogs';
import { getOptimizedImageUrl } from '../shopify/client';
import { formatDate } from '../utils/date';

export function BlogSection() {
  const { articles, loading } = useShopifyBlogs(3); // Fetch only 3 posts
  const { navigateTo } = useRouter();

  // Debug: Log what we're getting from Shopify
  React.useEffect(() => {
    if (articles && articles.length > 0) {
      console.log('Shopify Blog Articles:', articles);
      console.log('First article image:', articles[0]?.image);
    }
  }, [articles]);

  // Fallback static data for preview/demo
  const staticBlogs = [
    {
      title: "Sustainable Living: Transform Your Home",
      publishedAt: "2024-12-01T00:00:00Z",
      excerpt: "Discover how upcycled products can transform your living space into an eco-friendly haven. Learn practical tips for sustainable home decor.",
      image: { url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000" },
      handle: "sustainable-living-transform-home",
      blog: { handle: "news" }
    },
    {
      title: "The Art of Upcycling: Creative Techniques",
      publishedAt: "2024-11-28T00:00:00Z",
      excerpt: "Explore the creative world of upcycling and learn techniques to turn waste materials into beautiful, functional art pieces for your home.",
      image: { url: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=1000" },
      handle: "art-of-upcycling-techniques",
      blog: { handle: "news" }
    },
    {
      title: "Community Impact: Stories of Change",
      publishedAt: "2024-11-25T00:00:00Z",
      excerpt: "Read inspiring stories from our community members who have embraced sustainable living and made a positive impact on the environment.",
      image: { url: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=1000" },
      handle: "community-impact-stories",
      blog: { handle: "news" }
    }
  ];

  // Use Shopify data if available, otherwise use static fallback
  const displayBlogs = (articles && articles.length > 0) ? articles : staticBlogs;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <section
      className="bg-white"
      style={{
        paddingTop: '80px',
        paddingBottom: '100px',
        overflow: 'hidden',
        minHeight: '100px'
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-5 py-2 rounded-full mb-6 border shadow-sm" style={{ backgroundColor: '#4a3b2c' }}>
            <span className="text-[#F8D548] font-bold text-sm uppercase tracking-widest">Our Blog</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
            style={{ color: '#4a3b2c', fontWeight: 900 }}
          >
            Latest from the Blog
          </h2>
          <p className="text-lg text-[#4a3b2c]/70 max-w-2xl mx-auto">
            Stay updated with our latest stories, sustainability tips, and community highlights
          </p>
        </div>

        {/* Loading State */}
        {loading && articles.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F8D548]"></div>
          </div>
        ) : (
          /* Blog Grid - Fixed height rows */
          <div className="grid md:grid-cols-3 gap-8" style={{ gridTemplateRows: '550px' }}>
            {displayBlogs.map((article: any, index: number) => {
              const title = article.title;
              const excerpt = article.excerpt || article.content?.substring(0, 150) || '';
              const date = formatDate(article.publishedAt);
              const imageUrl = getOptimizedImageUrl(article.image?.url, 800, 600);
              const link = `/blogs/${article.blog?.handle || 'news'}/${article.handle}`;

              return (
                <div
                  key={index}
                  onClick={() => {
                    navigateTo(link);
                    window.scrollTo(0, 0);
                  }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col h-full"
                  style={{
                    border: '1px solid rgba(74, 59, 44, 0.1)',
                    minHeight: '550px'
                  }}
                >
                  {/* Featured Image - Fixed height */}
                  <div
                    className="overflow-hidden bg-[#FFF6D1]/20 relative flex-shrink-0"
                    style={{
                      height: '240px',
                      minHeight: '240px',
                      maxHeight: '240px'
                    }}
                  >
                    <img
                      src={imageUrl || 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000'}
                      alt={title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000';
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Card Content - Fixed height */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DBB520] mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{date}</span>
                    </div>

                    {/* Title - Fixed 2 lines */}
                    <h3
                      className="text-lg font-black mb-3 leading-tight group-hover:text-[#DBB520] transition-colors line-clamp-2"
                      style={{
                        color: '#4a3b2c',
                        fontWeight: 900,
                        height: '3rem',
                        overflow: 'hidden'
                      }}
                    >
                      {title}
                    </h3>

                    {/* Excerpt - Fixed 3 lines */}
                    <p
                      className="text-[#4a3b2c]/70 text-sm leading-relaxed line-clamp-3 mb-4"
                      style={{
                        height: '4rem',
                        overflow: 'hidden'
                      }}
                    >
                      {truncateText(excerpt, 120)}
                    </p>

                    {/* Read More Indicator - Always at bottom */}
                    <div className="mt-auto pt-4 border-t border-[#4a3b2c]/10">
                      <span className="text-[#F8D548] font-bold text-sm group-hover:text-[#DBB520] transition-colors inline-flex items-center gap-1">
                        Read Full Article <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div >
        )}
      </div >
    </section >
  );
}
