import express, { Express } from "express";

export class Server {
  private app: Express;
  constructor(app: Express) {
    this.app = app;
  }
  public start() {
    this.initServer(this.app);
  }
  private initServer(app: Express) {
    app.use(express.json());
  }
}
