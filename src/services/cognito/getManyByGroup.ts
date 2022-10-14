import { cognitoIdentityServiceProvider } from "./CognitoIdentityServiceProvider"

import { CONFIG } from "../../config"

export class GetManyByGroup {
  async execute(group: string) {
    const { Users = [] } = await cognitoIdentityServiceProvider
      .listUsersInGroup({
        GroupName: group,
        UserPoolId: CONFIG.aws.cognito.userPoolId,
      })
      .promise()

    const users = Users.map((user) => {
      const id = user.Attributes?.find((a) => a.Name == "sub")?.Value
      const email = user.Attributes?.find(a => a.Name == "email")?.Value

      return {
        id,
        email: email,
        enabled: user.Enabled,
        userStatus: user.UserStatus
      }
    })

    return { users: users }
  }
}

