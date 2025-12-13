import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useRouter } from '../utils/Router';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import '../styles/CartPage.css';

export default function CartPage() {
    const { navigateTo } = useRouter();
    const {
        cart,
        loading,
        updateQuantity,
        removeItem,
        checkout,
        subtotal
    } = useCart();

    const handleQuantityChange = async (lineId: string, currentQuantity: number, delta: number) => {
        const newQuantity = currentQuantity + delta;
        if (newQuantity < 0) return;
        await updateQuantity(lineId, newQuantity);
    };

    if (loading && !cart) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header showCategories={false} />
                <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B4332]"></div>
                </main>
                <Footer />
            </div>
        );
    }

    const isEmpty = !cart || !cart.lines || cart.lines.length === 0;

    return (
        <div className="cart-page-container min-h-screen flex flex-col bg-gray-50">
            <Header showCategories={false} />

            <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-8 font-serif">Your Cart</h1>

                {isEmpty ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-[#F7F4ED] rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-10 h-10 text-[#DBB520]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#4A3F35] mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                        <button
                            onClick={() => navigateTo('/products')}
                            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-[#1B4332] text-white font-semibold transition-transform hover:scale-105 hover:bg-[#2E6F40]"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="p-6 md:p-8 space-y-8">
                                <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-semibold text-gray-500 border-b border-gray-100 pb-4">
                                    <div className="col-span-6">Product</div>
                                    <div className="col-span-2 text-center">Price</div>
                                    <div className="col-span-2 text-center">Quantity</div>
                                    <div className="col-span-2 text-right">Total</div>
                                </div>

                                {cart.lines.map((line: any) => {
                                    const merchandise = line.merchandise;
                                    const product = merchandise.product;
                                    const image = merchandise.image || product.featuredImage || product.images?.edges?.[0]?.node;

                                    return (
                                        <div key={line.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center border-b border-gray-50 last:border-0 pb-6 last:pb-0">
                                            {/* Product Info */}
                                            <div className="col-span-1 md:col-span-6 flex gap-4">
                                                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                                    {image && (
                                                        <img
                                                            src={image.url}
                                                            alt={image.altText || product.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <h3 className="font-bold text-[#1B4332] text-lg mb-1">{product.title}</h3>
                                                    <p className="text-sm text-gray-500 mb-2">{merchandise.title !== 'Default Title' ? merchandise.title : ''}</p>
                                                    <button
                                                        onClick={() => removeItem(line.id)}
                                                        className="text-red-500 text-sm hover:text-red-600 flex items-center gap-1 transition-colors w-fit"
                                                    >
                                                        <Trash2 className="w-3 h-3" /> Remove
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="col-span-1 md:col-span-2 flex md:justify-center items-center gap-2 md:gap-0">
                                                <span className="md:hidden text-gray-500 font-medium">Price: </span>
                                                <span className="font-medium text-[#4A3F35]">
                                                    {parseFloat(line.cost.amountPerQuantity.amount).toLocaleString('en-IN', {
                                                        style: 'currency',
                                                        currency: line.cost.amountPerQuantity.currencyCode
                                                    })}
                                                </span>
                                            </div>

                                            {/* Quantity */}
                                            <div className="col-span-1 md:col-span-2 flex md:justify-center items-center gap-2 md:gap-0">
                                                <span className="md:hidden text-gray-500 font-medium">Qty: </span>
                                                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                                                    <button
                                                        onClick={() => handleQuantityChange(line.id, line.quantity, -1)}
                                                        disabled={loading || line.quantity <= 1}
                                                        className="p-2 hover:bg-gray-100 text-[#4A3F35] disabled:opacity-30 transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={line.quantity}
                                                        readOnly
                                                        className="w-8 text-center bg-transparent text-sm font-medium focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={() => handleQuantityChange(line.id, line.quantity, 1)}
                                                        disabled={loading}
                                                        className="p-2 hover:bg-gray-100 text-[#4A3F35] disabled:opacity-30 transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Total */}
                                            <div className="col-span-1 md:col-span-2 flex md:justify-end items-center gap-2 md:gap-0">
                                                <span className="md:hidden text-gray-500 font-medium">Total: </span>
                                                <span className="font-bold text-[#1B4332]">
                                                    {parseFloat(line.cost.totalAmount.amount).toLocaleString('en-IN', {
                                                        style: 'currency',
                                                        currency: line.cost.totalAmount.currencyCode
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-80 xl:w-96 flex-shrink-0">
                            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-[#1B4332] mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6 border-b border-gray-100 pb-6">
                                    <div className="flex justify-between items-center text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-[#4A3F35]">
                                            {parseFloat(subtotal).toLocaleString('en-IN', {
                                                style: 'currency',
                                                currency: cart.cost.subtotalAmount.currencyCode || 'INR'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-sm italic">Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-lg font-bold text-[#1B4332] mb-6">
                                    <span>Total</span>
                                    <span>
                                        {parseFloat(subtotal).toLocaleString('en-IN', {
                                            style: 'currency',
                                            currency: cart.cost.subtotalAmount.currencyCode || 'INR'
                                        })}
                                    </span>
                                </div>

                                <button
                                    onClick={checkout}
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl bg-[#F8D548] text-[#1B4332] font-bold text-lg hover:bg-[#F3D55B] hover:shadow-lg transform transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mb-3"
                                >
                                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                                </button>

                                <button
                                    onClick={() => navigateTo('/')}
                                    className="w-full py-3 text-sm text-[#4A3F35] font-medium hover:text-[#1B4332] hover:underline transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
