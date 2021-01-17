import React from 'react';
import { Aside } from './components/aside';
import { Header } from './components/hedaer';
import { Layout } from './components/layout';
import { Main } from './components/main';
import { ProvideFilesTree } from './hooks/use-files-tree';
import { ProvideLayout } from './hooks/use-layout';

function App() {
  return (
    <ProvideFilesTree>
      <ProvideLayout>
        <Layout>
          {{
            header: <Header />,
            aside: <Aside />,
            main: <Main />,
          }}
        </Layout>
        <div id="portals" />
      </ProvideLayout>
    </ProvideFilesTree>
  );
}

export default App;
