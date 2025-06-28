import Navbar from "@/components/navbar"
import HeroCarousel from "@/components/hero-carousel"
import IntroStats from "@/components/intro-stats"
import WhyChooseUs from "@/components/why-choose-us"
import CTABanner from "@/components/cta-banner"
import TestimonialCarousel from "@/components/testimonial-carousel"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      <main>
        <HeroCarousel />
        <IntroStats />
        <WhyChooseUs />
        <CTABanner />
        <TestimonialCarousel />
      </main>
      <Footer />
    </div>
  )
}
