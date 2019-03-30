import { isVideo, isAudio, isImage, isYoutubeUrl, isAmazonUrl } from "./utils";
import { ScrapVideo } from "./Video/ScrapVideo";
import { ScrapAudio } from "./Audio/ScrapAudio";
import { ScrapImage } from "./Image/ScrapImage";
import * as cheerio from "cheerio";
import { ScrapYoutube } from "./Youtube/ScrapYoutube";
import { ScrapAmazon } from "./Amazon/ScrapAmazon";
import ScrapDefault from "./Default/ScrapDefault";
import { isEmpty } from "lodash";

export const TYPE_AMAZON = 'TYPE_AMAZON';
export const TYPE_YOUTUBE = 'TYPE_YOUTUBE';
export const TYPE_AUDIO = 'TYPE_AUDIO';
export const TYPE_VIDEO = 'TYPE_VIDEO';
export const TYPE_IMAGE = 'TYPE_IMAGE';
export const TYPE_DEFAULT = 'TYPE_DEFAULT';

export const ScraperWraper = async ({ proxiedUrl, url }, httpClient) => {
  if (!isEmpty(url)) {
    if (isVideo(url)) {
      return await ScrapVideo(url);
    } else if (isAudio(url)) {
      return await ScrapAudio(url);
    } else if (isImage(url)) {
      const response = await httpClient.get(proxiedUrl);
      const $ = cheerio.load(response.data);
      return await ScrapImage($, url);
    } else if (isYoutubeUrl(url)) {
      const response = await httpClient.get(proxiedUrl);
      const $ = cheerio.load(response.data);
      return await ScrapYoutube($, url);
    } else if (isAmazonUrl(url)) {
      const response = await httpClient.get(proxiedUrl);
      const $ = cheerio.load(response.data);
      return await ScrapAmazon($, url);
    } else {
      const response = await httpClient.get(proxiedUrl);
      const $ = cheerio.load(response.data);
      const resp = await ScrapDefault($, url);
      return resp;
    }
  }
};
