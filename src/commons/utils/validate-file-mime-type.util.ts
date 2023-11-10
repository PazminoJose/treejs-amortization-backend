export function validateFileMimeType(file: Express.Multer.File, allowedMimeTypes: string[]): boolean {
  try {
    // Files types magic numbers
    const magicNumbers = {
      "image/jpeg": [0xff, 0xd8, 0xff, 0xe0],
      "image/jpg": [0xff, 0xd8, 0xff, 0xe0],
      "image/png": [0x89, 0x50, 0x4e, 0x47],
      "application/pdf": [0x25, 0x50, 0x44, 0x46]
    } as const;

    if (!file.buffer || file.buffer.length < 4) {
      return false;
    }

    // first 4 bytes from the file buffer
    const actualMagicNumber = [...file.buffer.subarray(0, 4)];

    for (const mimeType of allowedMimeTypes) {
      if (magicNumbers[mimeType]) {
        const expectedMagicNumber = magicNumbers[mimeType];
        if (expectedMagicNumber.every((value, index) => value === actualMagicNumber[index])) {
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
