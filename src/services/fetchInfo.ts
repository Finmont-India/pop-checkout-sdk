import * as Bowser from 'bowser';
import { getConfig } from '../config';
import { getBaseUrl } from './FetchBaseUrl';
import axios, { RawAxiosRequestHeaders } from 'axios';

interface PositionCoordinates {
  latitude: number;
  longitude: number;
};

const getCoordinates = (): Promise<PositionCoordinates | undefined> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          console.error('Geolocation error:', error);
          resolve(undefined); // Resolving with undefined in case of error
        }
      );
    } else {
      reject(new Error('Geolocation not supported'));
    }
  });
};

export const getInfo = async () => {
  try {
    const response = await getBrowserInfo();
    const mach = await getMachineInfo();
    const coordinates = await getCoordinates();
    const data = {
      browserInfo: {
        userAgent: response.userAgent,
        screenHeight: response.screenHeight,
        screenWidth: response.screenWidth,
        colorDepth: response.colorDepth,
        acceptHeader: response.acceptHeader,
        timezoneOffset: response.timezoneOffset,
        language: response.language,
        javaEnabled: response.javaEnabled,
        jsEnabled: response.jsEnabled,
        ip: response.ip,
        name: response.name,
        version: response.version,
        latitude: coordinates?.latitude !== undefined ? coordinates.latitude : null,
        longitude: coordinates?.longitude !== undefined ? coordinates.longitude : null
      },
      machineIdentifier: {
        osName: mach.osName,
        osPlatform: mach.osPlatform,
        osVersion: mach.osVersion
      }

    }
    return data;
  }
  catch (error) {
    return error;
  }
}

export const getBrowserAPI = async (): Promise<any> => {

  const { env, apiKey } = getConfig();
  const urlObj = getBaseUrl(env);
  const BASE_URL = urlObj.paymentUrl;

  const customHeaders: RawAxiosRequestHeaders = {
    "Authorization": `Bearer ${encodeURIComponent(apiKey)}`,
  };

  const headers: RawAxiosRequestHeaders = {
    ...customHeaders,
  };
  let response;
  try {
    response = await axios.get(
      `${BASE_URL}/browser-ip?platform=sdk`,
      // @ts-ignore
      { headers }
    );
    return { data: response.data };
  } catch (error) {
    return { error: error?.response?.data?.error || error?.message };
  }
};


export async function getBrowserInfo(): Promise<any> {
  let ipData: string = '0.0.0.0';
  const ipInfo = await getBrowserAPI();
  if (ipInfo) {
    ipData = ipInfo.data.ip;
  }
  const browser = Bowser.getParser(window.navigator.userAgent);
  return {
    userAgent: window.navigator.userAgent,
    screenHeight: window.screen.height,
    screenWidth: window.screen.width,
    colorDepth: window.screen.pixelDepth,
    acceptHeader:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    timezoneOffset: new Date().getTimezoneOffset(),
    language: window.navigator.language,
    javaEnabled: window.navigator.javaEnabled(),
    jsEnabled: true,
    ip: ipData,
    name: browser.getBrowserName(),
    version: browser.getBrowserVersion(),
  };
}

export function getMachineInfo(): any {
  const browser = Bowser.getParser(window.navigator.userAgent);
  let platform = 'desktop';
  if (browser.getPlatform().type) {
    platform = browser.getPlatform().type as string;
  }
  return {
    osName: browser.getOSName(),
    osPlatform: platform,
    osVersion: browser.getOSVersion() || 'unknown',
    //manufacturerNumber: '-',
  };
}