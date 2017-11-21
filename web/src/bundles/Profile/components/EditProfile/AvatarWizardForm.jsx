import React from 'react';
import { connect } from 'react-redux';
import { updateUserAvatar } from '@store/modules/auth/actions';
import Cropper from 'react-cropper';
import events from '@utils/Events';

class AvatarWizardForm extends React.Component {
   constructor(props) {
       super(props);

       this.state = {
           src: '',
           cropResult: null,
           step: 0
       };
   }

    step = () => {
        window.scrollTo(0, 0);
        this.setState({step: this.state.step + 1, fileError: ''})
    };

    close = () => {
        window.scrollTo(0, 0);
        this.setState({step: 0, fileError: ''});
    };

    stepBack = () => {
        window.scrollTo(0, 0);
        this.setState({step: this.state.step - 1})
    };

    croppedIMG = null;

    onChange(e){
        let files;
        if(e.target.files[0].size / (1024 * 1024) > 3){
            this.setState({
                fileError: 'Maximum size 3mb'
            })
        }
        else if(/\.(jpe?g|png|bmp)$/.test(e.target.files[0].name)){
            this.setState({
                fileError: ''
            })
            if(e.dataTransfer){
                files = e.dataTransfer.files;
            }

            else if(e.target){
                files = e.target.files;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                let self = this;
                let img = new Image();
                img.src = e.target.result;

                img.onload = function () {

                    if(this.width){
                        const {step, error} = self.state;
                    }
                };
                this.setState({
                    src: reader.result
                })
            };

            reader.onloadend = (event) => {
                let self = this;
                if(event.target.error){
                    self.setState({
                        fileError: 'Wrong file',
                        step: 0
                    });
                }else{
                    const {step, error} = this.state;

                    this.step();
                }
            };
            reader.readAsDataURL(files[0]);


        } else{
            this.setState({
                fileError: 'Only .bmp, .jpg, .jpeg, .png extension allowed'
            })
        }

    };

    roundedCanvas = (sourceCanvas) => {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        let width = sourceCanvas.width;
        let height = sourceCanvas.height;

        canvas.width = width;
        canvas.height = height;
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI);
        context.strokeStyle = 'rgba(0,0,0,0)';
        context.stroke();
        context.clip();
        context.drawImage(sourceCanvas, 0, 0, width, height);

        return canvas;
    };

    cropImage() {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }

        let croppedCanvas = this.cropper.getCroppedCanvas();
        this.croppedIMG = croppedCanvas;
        let rounded = this.roundedCanvas(croppedCanvas);
        this.setState({
            cropResult: rounded.toDataURL(),
        });
        this.step();
    }

    changeProfileImage() {
        this.step();
    }

    uploadToServer() {
        let file = this.croppedIMG;
        let customer = this.props.user;
        file.toBlob((file) => {
            this.props.uploadAvatar(customer, file);
            events.track("Changed Profile Picture");
        });
        this.setState({
            step: 0
        })
    }

    render(){

        const wizard = () => {
            switch(this.state.step){
                case 1:
                    return(
                        <div className="text-center">
                            <h2 style={{margin: '15px 0', display: 'block'}}>Crop your image</h2>
                            <div style={{ width: '100%', marginTop: '20px' }}>
                                <Cropper
                                    style={{ height: '360px', width: '100%' }}
                                    aspectRatio={1}
                                    zoomable={false}
                                    responsive={true}
                                    background={true}
                                    preview=".img-preview"
                                    guides={false}
                                    src={this.state.src}
                                    ref={cropper => { this.cropper = cropper; }}
                                />
                            </div>
                            <div className="text-center marginBottom50">
                                <h2 style={{margin: '15px 0', display: 'block'}}>Preview</h2>
                                <div className="box " style={{ width: '100%' }}>
                                    <div className="img-preview text-center" />
                                </div>
                            </div>

                            <button className="btn btn-default btn-lg btn-block marginBottom20" onClick={::this.cropImage}>
                                Save and continue
                            </button>
                            <button className="btn btn-info btn-lg btn-block" onClick={::this.stepBack}>
                                Back
                            </button>
                        </div>
                    );
                case 2:
                    return(
                        <div className="box text-center " style={{ width: '100%' }}>
                            <h2 style={{margin: '15px 0', display: 'block'}}>Final result</h2>
                            <img className="user-avatar marginBottom50" src={this.state.cropResult} alt="cropped image" />

                            <button className="btn btn-default btn-lg btn-block marginBottom20" onClick={::this.uploadToServer}>
                                Change image
                            </button>
                            <button className="btn btn-info btn-lg btn-block" onClick={::this.stepBack}>
                                Back
                            </button>
                        </div>
                    )
            }
        };

        const { step } = this.state;
        const { user } = this.props;

        return(
            <div>
                {step ? '' :
                    <div className="text-center">
                        <img className="user-avatar img-circle" src={this.state.cropResult ? this.state.cropResult : user.avatar ? user.avatar.url : require('@assets/img/default_profile.png')} alt={user.firstname} />
                    </div>}
                {this.state.fileError ? <div style={{marginTop: 50}} className="alert-danger alert">{this.state.fileError}</div> : ''}
                <div className="marginBottom50">
                    {wizard()}
                </div>

                {!step &&
                <div className="text-center">
                    <div className="btn btn-default btn-lg btn-block marginBottom20" style={{position: 'relative'}}>
                        Change Profile Image
                        <input style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: '100%',
                            width: '100%',
                            opacity: 0,
                            cursor: 'pointer'
                        }} type="file" accept="image/jpg, image/bmp, image/jpeg, image/png" onChange={::this.onChange} />
                    </div>
                </div>
                }
            </div>
        )
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadAvatar : (customer, file) => {
            dispatch(updateUserAvatar(customer, file));
        }
    }
};

export default connect(null, mapDispatchToProps)(AvatarWizardForm);
