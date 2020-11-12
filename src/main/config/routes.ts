import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router: Router = Router()

  app.use('/api', router)

  readdirSync(`${__dirname}/../routes`)
    .filter((file): boolean => file.endsWith('routes.ts', file.length))
    .map(
      async (file): Promise<any> =>
        (await import(`../routes/${file}`)).default(router)
    )
}
