import { ValidatorFn } from "../index.types"
import { isEmptyInputValue } from "../index.utils"

export class Number {
    static is(message: string = ''): ValidatorFn {
        return value => {
            if (isEmptyInputValue(value)) {
                return null
            }
            if (isNaN(value)) {
                return message
            }
            return null
        }
    }

    static min(min: number, message: string = ''): ValidatorFn {
        return value => {

            if (isEmptyInputValue(value) || isEmptyInputValue(min)) {
                return null
            }

            const valueFloat = parseFloat(value)

            if (!isNaN(valueFloat) && value < min) {
                return message
            }
            return null
        }
    }

    static max(max: number, message: string = ''): ValidatorFn {
        return value => {
            if (isEmptyInputValue(value) || isEmptyInputValue(max)) {
                return null
            }

            const valueFloat = parseFloat(value);

            if (!isNaN(valueFloat) && value > max) {
                return message
            }
            return null
        };
    }
}