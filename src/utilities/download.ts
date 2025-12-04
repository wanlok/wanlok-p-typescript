import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import * as http from "http";

export const download = (urlString: string | undefined, fileName: string, savePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!urlString) {
      reject(new Error("No URL provided"));
      return;
    }

    // Ensure savePath exists
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
    }

    const filePath = path.join(savePath, fileName);

    if (fs.existsSync(filePath)) {
      console.log(`Skipped: ${filePath} already exists`);
      resolve();
      return;
    }

    // Choose correct protocol
    const client = urlString.startsWith("https") ? https : http;

    client
      .get(urlString, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Download failed: ${res.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log(`Saved: ${filePath}`);
          resolve();
        });

        fileStream.on("error", (err) => {
          fs.unlink(filePath, () => reject(err));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
