import { Context, APIGatewayProxyResult } from 'aws-lambda';
import { InteractionResponseType, InteractionType } from 'discord.js';
import * as nacl from 'tweetnacl';

const PUBLIC_KEY = "98df30da7be2f25c5dd256cbd7db038a93325e2df604404314649e9be08b60c8"
export const handler = async (event: any, context: Context): Promise<APIGatewayProxyResult> => {
    try {
        

        const signature = event.headers['x-signature-ed25519'];
        const timestamp = event.headers['x-signature-timestamp'];

        const isVerified = nacl.sign.detached.verify(
            Buffer.from(timestamp + event.body),
            Buffer.from(signature, 'hex'),
            Buffer.from(PUBLIC_KEY, 'hex')
        );
        
        if (!isVerified) {
        return {
            statusCode: 401,
            body: JSON.stringify('invalid request signature'),
        };
        }


        const body = JSON.parse(event.body || '');
        const type = body.type;

        if (type === InteractionType.Ping) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    type: InteractionResponseType.Pong
                })
            }
        } else if (type === 2) {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  type: 4,
                  data: {
                    content: 'PONG!',
                  },
                }),
              };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify("unhandled request type")
            }
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Failed to process message",
                error: JSON.stringify(error, undefined, 2),
            })
        }
    }
};