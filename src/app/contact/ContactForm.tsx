'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío del formulario
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) 
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
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
        <div className="mb-6 rounded bg-green-100 p-4 text-green-800">
          ¡Mensaje enviado correctamente! Te responderé pronto.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 rounded bg-red-100 p-4 text-red-800">
          Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 text-black transition-colors focus:border-black focus:outline-none"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 text-black transition-colors focus:border-black focus:outline-none"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
            Asunto *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 text-black transition-colors focus:border-black focus:outline-none"
            placeholder="¿De qué quieres hablar?"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
            Mensaje *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 text-black transition-colors focus:border-black focus:outline-none resize-none"
            placeholder="Cuéntame sobre tu proyecto o idea..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black px-8 py-4 font-medium text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        * Campos obligatorios
      </p>
    </div>
  )
}