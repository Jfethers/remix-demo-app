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
    href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Display&display=swap'
  },
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

// you could use this as a universal nav bar
// function Layout({ children }) {
//   return (
//     <>
//       <nav className='navbar'>
//         <Link to='/' className='logo'>Ravelry</Link>
//       </nav>
//       { children }
//     </>
//   )
// }