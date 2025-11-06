'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const { token } = await response.json()

        // Almacenar el token en las cookies
        document.cookie = `auth-token=${token}; path=/; max-age=3600`

        setSubmitStatus('success')
        router.push('/admin') // Redirigir al panel de administración
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="relative min-h-screen text-black"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-6xl px-8 md:px-12">
          {/* Título principal */}
          <div className="mb-16 text-left md:mb-20">
            <h1 className="name-text text-5xl leading-[0.8] font-black uppercase md:text-6xl lg:text-8xl">
              ADMINISTRACIÓN
            </h1>
          </div>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Información */}
            <div className="space-y-12">
              <div className="text-left">
                <h2 className="mb-6 text-2xl font-black uppercase md:text-3xl">
                  Bienvenido Administrador
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl">
                  Por favor, introduce tus credenciales para acceder al panel de administración.
                </p>
              </div>
            </div>

            {/* Formulario de inicio de sesión */}
            <div className="bg-gray-50 p-8 md:p-12">
              {submitStatus === 'success' && (
                <div className="mb-6 rounded border border-blue-200 bg-blue-100 p-4 text-blue-800">
                  ¡Inicio de sesión exitoso!
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 rounded border border-red-200 bg-red-100 p-4 text-red-800">
                  Credenciales incorrectas. Por favor, inténtalo de nuevo.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border px-4 py-3 text-black transition-colors focus:outline-none border-gray-300 focus:border-black"
                    placeholder="jorsqn@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border px-4 py-3 text-black transition-colors focus:outline-none border-gray-300 focus:border-black"
                    placeholder="********"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer bg-black px-8 py-4 font-medium text-white transition-all hover:scale-105 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
              </form>

              <p className="mt-4 text-sm text-gray-600">* Campos obligatorios</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}