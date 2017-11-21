import React from 'react';
import LogoutContainer from '@LoginRegistration/containers/LogoutContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';

const LogoutScene = () => {
  return (
    <Page className="login-page">
      <PageUnauthorizedHeader />
      <PageContent>
        <LogoutContainer />
      </PageContent>
    </Page>
  );
};

export default LogoutScene;
