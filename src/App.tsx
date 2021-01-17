import React from 'react';
import { Aside } from './components/aside';
import { Header } from './components/hedaer';
import { Layout } from './components/layout';
import { Main } from './components/main';
import { ProvideFilesTree } from './components/files-tree/use-files-tree';

function App() {
  return (
    <ProvideFilesTree>
      <Layout>
        {{
          header: <Header />,
          aside: <Aside />,
          main: <Main />,
        }}
      </Layout>
      <div id="portals" />
    </ProvideFilesTree>
  );
}

export default App;
