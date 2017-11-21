import React from 'react'
import ChallengesContainer from '@Challenges/containers/ChallengesContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const ChallengesScene = (props) => {
    return (
        <SecurePageContainer location={props.location}>
            <PageHeaderContainer />
            <PageContent>
                <ChallengesContainer />
            </PageContent>
        </SecurePageContainer>
    )
};

export default ChallengesScene
