import React, { PropTypes } from 'react'
import BraintreeDropIn from '@shared/integrations/braintree/BraintreeDropIn';

class ChooseSubscription extends React.Component {
    static propTypes = {
        onClickBack: PropTypes.func
    };
    constructor(props) {
        super(props);
        //console.log(props)
    }
    render () {
        var plan = this.props.plan;
        var totalListPrice = plan.price;
        var totalPrice = this.props.appSettings.priceBase * plan.numWorkouts
        var percentDiscount = 100 - Math.ceil(((plan.price / totalPrice)* 100))
        var finalPrice = plan.pricePerWorkout * plan.numWorkouts;

        return (
            <div className="container">

                <div className="row">

                    <div className="col-xs-12 col-sm-6 col-sm-offset-3 subscribe-section">

                        <h2 className="text-center marginBottom50">{this.props.plan.name}</h2>

                        <div className="col-xs-12 kill-left-padding kill-right-padding marginBottom20">

                            <div className="subscribe-package text-center">

                                <p className="col-xs-6"><small>Workouts</small><strong>{this.props.plan.numWorkouts}</strong>/month</p>
                                <p className="col-xs-6"><small>{percentDiscount}% off</small><strong>${this.props.plan.pricePerWorkout}</strong>/workout</p>

                            </div>

                        </div>

                        <div className="subscribe-row">

                            <p>Number of Workouts <span>{this.props.plan.numWorkouts}</span></p>

                        </div>

                        <div className="subscribe-row">

                            <p>Subscription Discount <span>{percentDiscount}%</span></p>

                        </div>

                        <div className="subscribe-row">

                            <p><strong>Price of {this.props.plan.numWorkouts} Workouts <span>${finalPrice}</span></strong></p>

                        </div>
                        <div className="container">
                            <div className="row subscribe-row">
                                <div className="col-xs-12 col-sm-6 kill-left-padding ">
                                    {/*<h2 className="text-center marginBottom20">Credit Card</h2>*/}
                                    <BraintreeDropIn clientToken={this.props.appSettings.braintreeClientToken} ref="braintree" />
                                </div>
                            </div>

                        </div>
                        <p className="disclaimer text-center">* Legal disclaimer: You will be billed right away. Subscriptions can be cancelled at any time.</p>

                        <button type="button" className="btn btn-info btn-lg btn-block marginBottom20" onClick={this.props.onClickPurchase}>Confirm Purchase of ${finalPrice} / Month</button>
                        <button type="button" className="btn btn-default btn-lg btn-block" onClick={this.props.onClickBack}>Back</button>
                    </div>

                </div>

            </div>
        )
    }
}

export default ChooseSubscription;
