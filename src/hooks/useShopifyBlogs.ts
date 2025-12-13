// src/hooks/useShopifyBlogs.ts
// Custom hook for fetching and managing Shopify blog articles

import { useState, useEffect, useCallback } from 'react';
import { fetchArticles } from '../shopify/client';

export interface ShopifyArticle {
    id: string;
    title: string;
    handle: string;
    publishedAt: string;
    excerpt: string;
    content: string;
    image?: {
        url: string;
        altText?: string;
    };
    authorV2?: {
        name: string;
    };
    blog?: {
        handle: string;
        title: string;
    };
}

interface UseBlogsState {
    articles: ShopifyArticle[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useShopifyBlogs(limit: number = 4): UseBlogsState {
    const [articles, setArticles] = useState<ShopifyArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadArticles = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchArticles(limit);
            setArticles(data);
        } catch (err) {
            console.error('Error loading articles:', err);
            // Don't set error state to prevent UI crash, just show empty
            setArticles([]);
        } finally {
            setLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        loadArticles();
    }, [loadArticles]);

    return {
        articles,
        loading,
        error,
        refetch: loadArticles,
    };
}
