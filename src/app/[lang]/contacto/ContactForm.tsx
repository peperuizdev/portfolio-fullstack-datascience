'use client'

import { useState, useEffect } from 'react'
import { Locale } from '@/lib/i18n'

interface ContactFormProps {
  lang: Locale
}

export default function ContactForm({ lang }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [showErrors, setShowErrors] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  // Auto-ocultar mensaje de éxito después de 5 segundos
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  const validateField = (name: string, value: string) => {
    let error = ''

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Este campo es obligatorio'
        } else if (value.trim().length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres'
        }
        break
      case 'email':
        if (!value.trim()) {
          error = 'Este campo es obligatorio'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Por favor, introduce un email válido'
        }
        break
      case 'subject':
        if (!value.trim()) {
          error = 'Este campo es obligatorio'
        } else if (value.trim().length < 3) {
          error = 'El asunto debe tener al menos 3 caracteres'
        }
        break
      case 'message':
        if (!value.trim()) {
          error = 'Este campo es obligatorio'
        } else if (value.trim().length < 10) {
          error = 'El mensaje debe tener al menos 10 caracteres'
        }
        break
    }

    return error
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpiar error específico si el usuario está escribiendo y ya había errores mostrados
    if (showErrors && errors[name as keyof typeof errors]) {
      const error = validateField(name, value)
      if (!error) {
        setErrors((prev) => ({
          ...prev,
          [name]: '',
        }))
      }
    }
  }

  const validateForm = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message),
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setShowErrors(true)
      return
    }

    setIsSubmitting(true)

    // Simular envío del formulario
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({ name: '', email: '', subject: '', message: '' })
      setShowErrors(false)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 p-8 md:p-12">
      <h3 className="mb-8 text-xl font-bold tracking-wide uppercase">
        Envíame un mensaje
      </h3>

      {submitStatus === 'success' && (
        <div className="mb-6 rounded border border-blue-200 bg-blue-100 p-4 text-blue-800">
          ¡Mensaje enviado correctamente! Te responderé pronto.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 rounded border border-red-200 bg-red-100 p-4 text-red-800">
          Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border px-4 py-3 text-black transition-colors focus:outline-none ${
              showErrors && errors.name
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-black'
            }`}
            placeholder="Tu nombre"
          />
          {showErrors && errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email *
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border px-4 py-3 text-black transition-colors focus:outline-none ${
              showErrors && errors.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-black'
            }`}
            placeholder="tu@email.com"
          />
          {showErrors && errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Asunto *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full border px-4 py-3 text-black transition-colors focus:outline-none ${
              showErrors && errors.subject
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-black'
            }`}
            placeholder="¿De qué quieres hablar?"
          />
          {showErrors && errors.subject && (
            <p className="mt-2 text-sm text-red-600">{errors.subject}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Mensaje *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`w-full resize-none border px-4 py-3 text-black transition-colors focus:outline-none ${
              showErrors && errors.message
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-black'
            }`}
            placeholder="Cuéntame sobre tu proyecto o idea..."
          />
          {showErrors && errors.message && (
            <p className="mt-2 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-black px-8 py-4 font-medium text-white transition-all hover:scale-105 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:scale-100"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">* Campos obligatorios</p>
    </div>
  )
}