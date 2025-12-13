import React from 'react';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useShopifyBlogs } from '../hooks/useShopifyBlogs';
import { getOptimizedImageUrl } from '../shopify/client';

export function BlogSection() {
  const { articles, loading } = useShopifyBlogs(4);

  // Fallback static data in case API returns nothing or is loading initially
  const staticBlogs = [
    {
      title: "Diwali Gift Hampers",
      date: "October 4, 2025",
      excerpt: "Looking for the perfect Diwali gift that not only spreads joy but also supports a great cause? Look no further than Nivaran Upcyclers...",
      link: "https://shop.nivaranupcyclers.in/blogs/news/diwali-gift-hampers",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Handmade Products Exhibition",
      date: "September 14, 2024",
      excerpt: "Nivaran Upcyclers is thrilled to announce its upcoming exhibition on September 15, 2024, at the prestigious Rangoli...",
      link: "https://shop.nivaranupcyclers.in/blogs/news/handmade-products-exhibition",
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Award Ceremony",
      date: "August 16, 2024",
      excerpt: "We are pleased to share the exciting news that our director, Dr. Latika Mathur, was recently honored at a ceremony...",
      link: "https://shop.nivaranupcyclers.in/blogs/news/award-ceremony",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Slogan Writing Contest",
      date: "August 16, 2024",
      excerpt: "A slogan writing contest was recently organized at DAV PG Degree College, Kanpur as part of a waste management drive...",
      link: "https://shop.nivaranupcyclers.in/blogs/news/slogan-writing-contest",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  const displayBlogs = (articles && articles.length > 0) ? articles : (loading ? [] : staticBlogs);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-3 text-[#344e41]">From The Blogs</h2>
          <p className="text-[#3a5a40]">Latest updates and stories from our community</p>
        </div>

        {loading && articles.length === 0 ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#588157]" />
          </div>
        ) : (
          <div className="relative">
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
             `}</style>
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar px-2" style={{ WebkitOverflowScrolling: 'touch' }}>
              {displayBlogs.map((blog: any, index: number) => {
                // Determine if this is a Shopify article or static fallback
                const isShopify = !!blog.handle;

                const title = blog.title;
                const excerpt = blog.excerpt || blog.content?.substring(0, 100) + '...' || '';
                const date = isShopify ? formatDate(blog.publishedAt) : blog.date;
                const imageUrl = isShopify
                  ? getOptimizedImageUrl(blog.image?.url, 600, 400)
                  : blog.image;
                const link = isShopify
                  ? `https://shop.nivaranupcyclers.in/blogs/${blog.blog?.handle || 'news'}/${blog.handle}`
                  : blog.link;

                return (
                  <div key={index} className="min-w-[300px] md:min-w-[350px] w-[300px] md:w-[350px] flex-shrink-0 snap-start h-full group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-[#dad7cd]/40 overflow-hidden hover:-translate-y-1">
                    <div className="aspect-[4/3] overflow-hidden bg-[#dad7cd]/20 relative">
                      <ImageWithFallback
                        src={imageUrl || 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000'}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#588157] mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{date}</span>
                      </div>

                      <h3 className="text-xl text-[#344e41] mb-3 font-bold leading-tight group-hover:text-[#588157] transition-colors line-clamp-2">
                        {title}
                      </h3>

                      <p className="text-[#3a5a40]/80 text-sm mb-5 line-clamp-3 leading-relaxed flex-grow">
                        {excerpt}
                      </p>

                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#588157] font-bold hover:text-[#3a5a40] transition-colors mt-auto group/link"
                      >
                        Read Article
                        <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

