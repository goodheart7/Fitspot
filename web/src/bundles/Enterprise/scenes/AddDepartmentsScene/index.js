import React from 'react'
import AddDepartmentsContainer from '@Enterprise/containers/AddDepartmentsContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const AddDepartmentsScene = (props) => {
    return (
        <SecurePageContainer location={props.location}>
            {localStorage.getItem('isOnboard') ? <PageHeaderContainer /> : <PageUnauthorizedHeader />}
            <PageContent>
                <AddDepartmentsContainer />
            </PageContent>
        </SecurePageContainer>
    )
};

export default AddDepartmentsScene
