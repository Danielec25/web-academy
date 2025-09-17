    import { cleanEnv, port, str } from 'envalid';

    function validateEnv(): void {
      cleanEnv(process.env, {
        PORT: port(),
        LOG_FOLDER: str(),
      });
    }

    export default validateEnv;
    

