import { Injectable, OnModuleInit } from "@nestjs/common";
import {Vonage} from '@vonage/server-sdk'
import { Auth } from '@vonage/auth';
@Injectable()
export class SmsService implements OnModuleInit {
    vonage: Vonage;

    constructor() {}

    onModuleInit() {
        const credentials = new Auth({
            apiKey: "8b0527ea",
            apiSecret: "MV7fwq03q8SyQPH1"
        });
        this.vonage =  new Vonage(credentials, {})

        // this.sendSMS()
    }
    async sendSMS() {
        const from = "YaMieu"
        const to = "84329577177"
        const text = 'hello nhe'
        await this.vonage.sms.send({to, from, text})
            .then(resp => { console.log('Message sent successfully'); console.log(resp); })
            .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
    }
}