import { cognitoIdentityServiceProvider } from "./CognitoIdentityServiceProvider"

import { CONFIG } from "../../config"

export type changePasswordParams = {
  accessToken: string,
  previousPassword: string
  proposedPassword: string
}

export class ChangePassword {
  async execute(params: changePasswordParams) {
    await cognitoIdentityServiceProvider.changePassword({
      AccessToken: params.accessToken,
      PreviousPassword: params.previousPassword,
      ProposedPassword: params.proposedPassword
    }).promise()
  }
}