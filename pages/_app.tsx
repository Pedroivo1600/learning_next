import { CartContextProvider } from '@/src/hooks/useCart'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <CartContextProvider>
        <Component {...pageProps} />
    </CartContextProvider>
  )
}


