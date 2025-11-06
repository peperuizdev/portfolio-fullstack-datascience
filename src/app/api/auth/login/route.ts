import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { SignJWT } from 'jose'
import { TextEncoder } from 'util'

const prisma = new PrismaClient()
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ message: 'Correo y contraseña son requeridos' }, { status: 400 })
  }

  try {
    // Buscar al usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { username: email },
    })

    if (!user) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 })
    }

    // Comparar la contraseña ingresada con el hash almacenado
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 })
    }

    // Generar el token JWT usando jose
    const token = await new SignJWT({ id: user.id, email: user.username, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(SECRET_KEY))

    return NextResponse.json({ token }, { status: 200 })
  } catch (error) {
    console.error('Error en el inicio de sesión:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const config = {
  runtime: 'nodejs', // Forzar el entorno de ejecución a Node.js
}