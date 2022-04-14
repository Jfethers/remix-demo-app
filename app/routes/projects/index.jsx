import { response } from 'express';
import { useEffect } from 'react';
import { useLoaderData, json, Link, Outlet } from 'remix';
import styles from '~/routes/projects/styles.css';
import { ImageList, ImageListItem, ImageListItemBar, IconButton } from '@mui/material';

export const links = () => [
  {
    rel: 'stylesheet',
    href: styles
  },
]

export const loader = async () => {

  const headers = new Headers();
  const user = process.env.USERNAME;
  const password = process.env.PASSKEY;
  headers.append('Authorization', 'Basic ' + btoa(`${user}:${password}`));

  const res = await fetch('https://api.ravelry.com/projects/noone1200/list.json', { method: 'GET', headers: headers });
  return json(await res.json());
}

function Home() {

  const { projects } = useLoaderData();

  return (
    <div className='projectsRoute'>
      <ImageList sx={{ width: 1000, height: 1000 }} cols={3} rowHeight={300}>
        {projects.map((project) => (
          <Link to={`/project/${project.id}`}>
            <ImageListItem key={project.id}>
              <img
                src={`${project.first_photo.medium_url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${project.first_photo.medium_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={project.name}
                loading="lazy"
              />
              <ImageListItemBar
              title={project.name}
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
      <Outlet />
    </div>
  )
}

export default Home

