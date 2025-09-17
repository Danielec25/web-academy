    import { Request, Response, NextFunction } from 'express';
    import { promises as fs } from 'fs';
    import path from 'path';


    type LogFormat = 'simples' | 'completo';


    const loggerMiddleware = (formato: LogFormat) => {
 
      return async (req: Request, res: Response, next: NextFunction) => {
        const logFolder = process.env.LOG_FOLDER as string;
        const logFolderPath = path.join(process.cwd(), logFolder);

        try {
          
          await fs.mkdir(logFolderPath, { recursive: true });

          
          const logFileName = `${new Date().toISOString().split('T')[0]}.log`;
          const logFilePath = path.join(logFolderPath, logFileName);

          
          const timestamp = new Date().toLocaleString('pt-PT');
          const url = req.url;
          const method = req.method;

          let logMessage: string;
          if (formato === 'simples') {
            logMessage = `[${timestamp}] ${method} ${url}`;
          } else {
            
            const httpVersion = req.httpVersion;
            const userAgent = req.headers['user-agent'] || 'N/A';
            logMessage = `[${timestamp}] ${method} ${url} HTTP/${httpVersion} - ${userAgent}`;
          }

         
          await fs.appendFile(logFilePath, logMessage + '\n');
        } catch (error) {
          console.error('Falha ao gravar o log:', error);
        }

        
        next();
      };
    };

    export default loggerMiddleware;
    
