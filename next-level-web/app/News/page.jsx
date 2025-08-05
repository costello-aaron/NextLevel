import axios from 'axios';
import Image from 'next/image';

export const dynamic = 'force-dynamic'; // optional: ensures fresh fetch on every request (disable caching)

export default async function NewsPage() {
  const apiKey = process.env.NEWSAPI_KEY;
  const query = '("US insurance" OR "American insurance" OR "United States insurance")';
  const url = `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=10&sortBy=relevancy&apiKey=${apiKey}`;

  let articles = [];
  let error = null;

  try {
    const response = await axios.get(url);
    articles = response.data.articles || [];
  } catch (err) {
    console.error('Error fetching news:', err);
    error = 'Failed to load news';
  }

  return (
    <div className="bg-gray-100 max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Latest News</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-6">
        {articles.map((article, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-64 object-cover rounded mb-4 text-black"
              />
            )}
            <h2 className="text-xl font-semibold text-black">{article.title}</h2>
            <p className="text-gray-600 mt-2">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
