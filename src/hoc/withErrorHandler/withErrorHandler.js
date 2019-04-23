import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import RAux from '../ReactAux/RAux'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            console.log('Will Unmount', this.reqInterceceptor, this.resInterceceptor);
            axios.interceptors.request.eject(this.reqInterceceptor);
            axios.interceptors.response.eject(this.resInterceceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <RAux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </RAux>
            )
        }
    }
}

export default withErrorHandler;