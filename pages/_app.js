import "../styles/globals.css"
import { UserProvider } from "../context/user_context"

function MyApp({ Component, pageProps }) {
  return( 
    <UserProvider>
        <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
