import { response } from 'express';
import { useEffect } from 'react';
import { useLoaderData, json, Link, Outlet } from 'remix';
import styles from '../styles/home';
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
    <div className='homeRoute'>
      <h1>{ user.username }'s Rav</h1>
      <div className='avatar-wrapper'>
        <img src={user.large_photo_url} height={300} width={300}/>
      </div>
      <p>It's also a quick walk around Remix - check out some routing, admire some error boundary'ing. </p>
      <p>This is a home page - the ol' '/'. Every Remix app has to have one and it can't have any child routes.</p>
      <p>When asked, Remix says if you need to put a child route here, you don't really need to put a child route here.</p>
    </div>
  )
}

export default Home

