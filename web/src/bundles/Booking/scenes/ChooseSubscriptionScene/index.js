import React from 'react';
import ChooseSubscriptionContainer from '@Booking/containers/ChooseSubscriptionContainer';
import { Page, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const ChooseSubscriptionScene = (props) => {
    return (
        <SecurePageContainer location={props.location}>
            <PageHeaderContainer />
            <PageContent>
                <ChooseSubscriptionContainer location={props.location} />
            </PageContent>
        </SecurePageContainer>
    );
};

export default ChooseSubscriptionScene;
