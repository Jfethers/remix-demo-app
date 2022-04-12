import { response } from 'express';
import { useLoaderData, json, Link, Outlet } from 'remix';


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
      <Link to={'/projects'}>Projects</Link>
      <h1>{project.name}</h1>
      <p>{project.made_for}</p>
      <p>{project.pattern_name}</p>
      <p>{project.status_name}</p>
      <img src={project.photos[0].medium_url} height={'300px'}/>
      <p>{project.notes}</p>
      <Outlet project={project} />
    </div>
  )
}

export default Project;