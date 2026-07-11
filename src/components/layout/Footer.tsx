import { Compass, Heart, X, GitBranch, Link2 } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800/50 bg-neutral-950 mt-24" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                <Compass className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">Stay</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Finder</span>
              </span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Discover the world&apos;s finest accommodations. From luxury city hotels to boutique
              beach resorts — your perfect stay is just a search away.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: <X className="h-4 w-4" />, href: '#', label: 'X (Twitter)' },
                { icon: <GitBranch className="h-4 w-4" />, href: '#', label: 'GitHub' },
                { icon: <Link2 className="h-4 w-4" />, href: '#', label: 'LinkedIn' },
              ].map(({ icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-800 text-neutral-400 hover:text-neutral-100 hover:border-neutral-700 hover:bg-neutral-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {['About', 'Careers', 'Blog', 'Press'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {currentYear} StayFinder. All rights reserved. Powered by SearchAPI.
          </p>
          <p className="text-xs text-neutral-500 flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for travelers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
