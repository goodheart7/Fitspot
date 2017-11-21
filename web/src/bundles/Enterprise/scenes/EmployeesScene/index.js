import React from 'react'
import EmployeesContainer from '@Enterprise/containers/EmployeesContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const EmployeesScene = (props) => {
    return (
        <SecurePageContainer location={props.location}>
            <PageHeaderContainer />
            <PageContent>
                <EmployeesContainer />
            </PageContent>
        </SecurePageContainer>
    )
};

export default EmployeesScene
