export class VoltaicAPIError extends Error {
  constructor(message, { code, statusCode } = {}) {
    super(message);
    this.name = 'VoltaicAPIError';
    this.code = code ?? 'VOLTAIC_SDK_ERROR';
    this.statusCode = statusCode ?? null;
  }
}
