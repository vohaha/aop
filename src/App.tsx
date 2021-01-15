import React from 'react';
import { Aside } from './components/aside';
import { Header } from './components/hedaer';
import { Layout } from './components/layout';
import { Main } from './components/main';

function App() {
  return (
    <>
      <Layout>
        {{
          header: <Header />,
          aside: <Aside />,
          main: <Main />,
        }}
      </Layout>
      <div id="portals" />
    </>
  );
}

export default App;
