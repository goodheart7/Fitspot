import React from 'react'
import EmployeesInviteContainer from '@Enterprise/containers/EmployeesInviteContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const EmployeesInviteScene = (props) => {
    return (
        <SecurePageContainer location={props.location}>
            {localStorage.getItem('isOnboard') ? <PageHeaderContainer /> : <PageUnauthorizedHeader />}
            <PageContent>
                <EmployeesInviteContainer />
            </PageContent>
        </SecurePageContainer>
    )
};

export default EmployeesInviteScene
