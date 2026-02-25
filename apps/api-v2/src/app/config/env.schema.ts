import { z } from 'zod'

export const EnvSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  DB_SYNCHRONIZE: z.coerce.boolean(),
})

export type TEnv = z.infer<typeof EnvSchema>

export const getEnv = () => EnvSchema.parse(process.env)
