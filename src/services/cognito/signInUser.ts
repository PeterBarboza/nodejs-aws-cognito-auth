// USER_PASSWORD_AUTH

import { cognitoIdentityServiceProvider } from "./CognitoIdentityServiceProvider"

import { CONFIG } from "../../config"

export type signInUserParams = {
  email: string,
  password: string
}

export class SignInUser {
  async execute({ email, password }: signInUserParams) {
    const authResult = await cognitoIdentityServiceProvider.initiateAuth({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CONFIG.aws.cognito.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    }).promise()

    const result = {
      accessToken: authResult.AuthenticationResult?.AccessToken,
      tokenType: authResult.AuthenticationResult?.TokenType,
      challengeName: authResult.ChallengeName,
      challengeParameters: authResult.ChallengeParameters,
      session: authResult.Session
    }

    return result
  }
}