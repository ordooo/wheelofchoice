import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Decision-Making Blog | Wheel of Choice",
  description:
    "Explore articles about decision-making, overcoming decision fatigue, and how randomness can help simplify your choices.",
}

// Blog post data
const blogPosts = [
  {
    slug: "why-decision-making-is-so-hard",
    title: "Why Decision-Making Is So Hard (and What to Do About It)",
    excerpt:
      "Learn about the psychological factors that make decisions difficult and discover practical strategies to overcome decision paralysis.",
    date: "April 7, 2024",
    readTime: "5 min read",
  },
  // More posts can be added here in the future
]

export default function BlogPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Decision-Making Blog</h1>

      <p className="text-lg text-gray-600 mb-8">
        Explore our articles about decision-making challenges, strategies to overcome decision fatigue, and how tools
        like the Wheel of Choice can help simplify your daily choices.
      </p>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors mb-2">
                {post.title}
              </h2>
            </Link>

            <div className="flex items-center text-sm text-gray-500 mb-3">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>

            <p className="text-gray-600 mb-4">{post.excerpt}</p>

            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
            >
              Read more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-100">
        <h2 className="text-xl font-bold text-blue-800 mb-3">Can't Decide?</h2>
        <p className="text-blue-700 mb-4">Stop overthinking and let our random picker wheel make the choice for you!</p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block"
        >
          Try the Wheel of Choice Now
        </Link>
      </div>
    </div>
  )
}

