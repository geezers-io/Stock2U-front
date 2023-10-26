export interface SimpleFile {
  id: number;
  uploadPath: string;
}

export interface UploadFileRequest {
  files: File[];
}

export interface UploadFileResponse {
  files: SimpleFile[];
}

export interface RemoveFileRequest {
  id: number;
}

export interface FileClient {
  uploadFile(request: UploadFileRequest): Promise<UploadFileResponse>;
  removeFile(request: RemoveFileRequest): Promise<void>;
}
