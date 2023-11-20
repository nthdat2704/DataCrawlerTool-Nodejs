import * as cheerio from "cheerio";
import { StringHTML } from "../app";
interface options {
  elementNeedExtractFromHTML: string | {};
  typeNeedExtract?: "href" | "text";
  domain?: string;
}
export const extractElement = (HTMLfile: StringHTML, options: options) => {
  const {
    elementNeedExtractFromHTML,
    typeNeedExtract = "text",
    domain,
  } = options;
  const listElement: string[] = [];
  const $: cheerio.CheerioAPI = cheerio.load(HTMLfile);
  if (typeof elementNeedExtractFromHTML === "string") {
    $(elementNeedExtractFromHTML as string).map(function () {
      if (typeNeedExtract === "text") {
        $(this).text();
        return "";
      }
      const link = `https://${domain}${$(this).attr("href")}`;
      listElement.push(link);
    });
    return listElement;
  }
  const convertToArray = Object.entries(elementNeedExtractFromHTML);
  const objectData: any = {};

  convertToArray.map((item) => {
    objectData[item[0]] = $(item[1] as string).text();
  });
  return objectData;
};
