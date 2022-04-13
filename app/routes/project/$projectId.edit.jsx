import React from 'react';
import { Form } from "@remix-run/react";
import { useLoaderData, json, Link, Outlet, redirect } from 'remix';
import Button from '@mui/material/Button';

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
  // console.log('params', params);
  const user = process.env.USERNAME;
  const password = process.env.PASSKEY;
  const projectId = params.projectId;

  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Basic ' + btoa(`${user}:${password}`));

  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(formValues),
    redirect: 'follow'
  };
  const res = await fetch(`https://api.ravelry.com/projects/noone1200/${projectId}.json`, requestOptions)
    .then(response => {
      redirect(`/project/${res.id}`)
      response.text()
    })
    .catch(error => console.log('error', error));
  return redirect(`/project/${projectId}`);
}

function editPost() {
  const { project } = useLoaderData();

  return (
    <div className='edit-form-wrapper'>
      <Link to='/projects'>Back</Link>
      <Form method='post'>
        <label htmlFor='name'>Project Name</label>
        <input defaultValue={project.name} name='name' required={true} />
        <label htmlFor='name'>Made For</label>
        <input defaultValue={project.made_for} name='made_for' />
        <Button className='button' variant='contained' type='submit'>Update Project</Button>
      </Form>
    </div>
  )
}

export default editPost