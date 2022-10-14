import { CognitoIdentityServiceProvider, } from "aws-sdk"

import { CONFIG } from "../../config"

export const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
  apiVersion: "latest",
  region: CONFIG.aws.region,
  credentials: {
    accessKeyId: CONFIG.aws.accessKeyId,
    secretAccessKey: CONFIG.aws.secretAccessKey,
  }
})


