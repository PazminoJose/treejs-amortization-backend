import { existsSync, mkdirSync } from "fs";
import { FolderConstants } from "../constants";

export function createStaticFolder() {
  let folderPath = FolderConstants.getPublicPath();
  createFolderIfNotExist(folderPath);

  folderPath = FolderConstants.getLogosPath();
  createFolderIfNotExist(folderPath);
}

function createFolderIfNotExist(folder: string) {
  if (!existsSync(folder)) {
    mkdirSync(folder);
  }
}
