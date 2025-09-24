import Mailgen from "mailgen";
import nodemailer from "nodemailer";



const sendEmail = async (Options) => {
    const mailGenerator = new Mailgen({
        theme : "default",
        product : {
            name : "Task Manager",
            link : "https://taskmanagerlink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(Options.mailgenContent);

    const emailHtml = mailGenerator.generate(Options.mailgenContent);

    const transporter = nodemailer.createTransport({
        host : process.env.MAILTRAP_SMTP_HOST,
        port : process.env.MAILTRAP_SMTP_PORT,
        auth : {
            user : process.env.MAILTRAP_SMTP_USER,
            pass : process.env.MAILTRAP_SMTP_PASSWORD
        }
    })


    const mail = {
        from:"mail.taskmanager@example.com",
        to : Options.email,
        subject : Options.subject,
        text : emailTextual,
        html : emailHtml
    }

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.log("Email could not be sent", error);
    }

}




const emailVerificationMailgenContent= (username, verificationUrl) => {
    return {
        body: {
            name : username,
            intro : "Welcome to our App! We are excited to have you on board.",
            action: {
                instructions: "To verify your email please click on the following button",
                button: {
                    color: "#1aae5aff",
                    text: "Verify Your Email",
                    link: verificationUrl
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    };
};

const forgotPasswordMailgenContent= (username, passwordResetUrl) => {
    return {
        body: {
            name : username,
            intro : "we got a request to reset your password",
            action: {
                instructions: "To reset your password please click on the following button",
                button: {
                    color: "#22BC66",
                    text: "Verify Your Email",
                    link: passwordResetUrl
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    };
};


export {sendEmail, emailVerificationMailgenContent, forgotPasswordMailgenContent};