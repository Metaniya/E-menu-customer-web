type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const isDev = import.meta.env.DEV

class Logger {
  private log(level: LogLevel, message: string, data?: unknown) {
    if (!isDev && level === 'debug') return

    const timestamp = new Date().toISOString()
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`

    switch (level) {
      case 'debug':
        console.debug(prefix, message, data ?? '')
        break
      case 'info':
        console.info(prefix, message, data ?? '')
        break
      case 'warn':
        console.warn(prefix, message, data ?? '')
        break
      case 'error':
        console.error(prefix, message, data ?? '')
        break
    }
  }

  debug(message: string, data?: unknown) { this.log('debug', message, data) }
  info(message: string, data?: unknown) { this.log('info', message, data) }
  warn(message: string, data?: unknown) { this.log('warn', message, data) }
  error(message: string, data?: unknown) { this.log('error', message, data) }
}

export const logger = new Logger()
