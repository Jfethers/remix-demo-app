import { Outlet, LiveReload, Link, Links, Meta } from 'remix';
import globalStylesUrl from '~/styles/global.css'
import 'dotenv/config';
import { Container, CssBaseline } from '@mui/material';


export const links = () => [
  {
  rel: 'stylesheet',
  href: globalStylesUrl
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com'
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
  },
]

export default function App() {
  return (
    <Container maxWidth='lg'>
      <Document>
        <Layout>
          <Outlet/>
        </Layout>
      </Document>
    </Container>
  )
}

function Document({ children, title }) {
  return (
    <html lang='eng'>
      <head>
        <Links />
        <title>{ title ? title : 'Ravelry'}</title>
      </head>
      <body>
        { children }
        {process.env.NODE_ENV === 'development' ?
        <LiveReload /> : null} {/** handles live reloading */}
      </body>
    </html>
  )
}

function Layout({ children }) {
  return (
    <>
      <nav className='navbar'>
        <Link className='link-button' to='/projects'>Projects</Link>
      </nav>
      { children }
    </>
  )
}

export function ErrorBoundary({ error }) {
  console.log('error', error);
  return (
    <Document>
      <h1>Error</h1>
      <pre>{error.message}</pre>
    </Document>
  )
}