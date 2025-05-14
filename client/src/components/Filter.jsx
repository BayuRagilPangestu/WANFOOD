import React from 'react';
import { Form, Link } from 'react-router-dom';
import FormInput from './Form/FormInput';
import FormSelect from './Form/FormSelect';
import { useLoaderData } from 'react-router-dom';

const Filter = () => {
    const { params } = useLoaderData();
    const { name, category } = params;
    const categories = ["kanzler", "champ", "fiesta", "cedea", "so good", "belfoods", "kimbo", "golden farm"];
  return (
    <Form method='get' className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-3 grid-cols-2 items-center'>
        <FormInput Label="Search Product" type='search' name='name' defaultValue={name} />
        <FormSelect Label="Select category" name='category' List={categories} defaultValue={category} />
        <button type='submit' className='btn btn-primary'>SEARCH</button>
        <Link to='/products' className='btn btn-accent'>RESET</Link>
    </Form>
  );
};

export default Filter;
