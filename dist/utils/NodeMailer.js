"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailer = void 0;
const nodeMailer = require("nodemailer");
const enviroment_1 = require("../enviroments/enviroment");
class NodeMailer {
    static initiateTransport() {
        return nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: (0, enviroment_1.getEnvVariables)().gmail_auth.user,
                pass: (0, enviroment_1.getEnvVariables)().gmail_auth.pass
            }
        }
        // sendGrid({
        //   auth: {
        //     api_key: getEnvVariables().gmail_auth,
        //   },
        // })
        );
    }
    static sendMail(data) {
        return NodeMailer.initiateTransport().sendMail({
            from: (0, enviroment_1.getEnvVariables)().gmail_auth.user,
            to: data.to,
            subject: data.subject,
            html: data.html,
        });
    }
}
exports.NodeMailer = NodeMailer;
// 8KWL6C5MYGBA61C61LL5XHFW
//RS7DJZZKEVAF1MQDEZBDCZ9Q
