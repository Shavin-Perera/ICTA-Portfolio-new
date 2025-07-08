import Navbar from "@/components/navbar"
import HeroCarousel from "@/components/hero-carousel"
import IntroStats from "@/components/intro-stats"
import WhyChooseUs from "@/components/why-choose-us"
import CTABanner from "@/components/cta-banner"
import TestimonialCarousel from "@/components/testimonial-carousel"
import Footer from "@/components/footer"
import ReviewForm from "@/components/ReviewForm"
import HomeCarousel from "@/components/home-carousel"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HomeCarousel />
        <IntroStats />
        {/* <WhyChooseUs /> */}
        {/* <CTABanner /> */}
        <TestimonialCarousel />
        <ReviewForm />
      </main>
      <Footer />
    </div>
  )
}
