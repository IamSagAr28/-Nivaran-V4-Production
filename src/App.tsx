import React, { Suspense } from 'react';
import { Router, Route } from './utils/Router.jsx';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ShopCartProvider } from './contexts/ShopCartContext';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy load components to improve initial load time
const HomePage = React.lazy(() => import('./components/HomePage.jsx'));
const Dashboard = React.lazy(() => import('./components/DashboardV2'));
const ProfilePage = React.lazy(() => import('./components/ProfilePage'));
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage.jsx'));
const ProductPage = React.lazy(() => import('./components/ProductPage'));
const ShopifyProductsPage = React.lazy(() => import('./components/shopify/ShopifyProductsPage'));
const PrivacyPage = React.lazy(() => import('./components/PrivacyPage'));
const TermsPage = React.lazy(() => import('./components/TermsPage'));
const ShippingPage = React.lazy(() => import('./components/ShippingPage'));
const TrackOrderPage = React.lazy(() => import('./components/TrackOrderPage'));
const ShopifyCartPage = React.lazy(() => import('./components/shopify/ShopifyCartPage'));
const ShopifyLoginPage = React.lazy(() => import('./components/shopify/ShopifyLoginPage'));
const ShopPage = React.lazy(() => import('./components/shop/ShopPage'));
const ShopCartPage = React.lazy(() => import('./components/shop/ShopCartPage'));
const MembershipPage = React.lazy(() => import('./components/MembershipPage'));
const BlogPostPage = React.lazy(() => import('./components/BlogPostPage'));

// Check for required environment variables
const App = () => {
  return (
    <CartProvider>
      <AuthProvider>
        <ShopCartProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <Router fallback={<NotFoundPage />}>
              <Route path="/" component={HomePage} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/products" component={ShopifyProductsPage} />
              <Route path="/product" component={ProductPage} />
              <Route path="/cart" component={ShopifyCartPage} />
              <Route path="/login" component={ShopifyLoginPage} />
              <Route path="/shop" component={ShopPage} />
              <Route path="/shop-cart" component={ShopCartPage} />
              <Route path="/privacy" component={PrivacyPage} />
              <Route path="/terms" component={TermsPage} />
              <Route path="/shipping" component={ShippingPage} />
              <Route path="/track-order" component={TrackOrderPage} />
              <Route path="/membership" component={MembershipPage} />
              <Route path="/blogs/:blogHandle/:articleHandle" component={BlogPostPage} />
            </Router>
          </Suspense>
        </ShopCartProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
