import React, {Component, PropTypes} from 'react';
import Activities from '@Challenges/components/RulesComponents/Activities';
import GeneralInformation from '@Challenges/components/RulesComponents/GeneralInformation';

const Rules = (props) => {
    return (
        <div>
            <div className="marginBottom50" style={{paddingTop: 35}}>
                <Activities {...props} />
            </div>
            <GeneralInformation {...props} />
        </div>
    )
};

export default Rules;