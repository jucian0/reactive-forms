import { useState, useEffect, useRef } from "react";
import { Observable, fromEvent, BehaviorSubject } from "rxjs";

export const useOf = (initialState = {}) => {
    const [observable$] = useState(new BehaviorSubject(initialState));

    const handleNext = (value: typeof initialState) => {
        observable$.next(value);
    };

    return [observable$, handleNext];
};


export const useFromEvent = <T extends React.Ref<HTMLInputElement>>(ref: T, event: string) => {
    const [observable$, setObservable] = useState<Observable<Event>>(fromEvent(document.body, event))

    useEffect(() => {
        if ((ref as any).current) {
            setObservable(fromEvent((ref as any).current, event))
        }
    }, [event, ref])


    return observable$
}
