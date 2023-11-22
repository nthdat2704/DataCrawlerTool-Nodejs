import express, { Express, NextFunction, Request, Response } from "express";
import { fetchData, fetchMultipleData } from "./service";
import { extractElement } from "./utils";
import { Server } from "./setupServer";
import { exportToExcelFile } from "./utils/exportToFile";
import { requestSchema, validationRequest } from "./utils/validationRequest";
import { IClientRequest, StringHTML } from "./types";
import { SERVER } from "./constants";

const app: Express = express();
const CrawlServer = new Server(app);
CrawlServer.start();
app.post(
  "/",
  //@ts-ignore
  validationRequest(requestSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const clientRequest: IClientRequest = req.body;
    const domain = new URL(clientRequest.url).hostname;
    const HTMLlistItems: StringHTML = await fetchData(clientRequest.url, next);
    const extractLinkListItems: StringHTML[] =
      (extractElement(HTMLlistItems, {
        classOfElementNeedExtractFromHTML: clientRequest.classHrefElement,
        onlyExtractLink: true,
        domain,
      }) as StringHTML[]) || [];
    const ListHTMLItems: StringHTML[] =
      (await fetchMultipleData(extractLinkListItems, next)) || [];
    const endData = ListHTMLItems.map((HTMLItem: StringHTML) => {
      return extractElement(HTMLItem, {
        classOfElementNeedExtractFromHTML: clientRequest.getFields,
        onlyExtractLink: false,
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

app.listen(SERVER.PORT, () => {
  console.log("server running on port 8000");
});
