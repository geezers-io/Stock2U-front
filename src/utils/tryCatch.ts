type TryCatchProps<T> = {
  tryFn: () => T;
  catchFn: (error: any) => T;
};

/**
 * 해당 함수의 순기능에 대해서 아래 링크 참조
 * https://javascript.plainenglish.io/functional-javascript-try-catch-gives-you-cleaner-and-modular-code-6b42194399c0
 */
export default function tryCatch<T>({ tryFn, catchFn }: TryCatchProps<T>): T {
  try {
    return tryFn();
  } catch (error) {
    return catchFn(error);
  }
}
