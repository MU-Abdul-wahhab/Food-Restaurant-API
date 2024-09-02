import * as nodeMailer from "nodemailer";
import * as sendGrid from "nodemailer-sendgrid-transport";
import { getEnvVariables } from "../enviroments/enviroment";

export class NodeMailer {
  private static initiateTransport() {
    return nodeMailer.createTransport(
      {
        service: 'gmail',
        auth:{
          user: getEnvVariables().gmail_auth.user,
          pass: getEnvVariables().gmail_auth.pass
        }
      }
      // sendGrid({
      //   auth: {
      //     api_key: getEnvVariables().gmail_auth,
      //   },
      // })
    );
  }

  static sendMail(data: {
    to: string[];
    subject: string;
    html: string;
  }): Promise<any> {
    return NodeMailer.initiateTransport().sendMail({
      from: getEnvVariables().gmail_auth.user,
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
  }
}

// 8KWL6C5MYGBA61C61LL5XHFW
//RS7DJZZKEVAF1MQDEZBDCZ9Q
