import { response } from 'express';
import { useEffect } from 'react';
import { useLoaderData, json, Link } from 'remix';

// todo: put secrets somewhere idk lol

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
    <>
      <h1>Projects</h1>
      { projects?.map((project, index) => {
        console.log('project', project);
        return (

          <div key={index}>
            <Link to={`/project/${project.id}`}>
              <h1>{project.pattern_name}</h1>
              <img src={project.first_photo.thumbnail_url} />
            </Link>
        </div>
          )
      })}
    </>
  )
}

export default Home

