import { FormikProps } from 'formik';
import { isPureObject } from '@/utils/assert';

/**
 * @returns
 * * isInvalid - chakra-ui FormControl 컴포넌트의 isInvalid prop 에 들어갈 값들의 dict
 * * canSubmit - submit 가능 여부
 */
export function getFormikStates<T>(props: FormikProps<T>) {
  const { values, submitCount, touched, errors, dirty } = props;

  const isInvalid = (() => {
    if (!isPureObject(values)) {
      throw new Error('values must be pure object');
    }

    return Object.keys(values).reduce(
      (acc, k) => {
        acc[k] = submitCount > 0 && !!touched[k] && !!errors[k];
        return acc;
      },
      {} as Record<keyof T, boolean>,
    );
  })();

  const canSubmit = dirty && (submitCount === 0 || Object.values(isInvalid).every(v => !v));

  return {
    ...props,
    isInvalid,
    canSubmit,
  };
}
