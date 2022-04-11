import { response } from 'express';
import { useEffect } from 'react';
import { useLoaderData, json, Link } from 'remix';
import styles from '~/routes/projects/styles.css';

export const links = () => [
  {
    rel: 'stylesheet',
    href: styles
  },
]

export async function loader() {

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

          if (index % 2 === 1) {
            return (
              <div key={project.id} className='column column-a'>
                <Link to={`/project/${project.id}`}>
                  <h1>{project.pattern_name}</h1>
                  <img src={project.first_photo.thumbnail_url} />
                </Link>
              </div>
            )
          } else {
            return (
              <></>
            )
          }
        })}
        {projects?.map((project, index) => {
          console.log('index', index % 2);
          if (index % 2 === 1) {
            <div key={project.id} className='column column-b'>
              <Link to={`/project/${project.id}`}>
                <h1>{project.pattern_name}</h1>
                <img src={project.first_photo.thumbnail_url} />
              </Link>
            </div>
          }
          else {
            return (
            <></>
            );
          }


        })}
      </div>
    </div>
  )
}

export default Home

