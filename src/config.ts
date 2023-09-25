// config.ts

const apiConfig : { env: string, apiKey: string, } ={apiKey:"",
  env:''}

export const configure = (api: string, environment: string) => {
  apiConfig.apiKey = api;
  apiConfig.env = environment;
};

export function getConfig() {
  return apiConfig;
}
