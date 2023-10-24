export interface SimpleFile {
  id: number;
  uploadPath: string;
}

export interface UploadFileRequest {
  files: File[];
}

export interface RemoveFileRequest {
  id: number;
}

export interface FileClient {
  uploadFile(request: UploadFileRequest): Promise<SimpleFile[]>;
  removeFile(request: RemoveFileRequest): Promise<void>;
}
