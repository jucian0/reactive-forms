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

  const { props: testRef, value, error } = useFormControl(
    '',
    [
      Number.is('Age must be a number'),
      Number.min(18, 'Age is less than 18 years'),
      Validators.required('Age is required')
    ]
  )


  const { errors, values, props } = useFormGroup({
    userName: useFormControl(
      '',
      [
        String.maxLength(10, 'Name have more than 10 characters'),
        String.minLength(3, 'Name have less than 3 characters'),
        String.is('Name must be a string'),
        Validators.required('Name is required')
      ]
    ),
    userEmail: useFormControl(
      '',
      [
        Validators.email('E-mail must be a valid e-mail'),
        Validators.required('E-mail is required')
      ]
    ),

    userAge: useFormControl(
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
    acept: useFormControl(
      false,
      []
    ),
    checkbox: useFormControl(
      false,
      []
    ),
    select: useFormControl(
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

  value.subscribe((e: any) => console.log(e.target.value))

  values.fruits?.subscribe((e: any) => console.log(e))


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
        {/* {...props.userAge.userAge} */}

        <div className="form-group">
          <label>Test</label>
          <input type="text" className="form-control" {...testRef} autoComplete="off" />
          <span className="text-error">{error}</span>
        </div>

        <div className="form-group">
          <label>ReactSelect</label>
          {/* <Select
            {...props.fruits}
            isClearable
            options={options}
          /> */}
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
