"use client";
import React, { useEffect, useState } from 'react';

const News = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://newsapi.org/v2/everything?q=insurance&apiKey=YOUR_API_KEY');
                const data = await response.json();
                setNewsArticles(data.articles);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="news-page bg-gray-100 min-h-screen py-10">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Recent Insurance News</h1>
                {loading ? (
                    <p className="text-gray-600">Loading news...</p>
                ) : (
                    <div className="news-articles space-y-6">
                        {newsArticles.map((article, index) => (
                            <div key={index} className="news-article border-b pb-4">
                                <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                                <p className="text-gray-600">{article.description}</p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    Read more
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
