'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, TrendingUp, Star, ChevronRight } from 'lucide-react';
import { initializeStorage, getCategoriesWithCounts, getAnalytics } from '@/lib/storage';
import { Business } from '@/lib/types';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [categories, setCategories] = useState<any[]>([]);
    const [trendingBusinesses, setTrendingBusinesses] = useState<Business[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        initializeStorage();
        setCategories(getCategoriesWithCounts());
        const analytics = getAnalytics();
        setTrendingBusinesses(analytics.trendingBusinesses.slice(0, 6));
    }, []);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('query', searchQuery);
        if (location) params.set('location', location);
        window.location.href = `/search?${params.toString()}`;
    };

    const handleCategoryClick = (categoryId: string) => {
        window.location.href = `/search?category=${categoryId}`;
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pastel-blue via-pastel-lavender to-pastel-pink">
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-3">
                            <img
                                src="/logo.png"
                                alt="Education Guide Logo"
                                className="h-12 w-auto object-contain"
                                onError={(e) => {
                                    // Fallback if image doesn't exist yet
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <div className="flex items-baseline">
                                <span className="text-2xl md:text-3xl font-bold text-[#0099FF]">EDUCATION</span>
                                <span className="text-lg md:text-xl font-bold text-[#E91E63] ml-1">GUIDE</span>
                            </div>
                        </Link>
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link href="/" className="text-gray-700 hover:text-pastel-purple-dark transition">Home</Link>
                            <Link href="/search" className="text-gray-700 hover:text-pastel-blue-dark transition">Browse</Link>
                            <Link href="/favorites" className="text-gray-700 hover:text-pastel-pink-dark transition">Favorites</Link>
                            <Link href="/contact" className="text-gray-700 hover:text-pastel-mint-dark transition">Contact</Link>
                            <Link href="/about" className="text-gray-700 hover:text-pastel-lavender-dark transition">About</Link>
                            <Link href="/admin" className="bg-gradient-to-r from-pastel-blue-dark to-pastel-purple-dark text-white px-4 py-2 rounded-lg hover:shadow-lg transition">
                                Admin
                            </Link>
                        </nav>
                        <button className="md:hidden p-2">
                            <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
                            <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
                            <div className="w-6 h-0.5 bg-gray-700"></div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12 animate-float">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Discover the Best
                            <span className="gradient-text"> Schools & Educational Institutions </span>
                            Near You
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Find top-rated schools, kindergartens, and educational centers in your area.
                            Read reviews, check facilities, and make informed decisions for your child's education.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-4 md:p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 flex items-center border-2 border-gray-200 rounded-lg px-4 py-3 focus-within:border-blue-500 transition">
                                <Search className="text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Search for schools, kindergartens..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="flex-1 outline-none text-gray-700"
                                />
                            </div>
                            <div className="flex-1 flex items-center border-2 border-gray-200 rounded-lg px-4 py-3 focus-within:border-blue-500 transition">
                                <MapPin className="text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Location (city, area...)"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="flex-1 outline-none text-gray-700"
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="bg-gradient-to-r from-pastel-blue-dark via-pastel-purple-dark to-pastel-pink-dark text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 px-4 bg-white/50">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Browse by Category</h2>
                        <Link href="/search" className="text-blue-600 hover:text-blue-700 flex items-center">
                            View All <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.slice(0, 16).map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 group"
                            >
                                <div className="text-5xl mb-3 group-hover:scale-110 transition">{category.icon}</div>
                                <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                                <p className="text-sm text-gray-500">{category.count} businesses</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Businesses */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center mb-8">
                        <TrendingUp className="w-8 h-8 text-orange-500 mr-3" />
                        <h2 className="text-3xl font-bold text-gray-800">Top Rated Schools</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trendingBusinesses.map((business) => (
                            <Link
                                key={business.id}
                                href={`/business/${business.id}`}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 overflow-hidden group"
                            >
                                <div className="h-48 relative overflow-hidden">
                                    {business.coverImage ? (
                                        <img
                                            src={business.coverImage}
                                            alt={business.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-pastel-peach via-pastel-yellow to-pastel-mint" />
                                    )}
                                    {business.verified && (
                                        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                                            ✓ Verified
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition">
                                        {business.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{business.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                            <span className="font-semibold text-gray-700">{business.rating}</span>
                                            <span className="text-gray-500 text-sm ml-1">({business.reviewCount})</span>
                                        </div>
                                        <span className="text-blue-600 text-sm font-medium">{business.priceRange}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-pastel-blue-dark via-pastel-lavender-dark to-pastel-pink-dark">
                <div className="container mx-auto max-w-4xl text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">Own a School or Educational Institution?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Get your institution listed on EducationGuide and reach thousands of parents and students
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white text-pastel-purple-dark px-8 py-4 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition"
                    >
                        Contact Us Today
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-  white py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="font-bold text-xl mb-4">EducationGuide</h3>
                            <p className="text-gray-400 text-sm">
                                Your trusted education directory. Find, review, and connect with the best schools and educational institutions in your area.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><Link href="/search" className="hover:text-white transition">Browse Schools</Link></li>
                                <li><Link href="/favorites" className="hover:text-white transition">My Favorites</Link></li>
                                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Popular Categories</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><Link href="/search?category=kindergartens" className="hover:text-white transition">Kindergartens</Link></li>
                                <li><Link href="/search?category=preschools" className="hover:text-white transition">Preschools</Link></li>
                                <li><Link href="/search?category=primary-schools" className="hover:text-white transition">Primary Schools</Link></li>
                                <li><Link href="/search?category=secondary-schools" className="hover:text-white transition">Secondary Schools</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Help</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                                <li><Link href="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition">Support</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                        <p>&copy; 2026 EducationGuide. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
