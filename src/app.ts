import express, { Express, NextFunction, Request, Response } from "express";
import { fetchData, fetchMultipleData } from "./service";
import { extractElement } from "./utils";
import { Server } from "./setupServer";
import { exportToExcelFile } from "./utils/exportToFile";
import { requestSchema, validationRequest } from "./utils/validationRequest";

const app: Express = express();
const CrawlServer = new Server(app);
CrawlServer.start();
const port: number = 8000;
export type StringHTML = string;

app.post(
  "/",
  //@ts-ignore
  validationRequest(requestSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const clientRequest = req.body;
    const domain = new URL(clientRequest.url).hostname;
    const HTMLlistItems: StringHTML = await fetchData(clientRequest.url, next);
    const extractLinkListItems: StringHTML[] =
      extractElement(HTMLlistItems, {
        elementNeedExtractFromHTML: clientRequest.classHrefElement,
        typeNeedExtract: "href",
        domain,
      }) || [];
    const ListHTMLItems: StringHTML[] =
      (await fetchMultipleData(extractLinkListItems, next)) || [];
    const endData = ListHTMLItems.map((HTMLItem: StringHTML) => {
      return extractElement(HTMLItem, {
        elementNeedExtractFromHTML: clientRequest.getFields,
      });
    });
    const excelFile = exportToExcelFile(endData, clientRequest.getFields);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=" + "data.xlsx");
    excelFile.xlsx.write(res).then(function () {
      res.end();
      console.log("File write done........");
    });
  }
);

app.listen(port, () => {
  console.log("server running on port 8000");
});
