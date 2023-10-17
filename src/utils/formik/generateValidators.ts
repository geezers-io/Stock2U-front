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
type ValidatorOrValidateConfigs<T> = {
  [K in keyof T]?: Validator<T, K> | ValidateConfig<T, K>;
};
type Validators<T> = {
  [K in keyof T]?: Validator<T, K>;
};

const predefinedRegex = {
  nickname: /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{3,15}$/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

/**
 * @returns
 * * validators - formik Field 컴포넌트의 validate prop 에 들어갈 함수들의 dict
 * * validate - 모든 필드 한번에 validation 하고 싶을 때 사용. Formik 컴포넌트의 validate prop 에 넣어 한번에 검증도 가능
 */
export function generateValidators<T>(validatorOrConfigs: ValidatorOrValidateConfigs<T>) {
  const validators: Validators<T> = {};

  for (const key in validatorOrConfigs) {
    const validatorOrConfig = validatorOrConfigs[key];
    if (typeof validatorOrConfig === 'function') {
      validators[key] = validatorOrConfig as Validator<T>;
    } else {
      validators[key] = createValidator(validatorOrConfig as ValidateConfig<T>);
    }
  }

  const validate = (values: T) => {
    return Object.fromEntries(
      Object.entries(values as Record<string, unknown>).map(([k, v]) => {
        return [k, validators[k](v)];
      }),
    ) as Record<keyof T, ReturnType<Validator<T>>>;
  };

  return {
    validators,
    validate,
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
