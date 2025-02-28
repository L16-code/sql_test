import env from '../../env.json';


interface IEnvConfig {
    host: string;
    port: number;
    databse_name: string;
}

const envConfig = (): IEnvConfig => {
    const nodeEnv = (process.env.NODE_ENV as keyof typeof env) || "local";

    return env[nodeEnv];
};

export default envConfig;