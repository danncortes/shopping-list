import React, { Component } from 'react';
import { connect } from 'react-redux';

class StatusBar extends Component {
    render() {
        console.log(this.props);
        if (this.props.statusNotification.active) {
            return (
                <p>
                    {JSON.stringify(this.props.statusNotification.message)}
                </p>
            );
        }
        return (
            <p>Ready!</p>
        );
    }
}

function mapStateToProps(state) {
    return {
        statusNotification: state.statusNotification,
    };
}
export default connect(mapStateToProps)(StatusBar);
