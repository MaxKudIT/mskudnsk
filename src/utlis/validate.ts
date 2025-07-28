import zxcvbn from 'zxcvbn';

export type ValidatePhoneType = {
    normalizedPhone: string
    validMessage: string
}

export type ValidateAliasType = {
    alias: string
    validMessage: string
}

export type ValidatePasswordType = {
    password: string
    validMessage: string
}

export function ValidatePhoneFormat(phone: string): ValidatePhoneType {
  const cleaned = String(phone).replace(/\D/g, '');
  const LENGTH = cleaned.length === 11;

 if (!LENGTH) {
    return {   validMessage: 'Номер телефона должен иметь 11 символов (не включая "+")', normalizedPhone: '' };
  }

  if (!/^[78]/.test(cleaned)) {
    return {   validMessage: 'Номер телефона должен начинаться с ("+7", "7", "8")', normalizedPhone: '' };
  }

  let normalized = cleaned;
  
  if (normalized.startsWith('8')) {
    normalized = '7' + normalized.slice(1);
  }
  const validMessage = !/^7\d{10}$/.test(normalized) ? 'Неверный формат Номера телефона"' : '';
  
  return {validMessage, normalizedPhone: validMessage === '' ? normalized : '' };
}

export function ValidateAliasFormat(alias: string): ValidateAliasType {
    return alias.length < 3 ? {  validMessage: 'Псевдоним должен иметь более 2 символов', alias: ''} : {validMessage: '', alias}
}



type PasswordWarning =
        | "Straight rows of keys are easy to guess"
        | "Short keyboard patterns are easy to guess"
        | "Use a longer keyboard pattern with more turns"
        | "Repeats like \"aaa\" are easy to guess"
        | "Repeats like \"abcabcabc\" are only slightly harder to guess than \"abc\""
        | "Sequences like abc or 6543 are easy to guess"
        | "Recent years are easy to guess"
        | "Dates are often easy to guess"
        | "This is a top-10 common password"
        | "This is a top-100 common password"
        | "This is a very common password"
        | "This is similar to a commonly used password"
        | "A word by itself is easy to guess"
        | "Names and surnames by themselves are easy to guess"
        | "Common names and surnames are easy to guess"
        | "";

type WarningTranslate = {
    warnings: Record<PasswordWarning, string>
}

const WarningComments: WarningTranslate = {
    warnings: {
       "Straight rows of keys are easy to guess": "Прямые линии клавиш (например, 'qwerty') легко угадать",
    "Short keyboard patterns are easy to guess": "Короткие клавиатурные комбинации легко угадать",
    "Use a longer keyboard pattern with more turns": "Используйте более длинный и сложный клавиатурный шаблон",
    "Repeats like \"aaa\" are easy to guess": "Повторы символов (например, 'aaa') легко угадать",
    "Repeats like \"abcabcabc\" are only slightly harder to guess than \"abc\"": "Повторы комбинаций (например, 'abcabcabc') лишь немного сложнее угадать",
    "Sequences like abc or 6543 are easy to guess": "Последовательности (abc, 6543) легко угадать",
    "Recent years are easy to guess": "Недавние годы легко угадать",
    "Dates are often easy to guess": "Даты легко угадать",
    "This is a top-10 common password": "Этот пароль входит в топ-10 популярных",
    "This is a top-100 common password": "Этот пароль входит в топ-100 популярных",
    "This is a very common password": "Это очень распространённый пароль",
    "This is similar to a commonly used password": "Этот пароль похож на часто используемый",
    "A word by itself is easy to guess": "Отдельное слово легко угадать",
    "Names and surnames by themselves are easy to guess": "Имена и фамилии легко угадать",
    "Common names and surnames are easy to guess": "Популярные имена и фамилии легко угадать",
    "": "Пароль не содержит явных уязвимостей"
  },
}


export function ValidatePasswordFormat(pass: string):ValidatePasswordType {
    if (pass.length < 6) {
        return {validMessage: 'Пароль должен содержать более 5 символов', password: ''}
    }
    const result = zxcvbn(pass)
    return result.feedback.warning ? {validMessage: WarningComments.warnings[result.feedback.warning], password: ''} : {validMessage: '', password: pass}

}


