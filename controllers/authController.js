const axios = require('axios');
const { CognitoJwtVerifier } = require('aws-jwt-verify');

const createSendToken = (token, req, res, expiresIn) => {
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + expiresIn * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });
};

exports.completeLogin = async (req, res, next) => {
  try {
    const cognitoResponse = await exchangeCodes(req.query.code);
    const token = await verifyToken(cognitoResponse.data.id_token, 'id');
    const expiresIn = cognitoResponse.data.expires_in;
    createSendToken(token, req, res, expiresIn);
    next();
  } catch (err) {
    console.error(err);
  }
};

exports.protected = async (req, res, next) => {
  try {
    let token;
    // Check for token
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      res.redirect(process.env.HOSTED_UI);
    }
    // Verify token
    await verifyToken(token, 'id');
    next();
  } catch (err) {
    console.error(err);
  }
};

const exchangeCodes = async (code) => {
  try {
    // Exchange authorization code for tokens
    const authorizationCode = code;
    const url = process.env.TOKEN_ENDPOINT;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET_KEY;
    const redirectUri = process.env.REDIRECT_URI;
    const basicString = Buffer.from(
      `${clientId}:${clientSecret}`,
      'utf8'
    ).toString('base64');

    let params = {
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code: authorizationCode,
    };
    const response = await postAuthCode(url, params, basicString);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const verifyToken = async (token, tokenUse) => {
  // Verifier that expects valid access tokens:
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.USER_POOL_ID,
    tokenUse: tokenUse,
    clientId: process.env.CLIENT_ID,
  });

  try {
    await verifier.verify(token);
    return token;
  } catch (error) {
    console.error(error);
  }
};

const postAuthCode = async (url, params, basicString) => {
  try {
    const postResponse = await axios.post(url, params, {
      headers: {
        Authorization: `Basic ${basicString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return postResponse;
  } catch (error) {
    console.error(error);
  }
};
