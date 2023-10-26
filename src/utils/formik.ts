import { FormikProps } from 'formik';
import { isNumber, isPureObject, isString } from '@/utils/assert';

type Message<T> = string | ((value: T) => string);
type Rule<T> = T | { value: T; message: Message<T> };
type PredefinedRegexName = keyof typeof predefinedRegex;
type RegexRule = Rule<RegExp | PredefinedRegexName>;
type Range = { min?: number; max?: number };

type Validator<T, K extends keyof T = keyof T> = (value?: T[K]) => string | undefined;
type ValidateConfig<T, K extends keyof T = keyof T> = {
  required?: Rule<boolean>;
  regex?: T[K] extends string ? RegexRule | RegexRule[] : never;
  range?: Range;
  validator?: Validator<T, K>;
};
type ValidateConfigs<T> = { [K in keyof T]?: ValidateConfig<T, K> };
type Validators<T> = { [K in keyof T]?: Validator<T, K> };

type GetFormikStates<T> = (props: FormikProps<T>) => FormikProps<T> & {
  showErrorDict: Record<keyof T, boolean>;
  canSubmit: boolean;
};

const predefinedRegex = {
  nickname: /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{3,15}$/,
  phone: /([0-9]{3})-?([0-9]{4})-?([0-9]{4})/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  licenseNumber: /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/,
  account: /^[0-9-]+$/,
};

/**
 * @returns
 * * validators - formik Field 컴포넌트의 validate prop 에 들어갈 함수들의 dict
 * * validate - 모든 필드 한번에 validation 하고 싶을 때 사용. Formik 컴포넌트의 validate prop 에 넣어 한번에 검증도 가능
 * * getFormikStates - formik props 를 넣으면 필드의 에러 표시 여부를 판단하는 showErrorDict 와 submit 버튼 disabled 여부를 결정하는 canSubmit 플래그를 반환
 */
export function generateValidators<T>(validateConfigs: ValidateConfigs<T>) {
  const validators: Validators<T> = {};

  for (const key in validateConfigs) {
    const config = validateConfigs[key];
    validators[key] = createValidator(config as ValidateConfig<T>);
  }

  const validate = (values: T) => {
    return Object.fromEntries(
      Object.entries(values as Record<string, unknown>).map(([k, v]) => {
        return [k, validators[k](v)];
      }),
    ) as Record<keyof T, ReturnType<Validator<T>>>;
  };

  const getFormikStates: GetFormikStates<T> = props => {
    const { values, submitCount, touched, errors, dirty } = props;

    const { showErrorDict, canSubmit } = (() => {
      if (!isPureObject(values)) {
        throw new Error('values must be pure object');
      }

      const submittedAtLeastOne = submitCount > 0;

      return Object.entries(values).reduce(
        (acc, [_key, value]) => {
          const key = _key as keyof T;
          const hasError = !!errors[key];
          acc.showErrorDict[key] = hasError && submittedAtLeastOne && !!touched[key]; // 최초 1회 제출 이후 해당 필드가 한 번 이상 focus 됐을 때만 에러 표시

          const isRequired = getRuleValue(validateConfigs[key]?.required, false);
          acc.canSubmit &&= !isRequired || (isRequired && !!value); // required 일 때 값이 있는지만 판단

          return acc;
        },
        {
          showErrorDict: {} as Record<keyof T, boolean>,
          canSubmit: dirty, // dirty 가 아니라면 submit 불가
        },
      );
    })();

    return {
      ...props,
      showErrorDict,
      canSubmit,
    };
  };

  return {
    validators,
    validate,
    getFormikStates,
  };
}

function createValidator<T, K extends keyof T>(config: ValidateConfig<T, K>): Validator<T, K> {
  return (value?: T[K]): string | undefined => {
    if (config.required && isValueEmpty(value)) {
      return getRuleMessage(config.required, '필수 입력입니다.');
    }

    if (config.range && (isString(value) || isNumber(value))) {
      const { min, max } = config.range;

      if (min !== undefined) {
        if (isString(value) && value.length < min) {
          return `최소 ${min}자를 입력해주세요.`;
        } else if (isNumber(value) && value < min) {
          return `${min}보다 커야합니다.`;
        }
      }

      if (max !== undefined) {
        if (isString(value) && value.length > max) {
          return `최대 ${max}자를 입력해주세요.`;
        } else if (isNumber(value) && value > max) {
          return `${max}보다 작아야 합니다.`;
        }
      }
    }

    if (config.regex && isString(value)) {
      const regexRules = (Array.isArray(config.regex) ? config.regex : [config.regex]) as RegexRule[];

      for (const rule of regexRules) {
        const regex = getRegexValue(rule);
        if (!regex.test(value)) {
          return getRuleMessage(rule, '잘못된 형식입니다.');
        }
      }
    }

    if (config.validator) {
      return config.validator(value);
    }

    return undefined;
  };
}

function getRuleMessage(rule: Rule<unknown>): string | undefined;
function getRuleMessage(rule: Rule<unknown>, defaultPhrase: string): string;
function getRuleMessage(rule: Rule<unknown>, defaultPhrase?: string) {
  if (isPureObject(rule) && 'message' in rule) {
    return typeof rule.message === 'function' ? rule.message(rule.value) : rule.message;
  }
  return defaultPhrase;
}

function getRuleValue<T extends Exclude<unknown, object>>(rule: Rule<T> | undefined, defaultValue: T): T {
  return isPureObject(rule) ? rule.value : rule ?? defaultValue;
}

function getRegexValue(rule: RegexRule): RegExp {
  if (rule instanceof RegExp) {
    return rule;
  }

  if (typeof rule === 'string') {
    return predefinedRegex[rule];
  }

  const { value } = rule;
  if (typeof value === 'string') {
    return predefinedRegex[value];
  }

  return value;
}

function isValueEmpty(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && !/\S/.test(value)) ||
    value === false ||
    (Array.isArray(value) && value.length === 0)
  );
}
