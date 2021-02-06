import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import '../styles/global.scss';
import 'semantic-ui-css/semantic.min.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />

      <ToastContainer
        position="top-right"
        autoClose={8000}
        rtl={false}
        pauseOnFocusLoss={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
}
