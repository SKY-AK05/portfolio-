"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail, Twitter, Send } from "lucide-react"

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer entrance
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animate social icons
      const socialIcons = footerRef.current?.querySelectorAll(".social-icon")
      if (socialIcons) {
        socialIcons.forEach((icon, index) => {
          gsap.to(icon, {
            y: "+=5",
            duration: 1.5 + index * 0.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          })
        })
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)

    // Animate form submission
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    })
  }

  return (
    <footer ref={footerRef} className="bg-charcoal text-cream-white py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="footer-pattern" patternUnits="userSpaceOnUse" width="50" height="50">
              <circle cx="25" cy="25" r="2" fill="currentColor" />
              <path
                d="M10,10 Q25,5 40,10 Q45,25 40,40 Q25,45 10,40 Q5,25 10,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold mb-6">Building something human-first?</h2>
            <p className="font-patrick-hand text-xl opacity-80 mb-8">Let's talk.</p>
            <div className="w-24 h-1 bg-muted-lavender mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card className="border-3 border-cream-white bg-cream-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-caveat text-2xl text-cream-white">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-cream-white/20 border-2 border-cream-white/30 text-cream-white placeholder:text-cream-white/60 font-patrick-hand focus:border-muted-lavender"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-cream-white/20 border-2 border-cream-white/30 text-cream-white placeholder:text-cream-white/60 font-patrick-hand focus:border-muted-lavender"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project, your struggles, or just say hello..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="bg-cream-white/20 border-2 border-cream-white/30 text-cream-white placeholder:text-cream-white/60 font-patrick-hand focus:border-muted-lavender resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-muted-lavender hover:bg-muted-lavender/80 text-charcoal border-2 border-muted-lavender font-patrick-hand text-lg py-3"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Social */}
            <div className="space-y-8">
              <div>
                <h3 className="font-caveat text-2xl font-bold mb-4">Other Ways to Connect</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@sniff.dev"
                    className="flex items-center space-x-3 text-cream-white/80 hover:text-cream-white transition-colors duration-300 font-patrick-hand text-lg"
                  >
                    <Mail className="w-5 h-5" />
                    <span>hello@sniff.dev</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-caveat text-2xl font-bold mb-4">Find Me Online</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/sniff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-12 h-12 bg-cream-white/20 border-2 border-cream-white/30 rounded-full flex items-center justify-center hover:bg-muted-lavender hover:border-muted-lavender transition-all duration-300 group"
                  >
                    <Github className="w-5 h-5 text-cream-white group-hover:text-charcoal" />
                  </a>
                  <a
                    href="https://twitter.com/sniff_dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-12 h-12 bg-cream-white/20 border-2 border-cream-white/30 rounded-full flex items-center justify-center hover:bg-muted-lavender hover:border-muted-lavender transition-all duration-300 group"
                  >
                    <Twitter className="w-5 h-5 text-cream-white group-hover:text-charcoal" />
                  </a>
                </div>
              </div>

              <div className="bg-cream-white/10 border-2 border-cream-white/20 rounded-2xl p-6">
                <h4 className="font-caveat text-xl font-bold mb-3">Response Time</h4>
                <p className="font-patrick-hand text-cream-white/80 leading-relaxed">
                  I typically respond within 24-48 hours. If you're reaching out about accessibility or
                  neurodivergent-focused projects, I'll prioritize your message.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-16 pt-8 border-t border-cream-white/20 text-center">
            <p className="font-patrick-hand text-cream-white/60 mb-4">
              Built with empathy, powered by curiosity, designed for humans.
            </p>
            <p className="font-patrick-hand text-sm text-cream-white/40">
              © 2024 SNiFF. Made with care for minds that think differently.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
