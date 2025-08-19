import emailjs from '@emailjs/browser'

// Configuración de EmailJS
const EMAILJS_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
}

// Verificar que las variables estén configuradas
const checkConfig = () => {
  if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId) {
    console.error('EmailJS configuration is missing. Please check your environment variables.')
    return false
  }
  return true
}

// Inicializar EmailJS
export const initEmailJS = () => {
  if (checkConfig()) {
    emailjs.init(EMAILJS_CONFIG.publicKey)
  }
}

// Tipo para los datos del formulario
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Función para enviar email
export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  if (!checkConfig()) {
    console.error('EmailJS is not properly configured')
    return false
  }

  try {
    // Crear fecha formateada
    const now = new Date()
    const sentDate = now.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    const templateParams = {
      // Información del remitente 
      from_name: formData.name,
      from_email: formData.email,
      
      // Información del mensaje
      subject: formData.subject,
      message: formData.message,
      sent_date: sentDate,
      
      // Tu información (destinatario)
      to_name: 'Pepe Ruiz',
      to_email: 'jorsqn@gmail.com',
      
      // Para el reply-to (poder responder directamente al cliente)
      reply_to: formData.email,
      
      // Información adicional para el subject del email
      email_subject: `New Contact: ${formData.name} - ${formData.subject}`,
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    )

    console.log('Email sent successfully:', response.status, response.text)
    return response.status === 200
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}