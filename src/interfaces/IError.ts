export default interface IError {
  name: string;
  message: string;
  trace: string;
  code?: number | string;
  userAgent?: string;
  isNodeError?: boolean;
}