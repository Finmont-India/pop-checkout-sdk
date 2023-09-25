import Bowser from 'bowser';
import axios from 'axios';


export interface IBrowserInfo {
    acceptHeader: string;
    colorDepth: number;
    ip: string;
    javaEnabled: boolean;
    jsEnabled: boolean;
    language: string;
    name: string;
    screenHeight: number;
    screenWidth: number;
    timezoneOffset: number;
    userAgent: string;
    version: string;
  }
  
  export interface IMachineIdentifier {
    manufacturerNumber: string;
    osName: string;
    osPlatform: string;
    osVersion: string;
  }
export const getBrowserAPI = async (): Promise<any> => {
  let response;
  try {
    response = await axios.get(`/browser-ip`);
    return { data: response.data };
  } catch (error: any) {
    return { error: error?.response?.data?.error || error?.message };
  }
};

export async function getBrowserInfo(): Promise<IBrowserInfo> {
  let ipData: string = '0.0.0.0';
  const ipInfo = await getBrowserAPI();
  if (ipInfo.data) {
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

export function getMachineInfo(): IMachineIdentifier {
  const browser = Bowser.getParser(window.navigator.userAgent);
  let platform = 'desktop';
  if (browser.getPlatform().type) {
    platform = browser.getPlatform().type as string;
  }
  return {
    osName: browser.getOSName(),
    osPlatform: platform,
    osVersion: browser.getOSVersion() || 'unknown',
    manufacturerNumber: '-',
  };
}
