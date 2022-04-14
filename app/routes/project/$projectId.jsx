import { response } from 'express';
import { useLoaderData, json, Link, Outlet } from 'remix';
import styles from './styles.css'
import Button from '@mui/material/Button';

export const links = () => [{
  rel: 'stylesheet',
  href: styles,
}]

export const loader = async ({params}) => {

  const headers = new Headers();
  const user = process.env.USERNAME;
  const password = process.env.PASSKEY;
  const projectId = params.projectId;

  headers.append('Authorization', 'Basic ' + btoa(`${user}:${password}`));

  const res = await fetch(`https://api.ravelry.com/projects/noone1200/${projectId}.json`, { method: 'GET', headers: headers });
  return json(await res.json());
}

function Project() {
  const { project } = useLoaderData();
  console.log('project', project);

  return (
    <>
      <div className='project-wrapper'>
        <div className='img-wrapper'>
          <img src={project.photos[0].medium_url} height={'300px'}/>
        </div>
        <div className='project-body'>
          <h1>{project.name}</h1>
          <p>Made For: {project.made_for}</p>
          <p>Pattern Name: {project.pattern_name}</p>
          <p>Project Status: {project.status_name}</p>
          <p>Start Date: {project.started}</p>
          <p>Completed: {project.completed}</p>
          <p>{project.notes}</p>
        </div>
        <Outlet project={project} />
      </div>
      <Link className='project-link' to={`/project/${project.id}/edit`}> Edit Project </Link>
    </>
  )
}

export default Project;