import { useState, useEffect, useRef } from 'react';
import { fromEvent, Observable, from, BehaviorSubject, of } from 'rxjs'


const useFormControl = <T>(value: T, validations: Array<any>) => {

    const controlRef = useRef<HTMLInputElement>(null)
    const [control$, setControl] = useState<Observable<Event>>()
    const [error, setError] = useState()

    useEffect(() => {
        if (controlRef.current) {
            setControl(fromEvent(controlRef.current, 'input'))
        }
    }, [controlRef])

    useEffect(() => {

        control$?.subscribe(
            (e: any) => {
                if (validations.length > 0) {
                    const error = validations
                        .filter(validation => typeof validation === 'function')
                        .map(validation => validation(e.target.value))
                        .filter(validation => validation)
                    if (error) {
                        setError(error[0])
                    }
                }
            }
        )

    }, [control$, validations])


    return {
        value: control$,
        validations,
        ref: controlRef,
        error
    }
}

const useRawControl = <T>(value: T, validations: Array<any>) => {
    const controlRef = useRef<HTMLInputElement>(null)
    const [control$, setControl] = useState<Observable<any>>()
    const [error, setError] = useState()

    useEffect(() => {

        control$?.subscribe(
            (e: any) => {
                if (validations.length > 0) {
                    const error = validations
                        .filter(validation => typeof validation === 'function')
                        .map(validation => {
                            console.log(e)
                            if (e?.value) {
                                return validation(e.value)
                            }
                            return validation(e)
                        })
                        .filter(validation => validation)
                    if (error) {
                        console.log('ERROR')
                        setError(error[0])
                    }
                }
            }
        )

    }, [control$, error, validations])


    return {
        value: control$,
        validations,
        ref: {
            ref: controlRef,
            onChange: (e: any) => setControl(of(e))
        },
        error
    }
}


const useFormGroup = <T extends any>(formControls: T) => {

    const values: any = {}
    const errors: any = {}
    const ref: any = {}

    Object.keys(formControls).forEach(key => {
        values[key] = formControls[key].value
        errors[key] = formControls[key].error
        ref[key] = formControls[key].ref
    })

    return {
        values,
        errors,
        ref
    }
}



export { useFormControl, useFormGroup, useRawControl };
