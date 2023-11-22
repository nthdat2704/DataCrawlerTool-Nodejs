//@ts-nocheck
import { NextFunction } from "express";
import * as yup from "yup";
export const requestSchema = yup.object({
  url: yup
    .string()
    .nonNullable()
    .required("URL website cần crawl data không được để trống"),
  classHrefElement: yup
    .string()
    .nonNullable()
    .required(
      "Tên (class || id || attribute,...) của element cần crawl không được để trống"
    ),
  getFields: yup
    .array()
    .nonNullable()
    .required("Các field dữ liệu cần crawl không được để trống"),
});

export const validationRequest =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      return next();
    } catch (err) {
      return res.status(500).json({ type: err.name, message: err.message });
    }
  };
