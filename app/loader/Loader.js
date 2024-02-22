'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Loader = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
};
export default Loader;