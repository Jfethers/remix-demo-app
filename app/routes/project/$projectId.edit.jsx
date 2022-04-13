import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, json, Link, Outlet, redirect } from 'remix';

export const loader = async ({ params }) => {

  const headers = new Headers();
  const user = process.env.USERNAME;
  const password = process.env.PASSKEY;
  const projectId = params.projectId;

  headers.append('Authorization', 'Basic ' + btoa(`${user}:${password}`));

  const res = await fetch(`https://api.ravelry.com/projects/noone1200/${projectId}.json`, { method: 'GET', headers: headers });
  // console.log('res', res);
  return json(await res.json());
}

export const action = async ({ request, params }) => {
  console.log('params', params);
  const user = process.env.USERNAME;
  const password = process.env.PASSKEY;

  var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Basic ' + btoa(`${user}:${password}`));

  const formData = new FormData();

      formData.append("name", "julissa 2");
      formData.append("made_for", "mee");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  };

  fetch("https://api.ravelry.com/projects/noone1200/30041536.json", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    return {};


}
function editPost() {
  const { project } = useLoaderData();

  const { control, handleSubmit, register, watch, formState: { errors } } = useForm({
    defaultValue: {
      name: project.name,
      made_for: project.made_for,
    }
  });

  return (
    <div className='edit-form-wrapper'>
      <Link to='/projects'>Back</Link>
      <form method='post'>
        {/* <form method='POST'> */}
        <label htmlFor='name'>Project Name</label>
        <input defaultValue={project.name} {...register('name')} name='name' required={true} />
        <label htmlFor='name'>Made For</label>
        <input defaultValue={project.made_for} {...register('made_for')} name='made_for' />
        <button className='button' type='submit'>Update Project</button>
      </form>
    </div>
  )
}

export default editPost