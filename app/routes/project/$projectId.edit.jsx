import React from 'react';
import { Form } from "@remix-run/react";
import { useLoaderData, json, Link, Outlet, redirect, useActionData } from 'remix';
import styles from './styles.css';
import { TextField, Button, Grid } from '@mui/material';
import errorImg from '../../assets/error.jpg';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const links = () => [{
  rel: 'stylesheet',
  href: styles,
},
]
export const loader = async ({ params }) => {

  const headers = new Headers();
  const user = process.env.USERNAME;
  const password = process.env.PASSKEY;
  const projectId = params.projectId;

  headers.append('Authorization', 'Basic ' + btoa(`${user}:${password}`));

  const res = await fetch(`https://api.ravelry.com/projects/noone1200/${projectId}.json`, { method: 'GET', headers: headers });
  return json(await res.json());
}

export const action = async ({ request, params }) => {

  const user = process.env.USERNAME;
  const password = process.env.PASSKEY;
  const projectId = params.projectId;

  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Basic ' + btoa(`${user}:${password}`));

  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);
  console.log('formValues', formValues);



  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(formValues),
    redirect: 'follow'
  };

  const res = await fetch(`https://api.ravelry.com/projects/noone1200/${projectId}.json`, requestOptions)
    .catch(error => console.log('error', error));
  return redirect(`/project/${projectId}`);
}

const handleCraftChange = e => {

}

function editPost() {
  const { project } = useLoaderData();
  // console.log('project', project);
  return (
    <div className='edit-form-wrapper'>
      <h1>Edit {project.name}</h1>
      <Form method='post' className='edit-form'>
        <TextField defaultValue={project?.name} required={true} id="filled-basic" label="Project Name" variant="filled" name='name' />
        <TextField defaultValue={project.made_for} id="filled-basic" label="Made For" variant="filled" name={'made_for'} />
        <TextField defaultValue={project?.progress} id="filled-basic" label="Progress" variant="filled" name={'progress'} />
        <TextField defaultValue={project?.rating} id="filled-basic" label="Project Rating" variant="filled" name={'rating'} />
        <TextField defaultValue={project?.craft_name} id="filled-basic" label="Craft Name" variant="filled" name={'craft_name'} />
        <Button className='button' variant='text' type='submit'>Update Project</Button>
      </Form>
    </div>
  )
}

export function ErrorBoundary({ error }) {

  return (
    <div className='error-wrapper'>
      <h1>Uh Oh - Looks like we dropped a stitch</h1>
      <p className='error-message'>Error: {error.message}</p>
      <img className='error-img' src={errorImg} height='400' width='400' />
      <Link to={'/projects'}>Go Back to Projects</Link>
    </div>
  )
}

export default editPost