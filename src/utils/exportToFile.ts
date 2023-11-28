import { IGetFields } from "../types";
import { convertObjToArr } from "./convertObjToArr";

const ExcelJS = require("exceljs");
export const exportToExcelFile = (data: any[], columns: IGetFields[]) => {
  try {
    //to create a excel file
    // 1. create a excel file
    // 2. create a sheet file
    // 3. add column and define name of column
    // 4. insert data into rows depend on column name
    let excelFile = new ExcelJS.Workbook();
    const sheetFile = excelFile.addWorksheet("CrawlData");
    const totalColumns: Record<string, string>[] = [
      {
        header: "id",
        key: "id",
      },
    ];
    columns.forEach((element: any) => {
      totalColumns.push({
        header: element.name,
        key: element.name,
      });
    });
    sheetFile.columns = totalColumns;
    data.forEach((item: any, index) => {
      const id = index + 1;
      sheetFile.addRow({ id, ...item });
    });
    return excelFile;
  } catch (error) {
    console.log("xảy ra lỗi khi export file Excel", error);
  }
};
