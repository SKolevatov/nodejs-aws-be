import {APIGatewayRequestAuthorizerHandler} from 'aws-lambda';
import 'source-map-support/register';

const BASIC_AUTH_METHOD = 'Basic';

export const basicAuthorizer: APIGatewayRequestAuthorizerHandler = (event, _ctx, cb) => {
    console.log(JSON.stringify(event));
    try {
        const authorizationHeader = event.headers.Authorization || '';
        const [authMethod, authToken] = authorizationHeader.split(' ');
        if (authMethod !== BASIC_AUTH_METHOD || !authToken) {
            cb('Unauthorized');
        }
        const decodedString = Buffer.from(authToken, 'base64').toString('utf-8');
        const [login, password] = decodedString.split(/:(.+)/);
        const effect = (process.env[login] && process.env[login] === password) ? 'Allow' : 'Deny';
        const policy = generatePolicy(authToken, event.methodArn, effect);
        cb(null, policy);
    } catch (e) {
        console.error(e);
        cb('Unauthorized');
    }

    function generatePolicy (principalId, resource, effect) {
        return {
            principalId,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: effect,
                        Resource: resource
                    }
                ]
            }
        }
    }
};
