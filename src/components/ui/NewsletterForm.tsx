'use client'

export default function NewsletterForm({ id = 'newsletter' }: { id?: string }) {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Newsletter signup form"
    >
      <input
        type="email"
        placeholder="Enter your email address"
        required
        className="flex-1 px-4 py-3 rounded-full border border-[#F0EAD8] bg-white
                   font-body text-sm text-[#1C1C1E] placeholder:text-[#6E6A66]/50
                   focus:outline-none focus:border-[#1A3A5C] focus:ring-2 focus:ring-[#1A3A5C]/20
                   transition-all duration-200"
        aria-label="Email address"
        id={`${id}-email`}
      />
      <button
        type="submit"
        className="btn-amber flex-shrink-0"
        id={`${id}-submit-btn`}
      >
        Subscribe
      </button>
    </form>
  )
}
