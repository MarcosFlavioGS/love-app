import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Check if we have the required environment variables
if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not set');
}
if (!process.env.NOTIFICATION_EMAIL) {
  console.error('NOTIFICATION_EMAIL is not set');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, phone, answers } = await request.json();
    console.log('Received submission:', { name, phone, answers });

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Nome e telefone são obrigatórios' },
        { status: 400 }
      );
    }

    // Only try to send email if we have the required environment variables
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: process.env.NOTIFICATION_EMAIL,
          subject: `Nova resposta de ${name}!`,
          html: `
            <h1>Nova resposta do seu app de paquera!</h1>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
            <h2>Respostas:</h2>
            <pre>${JSON.stringify(answers, null, 2)}</pre>
          `,
        });
        console.log('Email enviado com sucesso');
      } catch (emailError) {
        console.error('Falha ao enviar email:', emailError);
        return NextResponse.json(
          { error: 'Falha ao enviar notificação por email' },
          { status: 500 }
        );
      }
    } else {
      console.error('Variáveis de ambiente para email não configuradas');
      return NextResponse.json(
        { error: 'Serviço de email não configurado' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao processar submissão:', error);
    return NextResponse.json(
      { error: 'Falha ao processar submissão', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
} 