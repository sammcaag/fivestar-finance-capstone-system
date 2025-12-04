export interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  secure_url: string;
  original_filename: string;
  format: string;
  bytes: number;
  width?: number; //  Optional for PDFs
  height?: number; //  Optional for PDFs
  pages?: number; //  For PDFs
  resource_type: string; //  'image' or 'raw'
}

export interface UploadResult {
  success: boolean;
  data?: CloudinaryUploadResult;
  error?: string;
}
