import { Outlet, LiveReload, Link, Links, Meta } from 'remix';
import globalStylesUrl from '~/styles/global.css'
import 'dotenv/config';


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
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
  }
]

export default function App() {
  return (
    <Document>
      {/* <Layout> */} {/* which is then wrapped around your given route */}
        <Outlet/> {/* where the route you're on is injected */}
      {/* </Layout> */}
    </Document>
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
        <Link to='/projects' className='projects'>Projects</Link>
      </nav>
      { children }
    </>
  )
}

export function ErrorBoundary({ error }) {
  console.log('error', error);
  return (
    <Document>
      <h1>error</h1>
      <pre>{error.message}</pre>
    </Document>
  )
}