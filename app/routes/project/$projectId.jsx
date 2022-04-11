import { response } from 'express';
import { useLoaderData, json, Link } from 'remix';


export async function loader(params) {

  const headers = new Headers();
  const user = process.env.USERNAME;
  const password = process.env.PASSKEY;
  const projectId = params.params.projectId;

  headers.append('Authorization', 'Basic ' + btoa(`${user}:${password}`));

  const res = await fetch(`https://api.ravelry.com/projects/noone1200/${projectId}.json`, { method: 'GET', headers: headers });
  return json(await res.json());
}

function Project() {
  const { project } = useLoaderData();

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.made_for}</p>
    </div>
  )
}

export default Project;