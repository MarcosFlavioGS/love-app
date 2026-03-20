import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Check if we have the required environment variables
if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not set')
}
if (!process.env.NOTIFICATION_EMAIL) {
  console.error('NOTIFICATION_EMAIL is not set')
}

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function POST(request: Request) {
  try {
    const { message, answers } = await request.json()
    console.log('Received submission:', { message, answers })

    // Validate required fields
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json({ error: 'Mensagem é obrigatória' }, { status: 400 })
    }

    // Only try to send email if we have the required environment variables
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: process.env.NOTIFICATION_EMAIL,
          subject: `Nova mensagem amorosa!`,
          html: `
            <h1>Nova resposta do seu app de paquera!</h1>
            <h2>Mensagem</h2>
            <p>${escapeHtml(message)}</p>
            <h2>Respostas:</h2>
            <pre>${JSON.stringify(answers, null, 2)}</pre>
          `
        })
        console.log('Email enviado com sucesso')
      } catch (emailError) {
        console.error('Falha ao enviar email:', emailError)
        return NextResponse.json({ error: 'Falha ao enviar notificação por email' }, { status: 500 })
      }
    } else {
      console.error('Variáveis de ambiente para email não configuradas')
      return NextResponse.json({ error: 'Serviço de email não configurado' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao processar submissão:', error)
    return NextResponse.json(
      {
        error: 'Falha ao processar submissão',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}
