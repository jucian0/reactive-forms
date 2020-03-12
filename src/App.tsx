import React, { useEffect } from 'react';
import './App.css';
import { useFormControl, useFormGroup } from './RForm';
import { Validators, Number, String } from './RForm/Validations';
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


const App: React.FC = () => {

  const test = useFormControl(
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
    fruits: useFormControl(
      options[0].value,
      [
        String.is('Fruit must be a string'),
        Validators.required('Fruit is required')
      ]
    )
  })


  values.fruits?.subscribe((e: any) => console.log(e))

  console.log(values.fruits)


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
          <input type="text" className="form-control" {...props.userEmail} autoComplete="off" />
          <span className="text-error">{errors.userEmail}</span>
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="text" className="form-control" {...props.userAge} autoComplete="off" />
          <span className="text-error">{errors.userAge}</span>
        </div>

        <div className="form-group">
          <label>Test</label>
          <input type="text" className="form-control" {...test.props} autoComplete="off" />
          <span className="text-error">{test.error}</span>
        </div>
        <div className="form-group">
          <label>Test</label>
          <Select
            // controlRef={props.ref}
            options={options}
            {...props.fruits}
          />
        </div>
        <button type="button" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;
