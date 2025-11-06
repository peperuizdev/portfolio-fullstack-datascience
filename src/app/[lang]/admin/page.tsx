'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bot, Zap, LogOut, Shield, Key } from 'lucide-react'

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth-token='))
        ?.split('=')[1]

      if (token) {
        setIsAuthenticated(true)
      } else {
        router.push('/es/admin/login')
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }))
    setPasswordStatus('idle')
    setErrorMessage('')
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus('error')
      setErrorMessage('Las contraseñas no coinciden')
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordStatus('error')
      setErrorMessage('La nueva contraseña debe tener al menos 6 caracteres')
      return
    }

    setIsChangingPassword(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      })

      if (response.ok) {
        setPasswordStatus('success')
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setTimeout(() => {
          setShowPasswordForm(false)
          setPasswordStatus('idle')
        }, 2000)
      } else {
        const errorData = await response.json()
        setPasswordStatus('error')
        setErrorMessage(errorData.message || 'Error al cambiar la contraseña')
      }
    } catch (error) {
      setPasswordStatus('error')
      setErrorMessage('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleLogout = () => {
    document.cookie = 'auth-token=; Max-Age=0; path=/;'
    router.push('/es/admin/login')
  }

  if (isLoading) {
    return (
      <div 
        className="flex items-center justify-center min-h-screen text-black"
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <p className="text-xl">Cargando...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div
      className="relative min-h-screen text-black"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-6xl px-8 md:px-12">
          {/* Título principal */}
          <div className="mb-16 text-left md:mb-20">
            <h1 className="name-text text-5xl leading-[0.8] font-black uppercase md:text-6xl lg:text-8xl">
              Panel de Administración
            </h1>
          </div>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Información */}
            <div className="space-y-12">
              <div className="text-left">
                <h2 className="mb-6 text-2xl font-black uppercase md:text-3xl">
                  Centro de Automatización
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl">
                  Panel preparado para la integración de agentes virtuales y automatizaciones avanzadas. 
                  Gestiona tu portfolio con inteligencia artificial y flujos de trabajo automatizados.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Área protegida - Próximamente con IA</span>
                </div>
              </div>

              {/* Características futuras */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Agentes Virtuales</h3>
                    <p className="text-gray-700">Automatización con n8n para gestión inteligente</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Flujos Automatizados</h3>
                    <p className="text-gray-700">Procesos inteligentes para contenido dinámico</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel de control */}
            <div className="bg-white p-8 shadow-sm md:p-12">
              <h3 className="mb-8 text-xl font-black uppercase">
                Herramientas Disponibles
              </h3>
              
              {!showPasswordForm ? (
                <div className="space-y-4">
                  <button 
                    onClick={() => setShowPasswordForm(true)}
                    className="group flex w-full items-center gap-4 bg-black px-6 py-4 font-medium text-white transition-all hover:scale-105 hover:bg-gray-800"
                  >
                    <Key className="h-5 w-5" />
                    <span>Cambiar Contraseña</span>
                  </button>
                  
                  <div className="group flex w-full items-center gap-4 border-2 border-gray-300 px-6 py-4 font-medium text-gray-400 cursor-not-allowed">
                    <Bot className="h-5 w-5" />
                    <span>Agentes IA (Próximamente)</span>
                  </div>
                  
                  <div className="group flex w-full items-center gap-4 border-2 border-gray-300 px-6 py-4 font-medium text-gray-400 cursor-not-allowed">
                    <Zap className="h-5 w-5" />
                    <span>Automatizaciones (Próximamente)</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6 flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setShowPasswordForm(false)
                        setPasswordStatus('idle')
                        setErrorMessage('')
                        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
                      }}
                      className="text-gray-600 hover:text-black"
                    >
                      ← Volver
                    </button>
                  </div>
                  
                  {passwordStatus === 'success' && (
                    <div className="mb-6 rounded border border-green-200 bg-green-100 p-4 text-green-800">
                      ¡Contraseña actualizada correctamente!
                    </div>
                  )}

                  {passwordStatus === 'error' && (
                    <div className="mb-6 rounded border border-red-200 bg-red-100 p-4 text-red-800">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Contraseña Actual *
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full border px-4 py-3 text-black transition-colors focus:outline-none border-gray-300 focus:border-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Nueva Contraseña *
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full border px-4 py-3 text-black transition-colors focus:outline-none border-gray-300 focus:border-black"
                        minLength={6}
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Confirmar Nueva Contraseña *
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full border px-4 py-3 text-black transition-colors focus:outline-none border-gray-300 focus:border-black"
                        minLength={6}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isChangingPassword}
                      className="w-full cursor-pointer bg-black px-8 py-4 font-medium text-white transition-all hover:scale-105 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:scale-100"
                    >
                      {isChangingPassword ? 'Actualizando...' : 'Actualizar Contraseña'}
                    </button>
                  </form>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="group flex w-full items-center justify-center gap-3 bg-red-600 px-6 py-4 font-medium text-white transition-all hover:scale-105 hover:bg-red-700"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}