import * as cheerio from "cheerio";
import { IGetFields, StringHTML } from "../types";
import { TYPE_EXTRACT, ATTRIBUTES } from "../constants";
interface options {
  classOfElementNeedExtractFromHTML: string | IGetFields[];
  onlyExtractLink?: boolean;
  domain?: string;
}

export const extractElement = (HTMLfile: StringHTML, options: options) => {
  if (!HTMLfile) return "";
  const {
    classOfElementNeedExtractFromHTML,
    onlyExtractLink = false,
    domain,
  } = options;
  const $: cheerio.CheerioAPI = cheerio.load(HTMLfile);

  const handleTypeNeedExtract = (
    type: string | boolean,
    context: cheerio.AnyNode
  ) => {
    if (type === TYPE_EXTRACT._HREF || type === true) {
      return $(context).attr(ATTRIBUTES._HREF);
    }
    if (type === TYPE_EXTRACT._TEXT) {
      return $(context).text();
    }
    if (type === TYPE_EXTRACT._HTML) {
      return $(context).html();
    }
    if (type === TYPE_EXTRACT._IMG) {
      let attribute = ATTRIBUTES._SRC;
      let img = $(context).attr(attribute);
      if (!img) {
        attribute = ATTRIBUTES._SRCSET;
        img = $(context).attr(attribute);
      }
      return img;
    }
  };

  if (onlyExtractLink) {
    const storelistLinksElement: string[] = [];
    $(classOfElementNeedExtractFromHTML as string).map(function () {
      const link = handleTypeNeedExtract(onlyExtractLink, this);
      const fullLink = `https://${domain}${link}`;
      storelistLinksElement.push(fullLink);
    });
    return storelistLinksElement;
  }
  let storeDataField: Record<string, any> = {};
  let dataField: any;
  const data = classOfElementNeedExtractFromHTML as IGetFields[];
  data.map((field: IGetFields) => {
    $(field.class as string).map(function () {
      dataField = handleTypeNeedExtract(field.type, this);
    });
    storeDataField[field.name] = dataField;
  });
  return storeDataField;
};
