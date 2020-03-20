import { ValidatorFn } from "../Validations/index.types";
import { Observable } from "rxjs";

export interface UseRawControl<TValue = any> {
   value: TValue
   validations: Array<ValidatorFn>
}

export interface UseRawControlReturn<Ref, TValue = any> {
   value: TValue
   value$: Observable<Event>
   props: {
      ref: React.Ref<Ref>
      onChange: <T>(e: T) => void
   }
   error: string | undefined
}

