import { MulterField } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export interface MulterUploadField extends MulterField {
  destination?: string;
}
