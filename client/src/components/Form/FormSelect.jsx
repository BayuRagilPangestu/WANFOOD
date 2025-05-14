import React from 'react';

const FormSelect = ({Label, name, List, defaultValue}) => {
  return (
    <div className='form-control'>
        <label className='label'>
            <span className='capitalize label-text'>{Label}</span>
        </label>
        <select 
            name={name} 
            className='select select-bordered' 
            defaultValue={defaultValue} 
        >
            {List.map((item) => {
                return (
                    <option key={item} value={item}>
                        {item}
                    </option>
                );
            })}
        </select>
    </div>
  );
};

export default FormSelect;
