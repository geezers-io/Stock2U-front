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
  upload(request: UploadFileRequest): Promise<UploadFileResponse>;
  remove(request: RemoveFileRequest): Promise<void>;
}
