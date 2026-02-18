# How to Add Blog Posts

Your website fetches blog posts directly from your Shopify Store. To add, edit, or remove blog posts, you must use the Shopify Admin Dashboard.

## Steps to Add a Blog Post

1.  **Log in to Shopify Admin**: Go to your Shopify store admin panel (e.g., `your-store.myshopify.com/admin`).
2.  **Navigate to Online Store**: In the left sidebar, click on **Online Store**.
3.  **Select Blog Posts**: Click on **Blog posts**.
4.  **Create Blog Post**: Click the green **Add blog post** button.
5.  **Enter Details**:
    *   **Title**: The title of your post.
    *   **Content**: The main body of your post.
    *   **Excerpt**: A short summary (displayed on the blog list page).
    *   **Featured Image**: Upload an image for the post card.
6.  **Select Blog**: Ensure you select the correct blog category (usually "News" or "Blog").
7.  **Visibility**: Set to "Visible" to publish immediately.
8.  **Save**: Click **Save**.

The new post will automatically appear on your website's Blog section after a refresh.

## Why is it not working?
*   Ensure your Shopify API Token has `read_content` access scope.
*   Ensure the blog handle in `src/hooks/useShopifyBlogs.ts` matches your Shopify blog handle (default is usually `news`).
