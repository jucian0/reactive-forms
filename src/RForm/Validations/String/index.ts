import { ValidatorFn } from "../index.types"
import { isEmptyInputValue } from "../index.utils"

export class String {
    static is(message: string = ''): ValidatorFn {
        return value => {
            if (isEmptyInputValue(value)) {
                return null
            }
            if (!isNaN(value)) {
                return message
            }
            return null
        }
    }

    static trim(message: string = ''): ValidatorFn {
        return value => {
            if (value !== value.trim()) {
                return null
            }
            if (value !== value.toLowerCase()) {
                return message
            }
            return null
        }
    }

    static lowercase(message: string = ''): ValidatorFn {
        return value => {
            if (isEmptyInputValue(value)) {
                return null
            }
            if (value !== value.toLowerCase()) {
                return message
            }
            return null
        }
    }

    static uppercase(message: string = ''): ValidatorFn {
        return value => {
            if (isEmptyInputValue(value)) {
                return null
            }
            if (value.toUpperCase() !== value) {
                return message
            }
            return null
        }
    }

    static minLength(minLength: number, message: string = ''): ValidatorFn {
        return value => {
            if (isEmptyInputValue(value)) {
                return null;
            }
            const length: number = value?.length;
            if (length < minLength) {
                return message
            }
            return null
        };
    }

    static maxLength(maxLength: number, message: string = ''): ValidatorFn {
        return value => {
            if (isEmptyInputValue(value)) {
                return null;
            }
            const length: number = value?.length;
            if (length > maxLength) {
                return message
            }
            return null
        };
    }
}