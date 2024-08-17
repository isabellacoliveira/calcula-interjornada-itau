import emailjs from '@emailjs/browser';

interface Colaborador {
    email: string;
    nome: string; 
    horaParaTrabalhar: string;
}

export const enviarEmail = (colaborador: Colaborador) => {
  const templateParams = {
    to_name: colaborador.nome,
    to_email: colaborador.email,
    horario: colaborador.horaParaTrabalhar, // mais 30 minutos 
    //condição para o sábado
    message: 'Você já pode começar a trabalhar agora.',
  };

  emailjs.send('service_m2m4h8g', 'template_75963yp', templateParams, 'zmybXa9jMdzafexdQ')
    .then((response: any) => {
      console.log('Email enviado com sucesso!', response.status, response.text);
    })
    .catch((error: any) => {
      console.error('Erro ao enviar email:', error);
    });
};
