#!/usr/bin/env node

import { JSDOM } from "jsdom";

const getHTML = async (urlString: string) => {
  if (!/^https?:\/\//i.test(urlString)) {
    urlString = "https://" + urlString;
  }
  const dom = await JSDOM.fromURL(urlString);
  console.log(dom.serialize());
};

const main = async () => {
  const args = process.argv.slice(2);
  if (args.length === 1) {
    const urlString = args[0];
    await getHTML(urlString);
  }
};

main();
