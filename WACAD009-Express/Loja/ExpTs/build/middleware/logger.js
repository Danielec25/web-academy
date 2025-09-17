"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const loggerMiddleware = (formato) => {
    return async (req, res, next) => {
        const logFolder = process.env.LOG_FOLDER;
        const logFolderPath = path_1.default.join(process.cwd(), logFolder);
        try {
            await fs_1.promises.mkdir(logFolderPath, { recursive: true });
            const logFileName = `${new Date().toISOString().split('T')[0]}.log`;
            const logFilePath = path_1.default.join(logFolderPath, logFileName);
            const timestamp = new Date().toLocaleString('pt-PT');
            const url = req.url;
            const method = req.method;
            let logMessage;
            if (formato === 'simples') {
                logMessage = `[${timestamp}] ${method} ${url}`;
            }
            else {
                const httpVersion = req.httpVersion;
                const userAgent = req.headers['user-agent'] || 'N/A';
                logMessage = `[${timestamp}] ${method} ${url} HTTP/${httpVersion} - ${userAgent}`;
            }
            await fs_1.promises.appendFile(logFilePath, logMessage + '\n');
        }
        catch (error) {
            console.error('Falha ao gravar o log:', error);
        }
        next();
    };
};
exports.default = loggerMiddleware;
