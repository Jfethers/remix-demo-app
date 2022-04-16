import { response } from 'express';
import { useLoaderData, json, Link, Outlet } from 'remix';
import styles from './styles.css'
import { ImageList, ImageListItem } from '@mui/material';

export const links = () => [{
  rel: 'stylesheet',
  href: styles,
}]

export const loader = async ({ params }) => {

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
        <ImageList sx={{ width: '100%', height: 600 }} cols={2} rowHeight={200}>
          {project?.photos?.map((photo) => (
            <ImageListItem key={photo.id}>
              <img
                src={`${photo.medium_url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${photo.medium_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={photo.name}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <div className='project-body'>
          <h1>{project.name}</h1>
          <p>Made For: {project.made_for}</p>
          <p>Pattern Name: {project.pattern_name}</p>
          <p>Project Status: {project.status_name}</p>
          <p>Start Date: {project.started}</p>
          <p>Completed: {project.completed}</p>
          <p>{project.notes}</p>
          <Link className='project-link' to={`/project/${project.id}/edit`}> Edit Project </Link>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Project;