import React from 'react'
import ChatContainer from '@Chat/containers/ChatContainer'
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const ChatScene = (props) => {
  return (
    <SecurePageContainer location={props.location}>
      <PageHeaderContainer title='Messages' />
      <PageContent>
        <ChatContainer />
      </PageContent>
    </SecurePageContainer>
  )
}

export default ChatScene
