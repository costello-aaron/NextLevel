import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/insurance-logo.svg"
          alt="Insurance Agency Logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-2xl font-bold text-center sm:text-left">
          Welcome to Your Trusted Insurance Agency
        </h1>
        <p className="text-sm text-center sm:text-left">
          Protecting what matters most to you. Explore our services and get the coverage you need.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/CanopyConnect"
          >
            Get a Quote
          </a>
          <a
            className="rounded-full border border-solid border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="/contact-us"
          >
            Contact Us
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/about-us"
        >
          <Image
            aria-hidden
            src="/info.svg"
            alt="Info icon"
            width={16}
            height={16}
          />
          About Us
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/services"
        >
          <Image
            aria-hidden
            src="/services.svg"
            alt="Services icon"
            width={16}
            height={16}
          />
          Our Services
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/testimonials"
        >
          <Image
            aria-hidden
            src="/testimonials.svg"
            alt="Testimonials icon"
            width={16}
            height={16}
          />
          Testimonials
        </a>
      </footer>
    </div>
  );
}
