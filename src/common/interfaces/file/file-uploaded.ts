export interface FileUploaded {
  data: FileUploadedData;
  error: unknown;
}

export interface FileUploadedData {
  id: string;
  path: string;
  fullPath: string;
}
