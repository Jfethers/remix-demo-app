import { response } from 'express';
import { useEffect } from 'react';
import { useLoaderData, json, Link, Outlet } from 'remix';
import styles from '~/routes/projects/styles.css';

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
      <h1>Projects</h1>
      <div className='row'>
        {projects?.map((project, index) => {
          console.log('project', project);
          if (index % 2 === 0) {
            return (
              <div key={project.id} className='column'>
                <div className='project'>
                  <Link to={`/project/${project.id}`}>
                    <img className='product-img' src={project.first_photo.medium_url} />
                    <h1>{project.name}</h1>
                  </Link>
                </div>
              </div>
            )
          } else {
            return (
              <div key={project.id} className='column'>
                <div className='project'>
                  <Link to={`/project/${project.id}`}>
                    <img className='product-img' src={project.first_photo.medium_url} />
                    <h1>{project.name}</h1>
                  </Link>
                </div>
              </div>
            )
          }
        })}
      </div>
      <Outlet />
    </div>
  )
}

export default Home

