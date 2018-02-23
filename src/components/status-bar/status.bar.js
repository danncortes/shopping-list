import React, { Component } from 'react';
import { connect } from 'react-redux';

class StatusBar extends Component {
    render() {
        if (this.props.statusBar.active) {
            return (
                <p>
                    {JSON.stringify(this.props.statusBar.message)}
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
        statusBar: state.statusBar,
    };
}
export default connect(mapStateToProps)(StatusBar);
