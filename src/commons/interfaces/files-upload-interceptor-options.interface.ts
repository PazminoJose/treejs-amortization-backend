export interface FilesUploadInterceptorOptions {
  acceptedMimeTypes?: string[]; // will check if mimetype is accepted
  destination?: string; // will override checkParamForDestination
}
