import nodemailer from "nodemailer"
class MailService {
    transport;

    constructor() {
        try{
            const connectionOption = {
                host : process.env.SMTP_HOST,
                port : process.env.SMTP_PORT,
                auth : {
                    user : process.env.SMTP_USER,
                    pass : process.env.SMTP_PASSWORD
                }                
            }
            if(process.env.SMTP_PROVIDER === "gmail") {
                connectionOption = {
                    ...connectionOption,
                    service : "gmail"
                }
            }
            this.transport = nodemailer.createTransport(connectionOption)
            console.log("Email connected sucessfully.")    
        }catch(exception) {
            console.log("Error connecting email server ...", exception)
            throw {
                message : "Error connecting email server ....",
                detail : exception,
                status  : "SMTP_Connection_Error" 
            };
        }
    }
    mailSend = async ({to, sub, message}) => {
        try { 
            const response = await this.transport.sendMail({
                to : to,
                from : process.env.SMTP_FROM,
                subject : sub,
                html : message
            })
            console.log(response)
            return ;
        }catch (exception) {
            console.log("The error in the smtp is __\n",exception);
            throw {
                message : "Error sending mail",
                detail : exception,
                status : "Error_Sending_Mail"
            }
        }
    }
}

const mailservice = new MailService()
export default mailservice

