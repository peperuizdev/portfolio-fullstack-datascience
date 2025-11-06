import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { jwtVerify } from 'jose'

const prisma = new PrismaClient()
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key'

export async function POST(req: Request) {
  const body = await req.json()
  const { currentPassword, newPassword } = body

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ message: 'Contraseña actual y nueva son requeridas' }, { status: 400 })
  }

  try {
    // Obtener el token del header Authorization o cookies
    const authHeader = req.headers.get('authorization')
    const cookieHeader = req.headers.get('cookie')
    
    let token = null
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7)
    } else if (cookieHeader) {
      const cookies = cookieHeader.split('; ')
      const authCookie = cookies.find(cookie => cookie.startsWith('auth-token='))
      if (authCookie) {
        token = authCookie.split('=')[1]
      }
    }

    if (!token) {
      return NextResponse.json({ message: 'Token de autenticación requerido' }, { status: 401 })
    }

    // Verificar el token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY))
    const userId = payload.id as number

    // Buscar al usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 })
    }

    // Verificar la contraseña actual
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ message: 'Contraseña actual incorrecta' }, { status: 401 })
    }

    // Hash de la nueva contraseña
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // Actualizar la contraseña en la base de datos
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    })

    return NextResponse.json({ message: 'Contraseña actualizada correctamente' }, { status: 200 })
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const config = {
  runtime: 'nodejs',
}