const COLORS = {
  INFO: '#0490C8',
  SUCCESS: '#22bb33',
  WARN: '#DE793B',
  ERROR: '#C73333',
};

export function printRequestLog({ method, endPoint, requestData, requestParams, config }) {
  if (!window.debug) return;

  if (Object.keys(requestParams ?? {}).length) {
    console.log(
      `%c${method?.toUpperCase()} ${endPoint} [REQ PARAMS]`,
      `color: ${COLORS.INFO};font-weight: bold;`,
      requestParams,
    );
  }
  console.log(
    `%c${method?.toUpperCase()} ${endPoint} [REQ BODY]`,
    `color: ${COLORS.INFO};font-weight: bold;`,
    requestData,
  );
  console.log(
    `%c${method?.toUpperCase()} ${endPoint} [REQ HEADERS]`,
    `color: ${COLORS.INFO};font-weight: bold;`,
    config.headers,
  );
  console.log(
    `%c${method?.toUpperCase()} ${endPoint} [REQ CONFIG]`,
    `color: ${COLORS.INFO};font-weight: bold;`,
    config,
  );
}

export function printResponseLog({ method, endPoint, responseObj }) {
  if (!window.debug) return;

  console.log(
    `%c${method?.toUpperCase()} ${endPoint} [RES BODY]`,
    `color: ${COLORS.SUCCESS};font-weight: bold`,
    responseObj,
  );
}

export function printErrorLog({ method, endPoint, errorMessage, errorObj }) {
  if (!window.debug) return;

  console.log(
    `%c${method?.toUpperCase()} ${endPoint} [ERR]`,
    `color: ${COLORS.ERROR};font-weight: bold`,
    errorMessage,
    errorObj,
  );
}
