export function getErrorMessage(err: unknown): string {
  if (typeof err === 'string') {
    return err;
  }
  if (typeof err === 'object' && !!err && !Array.isArray(err)) {
    const error: Record<string, any> = err;
    const errorData = error.response?.data?.data ?? error.response?.data ?? error.data ?? error;

    const message: string | undefined = (() => {
      if (typeof errorData === 'object') return errorData?.message;

      if (typeof errorData === 'string') return errorData;

      return;
    })();

    if (message) {
      if (error.status === 500) {
        return `[SERVER ERROR] ${message}`;
      }
      return message;
    }
  }
  return '알 수 없는 에러 발생';
}
