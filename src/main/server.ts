import app from './app'
import config from './config/env'

app.listen(config.APP_PORT, (): void =>
  console.log(`API is running on port ${config.APP_PORT}`)
)
