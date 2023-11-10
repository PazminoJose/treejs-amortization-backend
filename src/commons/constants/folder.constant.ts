import { join } from "path";
import { joinWebPath } from "../utils/join-web-path.util";

export class FolderConstants {
  // Folders
  static PUBLIC_FOLDER: string = "public";
  static LOGOS_FOLDER: string = "logos";

  // Server Paths
  static getPublicPath() {
    return join(__dirname, "..", "..", "..", this.PUBLIC_FOLDER);
  }

  static getLogosPath() {
    return join(this.getPublicPath(), this.LOGOS_FOLDER);
  }

  // Web Paths
  static getPublicWebPath(fileName: string = "") {
    return joinWebPath(this.PUBLIC_FOLDER, fileName);
  }

  static getLogosWebPath(fileName: string) {
    return joinWebPath(this.LOGOS_FOLDER, fileName);
  }
}
