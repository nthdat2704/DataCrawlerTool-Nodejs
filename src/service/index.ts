import axios from "axios";
import { NextFunction } from "express";
export const fetchData = async (url: string, next: NextFunction) => {
  if (!url) return "";
  try {
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  } catch (error: any) {
    next(error);
  }
};
export const fetchMultipleData = async (
  listLink: string[],
  next: NextFunction
) => {
  if (!listLink.length) return "";
  try {
    const data = await Promise.all(
      listLink.map((url: string) => fetchData(url, next))
    );
    return data;
  } catch (error: any) {
    next(error);
  }
};
