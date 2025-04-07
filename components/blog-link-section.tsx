import Link from "next/link"

export function BlogLinkSection() {
  return (
    <section className="mt-8 text-center bg-white p-8 rounded-lg shadow-md">
      <p className="text-lg text-gray-700 mb-2">
        Curious why decisions feel so hard sometimes?{" "}
        <Link
          href="/blog/why-decision-making-is-so-hard"
          className="text-blue-600 underline hover:text-blue-800 transition-colors"
        >
          Read our guide on decision-making challenges →
        </Link>
      </p>
    </section>
  )
}

