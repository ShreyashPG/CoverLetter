import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeJobDescription = async (url) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const desc = $("p, li").text();
  return desc.slice(0, 2000);
};
