import { useState, useEffect, useRef } from 'react';
import { fromEvent, Observable, of } from 'rxjs'
import { ValidatorFn } from './Validations/index.types';


interface UseFormControl {
    value: any
    validations: Array<ValidatorFn>
}

interface UseFormControlReturn {
    value: Observable<Event>
    props: {
        ref: React.Ref<HTMLInputElement>
    }
    error: string | undefined
}

const useFormControl = <T extends UseFormControl>(value: T['value'], validations: T['validations']): UseFormControlReturn => {

    const controlRef = useRef<HTMLInputElement>(null)
    const [control$, setControl] = useState<Observable<Event>>(new Observable())
    const [error, setError] = useState<string>()

    useEffect(() => {
        if (controlRef.current) {
            setControl(fromEvent(controlRef.current, 'input'))
        }
    }, [controlRef])

    useEffect(() => {

        const errors = control$?.subscribe(
            e => {
                if (validations.length > 0) {
                    const error = validations
                        .filter(validation => typeof validation === 'function')
                        .map(validation => validation((e as any).target?.value))
                        .filter(validation => validation)
                    if (error[0]) {
                        setError(error[0])
                    } else {
                        setError(undefined)
                    }
                }
            }
        )

        return () => errors?.unsubscribe()

    }, [control$, validations])


    return {
        value: control$,
        props: {
            ref: controlRef,
        },
        error
    }
}


interface UseRawControl {
    value: any
    validations: Array<ValidatorFn>
}

interface UseRawControlReturn {
    value: Observable<Event>
    props: {
        ref: React.Ref<HTMLInputElement>
        onChange: <T>(e: T) => void
    }
    error: string | undefined
}

const useRawControl = <T extends UseRawControl>(value: T['value'], validations: T['validations']): UseRawControlReturn => {
    const controlRef = useRef<HTMLInputElement>(null)
    const [control$, setControl] = useState<Observable<any>>(new Observable())
    const [error, setError] = useState<string>()

    useEffect(() => {

        const error = control$?.subscribe(
            e => {
                if (validations.length > 0) {
                    const error = validations
                        .filter(validation => typeof validation === 'function')
                        .map(validation => {
                            if (e?.value) {
                                return validation(e.value)
                            }
                            return validation(e)
                        })
                        .filter(validation => validation)
                    if (error[0]) {
                        setError(error[0])
                    } else {
                        setError(undefined)
                    }
                }
            }
        )

        return () => error?.unsubscribe()

    }, [control$, error, validations])

    return {
        value: control$,
        props: {
            ref: controlRef,
            onChange: e => setControl(of(e))
        },
        error
    }
}

type GroupExtend<T> = { [k in keyof T]: UseFormControlReturn }

type Values<T extends GroupExtend<T>> = { [k in keyof T]: T[k]['value'] }
type Errors<T extends GroupExtend<T>> = { [k in keyof T]: T[k]['error'] }
type Props<T extends GroupExtend<T>> = { [k in keyof T]: T[k]['props'] }


interface UseFormGroup<T extends GroupExtend<T>> {
    values: Values<T>
    errors: Errors<T>
    props: Props<T>
}

const useFormGroup = <T extends GroupExtend<T>>(formControls: T): UseFormGroup<T> => {

    //const values: UseFormGroup<T>['values'] = Object.assign({})
    // const errors: UseFormGroup<T>['errors'] = Object.assign({})
    //const props: UseFormGroup<T>['props'] = Object.assign({})


    const errors = Object.keys(formControls).reduce<UseFormGroup<T>['errors']>((keys, key) => {
        return Object.assign(keys, { [key]: formControls[keys].errors })
    }, {} as UseFormGroup<T>['errors'])

    const values = Object.keys(formControls).reduce<UseFormGroup<T>['values']>((keys, key) => {
        return Object.assign(keys, { [key]: formControls[keys].errors })
    }, {} as UseFormGroup<T>['values'])

    const props = Object.keys(formControls).reduce<UseFormGroup<T>['props']>((keys, key) => {
        return Object.assign(keys, { [key]: formControls[keys].errors })
    }, {} as UseFormGroup<T>['props'])


    // Object.keys(formControls).forEach(key => {
    //     values[key] = (formControls)[key].value
    //     errors[key] = (formControls)[key].error
    //     props[key] = (formControls)[key].props
    // })

    return {
        values,
        errors,
        props
    }
}

export { useFormControl, useFormGroup, useRawControl };
