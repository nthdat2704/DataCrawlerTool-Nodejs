import express, { Express } from "express";
import { ErrorHandler } from "./utils";
export class Server {
  private app: Express;
  constructor(app: Express) {
    this.app = app;
  }
  public start() {
    this.initServer(this.app);
    this.addMiddlewareErrorHandler(this.app);
  }
  private initServer(app: Express) {
    app.use(express.json());
  }
  private addMiddlewareErrorHandler(app: Express) {
    //@ts-ignore
    app.use(ErrorHandler);
  }
}
