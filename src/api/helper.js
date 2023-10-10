export function getErrorMessage(err) {
  if (typeof err === 'string') {
    return err;
  }
  if (typeof err === 'object' && !!err && !Array.isArray(err)) {
    const error = err;
    const errorData = error.response?.data?.data || error.response?.data || error.data || error;

    const message =
      typeof errorData === 'object'
        ? errorData?.msg || errorData?.message || errorData?.value || errorData?.key
        : typeof errorData === 'string'
        ? errorData
        : undefined;

    if (message) {
      if (error.status === 500) {
        return `[SERVER ERROR] ${message}`;
      }
      return message;
    }
  }
  return 'Unknown error occurred';
}
