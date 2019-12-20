import React from 'react';
import './App.css';
import useForm from './RForm';
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


const App: React.FC = () => {

  const { values, types, events } = useForm({
    name: '',
    sobrenome: '',
    acert: true,
    selectbox: {
      value: '',
      label: ''
    }
  });

  console.log(values);

  return (
    <div className="content">
      <form onSubmit={events.handleSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input type="text" className="form-control" {...types.text('name')} required />
        </div>
        <div className="form-group">
          <label>Sobrenome</label>
          <input type="text" className="form-control" {...types.text('sobrenome')} required />
        </div>
        <div className="form-group">
          <label>SelectBox</label>
          <Select
            options={options}
            {...types.raw('selectbox')}
          />
        </div>
        <div className="form-check">
          <label>Check me out</label>
          <input type="checkbox" className="form-check-input" {...types.checkbox('acert')} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;
