import { SITE_CONFIG } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="w-full py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-8 md:px-12">
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 {SITE_CONFIG.name} • {SITE_CONFIG.email}
          </p>
        </div>
      </div>
    </footer>
  )
}