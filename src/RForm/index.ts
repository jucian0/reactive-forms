import { useState } from 'react';

const useForm = <T extends { [x: string]: any }>(initialState: T) => {

    const [values, setValues] = useState<T>(initialState);

    const handleSubmit = (event: any) => {
        if (event) event.preventDefault();
    };


    const text = (name: string) => {
        return ({
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, [name]: event.target.value }),
            name,
            value: values[name],
            id: name
        })
    };

    const checkbox = (name: string) => {
        return ({
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, [name]: event.target.checked }),
            name,
            checked: values[name],
            id: name
        })
    };

    const raw = (name: string) => {
        return ({
            onChange: (event: any) => setValues({ ...values, [name]: event }),
            name,
            value: values[name],
            id: name
        })
    };

    return {
        types: {
            text,
            checkbox,
            raw
        } as Test,
        events: {
            handleSubmit
        },
        values,
    }
};

export default useForm;


type Test<T, Name> = {
    text: InputInitializer<T, Args<Name>, BaseInputProps<T>>
    checkbox: InputInitializer<T, Args<Name>, BaseInputProps<T>>
    raw: InputInitializer<T, Args<Name>, BaseInputProps<T>>
}

interface Inputs<T, Name extends keyof T = keyof T> {
    // prettier-ignore
    select: InputInitializer<T, Args<Name>, Omit<BaseInputProps<T>, 'type'>>;
    email: InputInitializer<T, Args<Name>, BaseInputProps<T>>;
    color: InputInitializer<T, Args<Name>, BaseInputProps<T>>;
    password: InputInitializer<T, Args<Name>, BaseInputProps<T>>;
    text: InputInitializer<T, Args<Name>, BaseInputProps<T>>;
    textarea: InputInitializer<T, Args<Name>, Omit<BaseInputProps<T>, 'type'>>;
    url: InputInitializer<T, Args<Name>, BaseInputProps<T>>;
    search: InputInitializer<T, Args<Name>, BaseInputProps<T>>;
    number: InputInitializer<T, Args<Name>, BaseInputProps<T>>;
    range: InputInitializer<T, Args<Name>, BaseInputProps<T>>;
    tel: InputInitializer<T, Args<Name>, BaseInputProps<T>>;
    //radio: InputInitializer<T, Args<Name, OwnValue>, RadioProps<T>>;
    date: InputInitializer<T, Args<Name>, BaseInputProps<T>>;
    month: InputInitializer<T, Args<Name>, BaseInputProps<T>>;
    week: InputInitializer<T, Args<Name>, BaseInputProps<T>>;
    time: InputInitializer<T, Args<Name>, BaseInputProps<T>>;
    /**
     * Checkbox inputs with a value will be treated as a collection of choices.
     * Their values in in the form state will be of type Array<string>.
     *
     * Checkbox inputs without a value will be treated as toggles. Their values in
     * in the form state will be of type boolean
     */
    checkbox(name: Name, ownValue?: OwnValue): CheckboxProps<T>;
    checkbox(options: InputOptions<T, Name, Maybe<OwnValue>>): CheckboxProps<T>;

    // raw<RawValue, Name extends keyof T = keyof T>(
    //     name: Name,
    // ): RawInputProps<T, Name, RawValue>;
    // raw<RawValue, Name extends keyof T = keyof T>(
    //     options: RawInputOptions<T, Name, RawValue>,
    // ): RawInputProps<T, Name, RawValue>;

    // label(name: string, value?: string): LabelProps;
    // id(name: string, value?: string): string;
}

interface InputInitializer<T, Args extends any[], ReturnValue> {
    (...args: Args): ReturnValue;
    (options: InputOptions<T, Args[0], Args[1]>): ReturnValue;
}

interface BaseInputProps<T> {
    id: string;
    onChange(event: any): void;
    onBlur(event: any): void;
    value: string;
    name: Extract<keyof T, string>;
    type: string;
}

interface CheckboxProps<T> extends BaseInputProps<T> {
    checked: boolean;
}


type Args<Name, Value = void> = [Name, Value];

type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type OwnValue = string | number | boolean | string[];

type Maybe<T> = T | undefined;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


type InputOptions<T, Name, Value = void> = {
    name: Name;
    validateOnBlur?: boolean;
    touchOnChange?: boolean;
    validate?(
        value: string,
        //values: StateValues<T>,
        event: React.ChangeEvent<InputElement> | React.FocusEvent<InputElement>,
    ): any;
    onChange?(event: React.ChangeEvent<InputElement>): void;
    onBlur?(event: React.FocusEvent<InputElement>): void;
}// & WithValue<Value>;