import React from 'react'
import ChallengeEditContainer from '@Challenges/containers/ChallengeEditContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const ChallengeEditScene = (props) => {
    return (
        <SecurePageContainer location={props.location}>
            <PageHeaderContainer />
            <PageContent>
                <ChallengeEditContainer params={props.params}/>
            </PageContent>
        </SecurePageContainer>
    )
};

export default ChallengeEditScene
