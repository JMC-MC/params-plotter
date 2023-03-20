const crypto = require('crypto');
const dotenv = require('dotenv');
const {
  CognitoIdentityProvider,
  ConfirmSignUpCommand,
} = require('@aws-sdk/client-cognito-identity-provider');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET_KEY;
const email = 'joecurrin@gmail.com';
const password = 'S-B945HNyjJ2rNd9';

exports.createUser = async () => {
  var params = {
    ClientId: clientId,
    Password: password,
    Username: email,
    SecretHash: hashSecret(clientSecret, email, clientId),
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  const provider = new CognitoIdentityProvider({
    region: 'ap-southeast-2',
  });

  try {
    const res = await provider.signUp(params);
    console.log('Signup success. Result: ', res);
  } catch (e) {
    console.log('Signup fail. Error: ', e);
  }
};

function hashSecret(clientSecret, username, clientId) {
  return crypto
    .createHmac('SHA256', clientSecret)
    .update(username + clientId)
    .digest('base64');
}

exports.confirmSignUp = async () => {
  var params = {
    ClientId: clientId,
    Username: email,
    ConfirmationCode: '537790',
    SecretHash: hashSecret(clientSecret, email, clientId),
  };

  const provider = new CognitoIdentityProvider({
    region: 'ap-southeast-2',
  });

  const command = new ConfirmSignUpCommand(params);

  try {
    const res = await provider.send(command);
    console.log('Confirmation successful Result: ', res);
  } catch (e) {
    console.log('Confirmation failed. Error: ', e);
  }
};
