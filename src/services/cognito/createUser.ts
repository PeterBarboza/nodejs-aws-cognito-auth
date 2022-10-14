import { cognitoIdentityServiceProvider } from "./CognitoIdentityServiceProvider"

import { CONFIG } from "../../config"

export type createUserParams = {
  email: string,
  groups: string[]
}

export class CreateUser {
  async execute(params: createUserParams) {
    const user = await cognitoIdentityServiceProvider.adminCreateUser({
      Username: params.email,
      UserPoolId: CONFIG.aws.cognito.userPoolId,
      TemporaryPassword: "@Temporary_Pass01"
    }).promise()

    await Promise.all(
      params.groups.map(async (groupName) => {
        return await cognitoIdentityServiceProvider
          .adminAddUserToGroup({
            GroupName: groupName,
            UserPoolId: CONFIG.aws.cognito.userPoolId,
            Username: params.email,
          })
          .promise()
      })
    )

    const attributes = user.User?.Attributes || []

    const id = attributes.find((a) => a.Name == 'sub')?.Value

    return { id, email: params.email, groups: params.groups }
  }
}