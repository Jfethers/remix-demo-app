import React from 'react';
import { Form } from "@remix-run/react";
import { useLoaderData, json, Link, Outlet, redirect, useActionData } from 'remix';
import styles from './styles.css';
import { TextField } from '@mui/material';
import errorImg from '../../assets/error.jpg';

export const links = () => [{
  rel: 'stylesheet',
  href: styles, 
},
// {
//   rel: 'prefetch',
//   as: 'image',
//   href: '../../public/error.jpg',
// },

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

const validateName = name => {
  if (name?.length == 0) {
    return 'Name is required!'
  }
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

  const fieldErrors = {
    name: validateName(formValues.name)
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return json({ fieldErrors, formValues }, { status: 400 });
  }

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
  const actionData = useActionData();
  console.log('actionData', actionData);

  return (
    <div className='edit-form-wrapper'>
      <Link to='/projects'>Back</Link>
      <Form method='post' className='edit-form'>
        <TextField defaultValue={project.name} required={true} id="filled-basic" label="Project Name" variant="filled" name={project?.name}/>
        <TextField defaultValue={project.made_for} id="filled-basic" label="Made For" variant="filled" name={project?.made_for}/>
        <TextField defaultValue={project.progress} id="filled-basic" label="Progress" variant="filled" name={project?.progress}/>
        <TextField defaultValue={project.rating} id="filled-basic" label="Project Rating" variant="filled" name={project?.rating}/>
        <TextField defaultValue={project.craft_name} id="filled-basic" label="Craft Name" variant="filled" name={project?.craft_name}/>
        {project.needle_sizes.map(needle => {
          return (
            <div className='needles'>
              <TextField defaultValue={needle.us} id="filled-basic" label="US Needle Size" variant="filled" name={needle.us}/>

              <TextField defaultValue={needle.metric} id="filled-basic" label="Metric Needle Size" variant="filled" name={needle.metric}/>
            </div>
          )
        })}
        <Link className='button' type='submit'>Update Project</Link>
      </Form>
    </div>
  )
}

export function ErrorBoundary({ error }) {

  return (
    <div className='error-wrapper'>
      <h1>Uh Oh - Looks like we dropped a stitch</h1>
      <p className='error-message'>Error: {error.message}</p>
      <img className='error-img' src={errorImg} height='400' width='400'/>
      <Link to={'/projects'}>Go Back to Projects</Link>
    </div>
  )
}

export default editPost