import React, { Component, PropTypes } from 'react';
import GymInfoCard from './GymInfoCard';
import OutHereForm from './OutHereForm';

class AddressForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedOption: 'nearby',
        };
    }

    handleOptionChange(option, e) {
        e.preventDefault();
        this.setState({selectedOption : option});
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.desiredAddress){
            this.setState({
                selectedOption: 'outHere'
            })
        }
    }
    render() {
        return (
            <div>
                <div className="col-xs-12 col-sm-6 col-md-8 col-sm-offset-3 col-md-offset-2">
                    <label onClick={(e) => this.handleOptionChange('outHere', e)} htmlFor="prevLocation" className={"radio-inline trainerL " + (this.state.selectedOption === 'outHere' && 'active')}>
                        Work Out Here
                    </label>
                    <label onClick={(e) => this.handleOptionChange('nearby', e)} htmlFor="prevLocation" className={"radio-inline trainerL " + (this.state.selectedOption === 'nearby' && 'active')}>
                        Nearby Gyms
                    </label>
                </div>

                {this.renderStuff()}

            </div>
        );
    }

    renderStuff() {
        const { selectedOption } = this.state;

        switch(selectedOption){
            case "nearby":
                return (
                    <div className="col-xs-12">
                        <div className="gym-cards-container">
                            {this.renderNearbyGyms()}
                        </div>
                    </div>
                );
                break;
            case "outHere":
                return (
                    <div className="col-xs-12 col-sm-6 col-md-8 col-sm-offset-3 col-md-offset-2">
                        {this.renderAddressForm()}
                    </div>
                )
                break;
            default: return '';
        }
    }

    renderAddressForm() {
       return(
           <div>
               <OutHereForm onSubmitWithProps={this.props.onLocationSelected} addressType={this.props.addressType} addressValue={this.props.addressValue} locationData={this.props.locationData} desiredAddress={this.props.desiredAddress ? this.props.desiredAddress : ''}/>
           </div>
       );
    }

    renderNearbyGyms () {
        return this.props.gyms.map(loc => {
            return (
            <div className="gym-card" key={loc.id} onClick={this.props.onLocationSelected.bind(this,loc)}>
                <GymInfoCard key={loc.id} {...loc} />
            </div>
            );
        });
    }
}


AddressForm.propTypes = {
    gyms : PropTypes.array.isRequired,
    onLocationSelected: PropTypes.func.isRequired,
};

export default AddressForm;
