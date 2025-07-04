import { EventEmitter } from 'node:events';
import mailservice from '../service/mail.service.js'
const myEvent = new EventEmitter();

const EventName = {
    REGISTER_EMAIL : "registerEmail"
}
myEvent.on(EventName.REGISTER_EMAIL , async (data) => {
    try{

        await mailservice.mailSend({
            to : data.email,
            sub : "Activate your account",
            message : `
            Dear ${data.name} <br/>
            <p>Your account have been sucessfully created. Please click the link below or copy paste the url to activate your account</p> 
            <a href= "${process.env.FRONTEND_URL}/activate/${data.token}">${process.env.FRONTEND_URL}/activate/${data.token}</a>
            </br> 
            <p><strong>Note : </strong>Please do not reply to this email</p>

            <p>Regards</p>
            <p>System Administration</p>
            <p>${process.env.SMTP_FROM}</p>
            `
        })
        console.log("Register email send sucess")
    }catch(exception) {
        console.log(exception)
        process.exit(1)
    }
})




export  {myEvent, EventName};