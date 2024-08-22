import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

interface Colaborador {
  email: string;
  nome: string;
  horaParaTrabalhar: string;
  mensagem: string; 
}

export const enviarEmail = (colaborador: Colaborador) => {
  const templateParams = {
    to_name: colaborador.nome,
    to_email: colaborador.email,
    horario: colaborador.horaParaTrabalhar, 
    message: colaborador.mensagem,
  };

  emailjs.send('service_m2m4h8g', 'template_75963yp', templateParams, 'zmybXa9jMdzafexdQ')
    .then((response: any) => {
      toast.success('Email enviado com sucesso!', response.status + response.text);
    })
    .catch((error: any) => {
      toast.error('Erro ao enviar email:', error);
    });
};
