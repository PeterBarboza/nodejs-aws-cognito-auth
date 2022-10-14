import { cognitoIdentityServiceProvider } from "./CognitoIdentityServiceProvider"

import { CONFIG } from "../../config"

export type respondToAuthChallengeParams = {
  challengeName: string
  session?: string
  challengeResponses: any
}

export class RespondAuthChallenge {
  async execute({
    challengeName,
    session = undefined,
    challengeResponses
  }: respondToAuthChallengeParams) {
    const authResult = await cognitoIdentityServiceProvider.respondToAuthChallenge({
      ChallengeName: challengeName,
      ClientId: CONFIG.aws.cognito.clientId,
      Session: session,
      ChallengeResponses: challengeResponses
    }).promise()

    const result = {
      authenticationResult: authResult.AuthenticationResult,
      challengeName: authResult.ChallengeName,
      challengeParameters: authResult.ChallengeParameters,
      session: authResult.Session
    }

    return result
  }
}