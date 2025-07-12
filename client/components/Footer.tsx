import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, ForkKnife } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Link from 'next/link'

function Footer() {
  return (
     <div>
      {/* CTA Section */}
      <section className="bg-green-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Stay Updated with Our Latest News</h2>
          <p className="text-lg md:text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Get exclusive updates on new menu items, special offers, and upcoming events delivered straight to your
            inbox.
          </p>

          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white border-white text-black placeholder:text-gray-500 focus:ring-2 focus:ring-black"
                required
              />
              <Button type="submit" className="bg-green-400 text-white hover:bg-gray-800 px-8 py-2 font-semibold">
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-black/70 mt-3">No spam, unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Restaurant Info */}
            <div className="space-y-4">
             <Link href={"/"} className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            {/* <ShoppingCart className="w-5 h-5 text-white" /> */}
            <ForkKnife className="w-5 h-5 font-extrabold text-white"/>
            {/* <Image src={Logo} height={100} width={100} alt="logo" /> */}
          </div>
          <span className="text-xl font-semibold text-white">foodCart</span>
        </Link>
        
              <p className="text-gray-300">
                Authentic Italian cuisine crafted with love and the finest ingredients. Experience the taste of Italy in
                every bite.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">123 Main Street, Downtown, NY 10001</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">info@foodCart.com</span>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Opening Hours</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <div className="text-gray-300">
                    <div>Mon - Thu: 11:00 AM - 10:00 PM</div>
                    <div>Fri - Sat: 11:00 AM - 11:00 PM</div>
                    <div>Sunday: 12:00 PM - 9:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links & Social */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <div className="space-y-2">
                <a href="#menu" className="block text-gray-300 hover:text-green-400 transition-colors">
                  Our Menu
                </a>
                <a href="#reservations" className="block text-gray-300 hover:text-green-400 transition-colors">
                  Reservations
                </a>
                <a href="#events" className="block text-gray-300 hover:text-green-400 transition-colors">
                  Private Events
                </a>
                <a href="#about" className="block text-gray-300 hover:text-green-400 transition-colors">
                  About Us
                </a>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <h5 className="text-sm font-semibold text-white mb-3">Follow Us</h5>
                <div className="flex gap-3">
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} foodCart Restaurant. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer