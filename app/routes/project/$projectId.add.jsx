import React from 'react';
import { Form } from "@remix-run/react";
import { useLoaderData, json, Link, Outlet, redirect, useActionData } from 'remix';


/**
 * 
 * to do: 
 * add in validations
 */

const validateName = name => {
  if (name.length == 0) {
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
    return json({fieldErrors, formValues}, { status: 400});
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

  return (
    <div className='edit-form-wrapper'>
      <Link to='/projects'>Back</Link>
      <Form method='post'>
        <h1>ADD NEW PROJECT</h1>
        <label htmlFor='name'>Project Name</label>
        {/* <input defaultValue={actionData?.formValues?.name || project?.name} name='name' /> */}
        <input name='name' />
        {/* <div className='form-error'><p>{actionData?.fieldErrors?.name && (actionData?.fieldErrors?.name) }</p></div> */}
        <label htmlFor='name'>Made For</label>
        <input name='made_for' />
        <button className='button' type='submit'>Add Project</button>
      </Form>
    </div>
  )
}

export default editPost