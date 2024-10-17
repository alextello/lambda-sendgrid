import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const handler = async (event) => {
    const { detail } = event.Records[0]; // Assuming a simple event structure
    console.log(JSON.stringify(event))
    const { cliente, to, nombre_proceso, texto, subject, preheader } = detail;
    const msg = {
        from: 'ethicode.xela@gmail.com', // Reemplaza con la dirección del remitente
        templateId: process.env.EMAIL_TEMPLATE,
        subject: 'Recordatorio GTLEY',
        personalizations: [
            {
              to: to,
              dynamicTemplateData: {
                preheader,
                subject,
                nombre_proceso,
                cliente,
                texto
              },
            },
          ],
    };

    try {
        await sgMail.send(msg);
        console.log('Correo enviado correctamente');
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Correo enviado' }),
        };
    } catch (error) {
        console.error('Error al enviar el correo:', error.response ? error.response.body : error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al enviar el correo' }),
        };
    }
};