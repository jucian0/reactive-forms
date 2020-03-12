import { ValidatorFn } from "../index.types";
import { isEmptyInputValue, EMAIL_REGEXP, URL_REGEX } from "../index.utils";

export class Validators {

    static required(message: string = ''): ValidatorFn {
        return value => isEmptyInputValue(value) ? message : null;
    }

    static requiredTrue(message: string = ''): ValidatorFn {
        return value => value === true ? null : message;
    }

    static email(message: string = ''): ValidatorFn {
        return value => {
            if (isEmptyInputValue(value)) {
                return null;
            }
            if (!EMAIL_REGEXP.test(value)) {
                return message
            }
            return null;
        }
    }

    static url(message: string = ''): ValidatorFn {

        return value => {
            if (isEmptyInputValue(value)) {
                return null;
            }
            if (!URL_REGEX.test(value)) {
                return message
            }
            return null;
        }
    }

    static pattern(pattern: string | RegExp, message: string = ''): ValidatorFn {
        let regex: RegExp;
        let regexStr: string;
        if (typeof pattern === 'string') {
            regexStr = '';

            if (pattern.charAt(0) !== '^') regexStr += '^';

            regexStr += pattern;

            if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';

            regex = new RegExp(regexStr);
        } else {
            regexStr = pattern.toString();
            regex = pattern;
        }
        return value => {
            if (isEmptyInputValue(value)) {
                return null;
            }

            if (!regex.test(value)) {
                return message
            }
            return null

        };
    }
}

