import { response } from 'express';
import { useEffect } from 'react';
import { useLoaderData, json, Link, Outlet } from 'remix';
import styles from '~/routes/projects/styles.css';
import { ImageList, ImageListItem, ImageListItemBar, IconButton } from '@mui/material';

export const loader = async () => {

  const headers = new Headers();
  const user = process.env.USERNAME;
  const password = process.env.PASSKEY;
  headers.append('Authorization', 'Basic ' + btoa(`${user}:${password}`));

  const res = await fetch('https://api.ravelry.com/current_user.json', { method: 'GET', headers: headers });
  return json(await res.json());
}

export const links = () => [
  {
    rel: 'stylesheet',
    href: styles
  },
]

function Home() {
  const { user } = useLoaderData();
  console.log('user', user);

  return (
    <div className='projectsRoute'>
      <h1>{ user.username }'s Rav</h1>
      <div className='avatar-wrapper'>
        <img src={user.large_photo_url} height={300} width={300}/>
      </div>
    </div>
  )
}

export default Home

