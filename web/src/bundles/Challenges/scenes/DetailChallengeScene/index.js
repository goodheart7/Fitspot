import React from 'react'
import DetailChallengeContainer from '@Challenges/containers/DetailChallengeContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const DetailChallengeScene = (props) => {
    return (
        <SecurePageContainer location={props.location}>
            <PageHeaderContainer />
            <PageContent>
                <DetailChallengeContainer params={props.params} />
            </PageContent>
        </SecurePageContainer>
    )
};

export default DetailChallengeScene
