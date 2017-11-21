import React from 'react'
import ChallengesCreateContainer from '@Challenges/containers/ChallengesCreateContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const ChallengesCreateScene = (props) => {
    return (
        <SecurePageContainer location={props.location}>
            <PageHeaderContainer />
            <PageContent>
                <ChallengesCreateContainer />
            </PageContent>
        </SecurePageContainer>
    )
};

export default ChallengesCreateScene
