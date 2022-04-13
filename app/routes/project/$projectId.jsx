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

  return (
    <div className='project-wrapper'>
      <h1>{project.name}</h1>
      <div className='project-body'>
        <p>{project.made_for}</p>
        <p>{project.pattern_name}</p>
        <p>{project.status_name}</p>
        <img src={project.photos[0].medium_url} height={'300px'}/>
        <p>{project.notes}</p>
      </div>
      <Button className='button' variant='contained' to={`/project/${project.id}/edit`}>
        <Link component={Link} to={`/project/${project.id}/edit`}>Edit Project</Link>
      </Button>
      <Outlet project={project} />
    </div>
  )
}

export default Project;