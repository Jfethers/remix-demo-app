import { useLoaderData, json, Link, Outlet } from 'remix';
import styles from '~/routes/projects/styles.css';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import defaultImg from '../../assets/defaultImg.jpg';
import errorImg from '../../assets/error.jpg';

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

function Projects() {

  const { projects } = useLoaderData();

  return (
    <div className='projectsRoute'>
      <ImageList sx={{ width: 1000, height: 1000 }} cols={3} rowHeight={300}>
        {projects?.map((project) => {
          return (
            <Link to={`/project/${project.id}`}>
              <ImageListItem key={project.id}>
                { project.first_photo ? (
                  <img
                    src={`${project?.first_photo.medium_url}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${project?.first_photo.medium_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={project?.name}
                    loading="lazy"
                  />
                ) : (
                  <img src={`${defaultImg}?w=164&h=164&fit=crop&auto=format`} srcSet={`${defaultImg}?w=164&h=164&fit=crop&auto=format`} height='400' width='400' />
                )}
                <ImageListItemBar
                title={project.name}
                />
              </ImageListItem>
            </Link>
        )}
        )}
      </ImageList>
      <Outlet />
    </div>
  )
}

export function ErrorBoundary({ error }) {

  return (
    <div className='error-wrapper'>
      <h1>Uh Oh - Looks like we dropped a stitch</h1>
      <p className='error-message'>Error: {error.message}</p>
      <img className='error-img' src={errorImg} height='400' width='400' />
      <Link to={'/projects'}>Go Back to Projects</Link>
    </div>
  )
}

export default Projects

