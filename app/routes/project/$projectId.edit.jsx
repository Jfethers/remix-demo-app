import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, json, Link, Outlet, redirect } from 'remix';

export async function loader(params) {

  const headers = new Headers();
  const user = process.env.USERNAME;
  const password = process.env.PASSKEY;
  const projectId = params.params.projectId;

  headers.append('Authorization', 'Basic ' + btoa(`${user}:${password}`));

  const res = await fetch(`https://api.ravelry.com/projects/noone1200/${projectId}.json`, { method: 'GET', headers: headers });
  return json(await res.json());
}

export const action = async ({ request, params } ) => {

  const headers = new Headers();
  const user = process.env.USERNAME;
  const password = process.env.PASSKEY;
  const projectId = params.projectId;
  headers.append('Authorization', 'Basic ' + btoa(`${user}:${password}`));

  const form = await request.formData();
  const name = form.get('name');
  const made_for = form.get('made_for');
  const fields = { name, made_for }
  const stringifyFields = JSON.stringify(fields);
  console.log('stringifyFields', stringifyFields);
  // todo: this doesn't work, be back later.
  const res = await fetch(`https://api.ravelry.com/projects/noone1200/${projectId}.json`,
  {
    method: 'POST',
    headers: headers,
    body: { data: JSON.stringify(fields)}
  });
  console.log('res', res);
  return json(await res.json());
  
  // return redirect(`/project/${projectId}`)
}
function editPost() {
  const { project } = useLoaderData();



  const { control, handleSubmit, register, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: project.name,
      made_for: project.made_for,
    }
  });
  const onSubmit = data => {
    return console.log('data', data);
  }

  return (
    <div className='edit-form-wrapper'>
      <Link to='/projects'>Back</Link>
      <form method='POST'>
        <label htmlFor='name'>Project Name</label>
        <input defaultValue={project.name} {...register('name')} name='name' />
        <label htmlFor='name'>Made For</label>
        <input defaultValue={project.made_for} {...register('made_for')} name='made_for' />
        <button className='button' type='submit'>Update Project</button>
      </form>
    </div>
  )
}

export default editPost