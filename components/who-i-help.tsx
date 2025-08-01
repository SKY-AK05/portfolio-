"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Card, CardContent } from "@/components/ui/card"

const WhoIHelp = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const webRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  const helpCategories = [
    {
      id: "neurodivergent-devs",
      title: "Neurodivergent Developers",
      description: "Finding their rhythm in a neurotypical tech world",
      icon: "🧠",
      color: "bg-muted-lavender",
      position: { x: -200, y: -100 },
    },
    {
      id: "overwhelmed-creators",
      title: "Overwhelmed Creators",
      description: "Drowning in tools that promise to help but don't",
      icon: "🌊",
      color: "bg-champagne-beige",
      position: { x: 200, y: -80 },
    },
    {
      id: "accessibility-advocates",
      title: "Accessibility Advocates",
      description: "Fighting for inclusive design in their organizations",
      icon: "♿",
      color: "bg-cream-white",
      position: { x: -150, y: 120 },
    },
    {
      id: "quiet-leaders",
      title: "Quiet Leaders",
      description: "Leading with empathy in loud, fast-moving environments",
      icon: "🤫",
      color: "bg-muted-lavender",
      position: { x: 180, y: 140 },
    },
  ]

  const testimonials = [
    {
      quote:
        "SNiFF helped me realize that my ADHD wasn't a bug in my coding process—it was a feature that helped me see patterns others missed.",
      author: "Alex, Frontend Developer",
      role: "Mentee since 2023",
    },
    {
      quote:
        "The tools they built actually understand how my brain works. No more fighting against systems that weren't made for me.",
      author: "Sam, UX Designer",
      role: "Beta tester",
    },
    {
      quote: "Finally, someone who gets that accessibility isn't just about compliance—it's about human dignity.",
      author: "Jordan, Product Manager",
      role: "Collaborator",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animate empathy web
      const webItems = webRef.current?.querySelectorAll(".web-item")
      if (webItems) {
        gsap.fromTo(
          webItems,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2,
            scrollTrigger: {
              trigger: webRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Add floating animation
        webItems.forEach((item, index) => {
          gsap.to(item, {
            y: "+=15",
            duration: 2 + index * 0.3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          })
        })
      }

      // Animate testimonials
      const testimonialCards = testimonialsRef.current?.querySelectorAll(".testimonial-card")
      if (testimonialCards) {
        gsap.fromTo(
          testimonialCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Draw connection lines
      const lines = webRef.current?.querySelectorAll(".connection-line")
      if (lines) {
        gsap.fromTo(
          lines,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 2,
            ease: "power2.out",
            stagger: 0.3,
            scrollTrigger: {
              trigger: webRef.current,
              start: "top 60%",
              end: "bottom 40%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="container mx-auto px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-caveat text-6xl font-bold text-charcoal mb-6">Who I Help</h2>
          <p className="font-patrick-hand text-xl text-charcoal/80 max-w-2xl mx-auto">
            My work centers around people who think differently, feel deeply, and need technology that actually
            understands them.
          </p>
          <div className="w-32 h-1 bg-muted-lavender mx-auto rounded-full mt-6" />
        </div>

        {/* Empathy Web */}
        <div ref={webRef} className="relative h-96 mb-20">
          {/* Central hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-charcoal text-cream-white rounded-full w-32 h-32 flex items-center justify-center border-4 border-charcoal">
              <div className="text-center">
                <div className="text-2xl mb-1">🤝</div>
                <div className="font-patrick-hand text-sm font-semibold">
                  Empathy
                  <br />
                  First
                </div>
              </div>
            </div>
          </div>

          {/* Connection lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {helpCategories.map((category, index) => (
              <path
                key={`line-${index}`}
                className="connection-line"
                d={`M ${typeof window !== "undefined" ? window.innerWidth / 2 : 400} ${192} Q ${
                  (typeof window !== "undefined" ? window.innerWidth / 2 : 400) + category.position.x / 2
                } ${192 + category.position.y / 2} ${
                  (typeof window !== "undefined" ? window.innerWidth / 2 : 400) + category.position.x
                } ${192 + category.position.y}`}
                fill="none"
                stroke="#C5B4E3"
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0.6"
              />
            ))}
          </svg>

          {/* Help category bubbles */}
          {helpCategories.map((category, index) => (
            <div
              key={category.id}
              className={`web-item absolute ${category.color} border-3 border-charcoal rounded-2xl p-6 max-w-xs cursor-pointer hover:scale-105 transition-transform duration-300 group`}
              style={{
                left: `calc(50% + ${category.position.x}px)`,
                top: `calc(50% + ${category.position.y}px)`,
                transform: "translate(-50%, -50%)",
                borderStyle: "solid",
                filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
              }}
            >
              <div className="text-3xl mb-3 group-hover:animate-bounce">{category.icon}</div>
              <h3 className="font-caveat text-xl font-bold text-charcoal mb-2">{category.title}</h3>
              <p className="font-patrick-hand text-sm text-charcoal/80 leading-relaxed">{category.description}</p>
            </div>
          ))}
        </div>

        {/* Keywords */}
        <div className="text-center mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {["silent struggles", "non-performative help", "emotional clarity", "sustainable growth"].map((keyword) => (
              <span
                key={keyword}
                className="bg-muted-lavender text-charcoal px-4 py-2 rounded-full border-2 border-charcoal font-patrick-hand text-sm italic"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div ref={testimonialsRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="testimonial-card border-3 border-charcoal bg-cream-white hover:bg-champagne-beige transition-colors duration-300"
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-4 opacity-50">"</div>
                <p className="font-patrick-hand text-base text-charcoal leading-relaxed mb-4 italic">
                  {testimonial.quote}
                </p>
                <div className="border-t-2 border-muted-lavender pt-4">
                  <p className="font-caveat text-lg font-bold text-charcoal">{testimonial.author}</p>
                  <p className="font-patrick-hand text-sm text-charcoal/70">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhoIHelp
