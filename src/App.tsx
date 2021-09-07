import React, { useEffect } from 'react';
import './App.css';
import { useFormControl, useFormGroup, useRawControl } from './RForm';
import { Validators, Number, String } from './RForm/Validations';
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


const App: React.FC = () => {

  const { props: testRef, value$, error } = useFormControl<HTMLInputElement>(
    '',
    [
      Number.is('Age must be a number'),
      Number.min(18, 'Age is less than 18 years'),
      Validators.required('Age is required')
    ]
  )


  const { errors, values$, props, values } = useFormGroup({
    userName: useFormControl<HTMLInputElement>(
      '',
      [
        String.maxLength(10, 'Name has more than 10 characters'),
        String.minLength(3, 'Name has less than 3 characters'),
        String.is('Name must be a string'),
        Validators.required('Name is required')
      ]
    ),
    userEmail: useFormControl<HTMLTextAreaElement>(
      '',
      [
        Validators.email('E-mail must be a valid e-mail'),
        Validators.required('E-mail is required')
      ]
    ),

    userAge: useFormControl<HTMLInputElement>(
      0,
      [
        Number.is('Age must be a number'),
        Number.min(18, 'Age is less than 18 years'),
        Validators.required('Age is required')
      ]
    ),
    fruits: useRawControl(
      '',
      [
        String.is('Fruit must be a string'),
        Validators.required('Fruit is required')
      ]
    ),
    acept: useFormControl<HTMLInputElement>(
      false,
      []
    ),
    checkbox: useFormControl<HTMLInputElement>(
      false,
      []
    ),
    select: useFormControl<HTMLSelectElement>(
      '',
      [
        String.is('Fruit must be a string'),
        Validators.required('Fruit is required')
      ]
    )
  })

  // values.userEmail?.subscribe((e: any) => console.log(e.target.value))
  //values.fruits?.subscribe((e: any) => console.log(e.target.value))
  // values.acept?.subscribe((e: any) => console.log(e.target.checked))
  // values.checkbox?.subscribe((e: any) => console.log(e.target.checked))
  // values.userName?.subscribe((e: any) => console.log(e.target.value))

  value$.subscribe((e: any) => console.log(e.target.value))

  values$.fruits?.subscribe((e: any) => console.log(e))

  console.log(values.userEmail)


  return (
    <div className="content">
      <form>
        <div className="form-group">
          <label>Nome</label>
          <input type="text" className="form-control" {...props.userName} autoComplete="off" />
          <span className="text-error">{errors.userName}</span>
        </div>
        <div className="form-group">
          <label>E-mail</label>
          <textarea className="form-control" {...props.userEmail} autoComplete="off" />
          <span className="text-error">{errors.userEmail}</span>
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="text" className="form-control" {...props.userAge} autoComplete="off" />
          <span className="text-error">{errors.userAge}</span>
        </div>

        <div className="form-group">
          <label>Test</label>
          <input type="text" className="form-control" {...testRef} autoComplete="off" />
          <span className="text-error">{error}</span>
        </div>

        <div className="form-group">
          <label>ReactSelect</label>
          <Select
            {...props.fruits}
            isClearable
            options={options}
          />
          <span className="text-error">{errors.fruits}</span>
        </div>

        <div className="form-group">
          <label>Select</label>
          <select {...props.select} id="fruits">
            <option value="">All</option>
            <option value="tomate">Tomate</option>
            <option value="tomate">Banana</option>
            <option value="tomate">Melancia</option>
          </select>
          <span className="text-error">{errors.select}</span>
        </div>

        <div className="form-group">
          <label>Acept</label>
          <input type="radio" className="form-control" {...props.acept} id="acept" />
          <span className="text-error">{error}</span>
        </div>

        <div className="form-group">
          <label>Checkbox</label>
          <input type="checkbox" className="form-control" {...props.checkbox} id="acept" />

          <span className="text-error">{error}</span>
        </div>

        <button type="button" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;
