import "dotenv/config"

export const CONFIG = {
  port: process.env.PORT || 3000,
  aws: {
    region: process.env.AWS_REGION!,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    cognito: {
      userPoolId: process.env.AWS_COGNITO_USER_POOL_ID!,
      clientId: process.env.AWS_COGNITO_CLIENT_ID!,
      groups: {
        agent: "agent",
        admin: "admin",
        superAdmin: "super-admin"
      }
    }
  }
}
