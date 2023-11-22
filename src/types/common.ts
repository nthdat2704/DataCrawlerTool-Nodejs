export interface IGetFields {
  name: string;
  class: string;
  type: string;
}
export interface IClientRequest extends Request {
  url: string;
  classHrefElement: string;
  getFields: IGetFields[];
}
export type StringHTML = string;
