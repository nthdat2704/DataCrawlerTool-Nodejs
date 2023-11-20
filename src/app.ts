import express, { Express, Request, Response } from "express";
import { fetchData, fetchMultipleData } from "./service";
import { extractElement } from "./utils";
import { Server } from "./setupServer";

const app: Express = express();
const CrawlServer = new Server(app);
CrawlServer.start();
const port: number = 8000;
export type StringHTML = string;
app.post("/", async (req: Request, res: Response) => {
  const clientRequest = req.body || {};
  const domain = new URL(clientRequest.url).hostname;
  const HTMLlistItems: StringHTML = await fetchData(clientRequest.url);
  const extractLinkListItems: StringHTML[] = extractElement(HTMLlistItems, {
    elementNeedExtractFromHTML: clientRequest.classHrefElement,
    typeNeedExtract: "href",
    domain,
  });
  const ListHTMLItems: StringHTML[] = await fetchMultipleData(
    extractLinkListItems
  );
  const endData = ListHTMLItems.map((HTMLItem: StringHTML) => {
    return extractElement(HTMLItem, {
      elementNeedExtractFromHTML: clientRequest.getFields,
    });
  });
  res.json({
    message: "done!",
    data: endData,
  });
});

app.listen(port, () => {
  console.log("server running on port 8000");
});
