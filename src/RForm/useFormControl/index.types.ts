import { ValidatorFn } from "../Validations/index.types";
import { Observable } from "rxjs";

export interface UseFormControl<TValue = any> {
   value: TValue
   validations: Array<ValidatorFn>
}

export interface UseFormControlReturn<Ref, TValue = any> {
   value: TValue
   value$: Observable<Event>
   props: {
      ref: React.Ref<Ref>
   }
   error: string | undefined
}