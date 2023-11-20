import axios from "axios";
export const fetchData = async (url: string) => {
  if (!url) return;
  try {
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("xảy ra lỗi", error);
  }
};
export const fetchMultipleData = async (listLink: string[]) => {
  const data = await Promise.all(listLink.map((url: string) => fetchData(url)));
  return data;
};
