import React, { Component } from 'react';
import styles from './App.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getMessage
} from '../../redux/modules/app';
import {
  Message
} from '../../components';
import {
  IntlProvider,
  addLocaleData
} from 'react-intl';
import en from 'react-intl/locale-data/en';

addLocaleData(en);

class App extends Component {
  componentDidMount() {
    this.props.getMessage();
  }

  render() {
    const messages = require(`../../../langpack/locales/${this.props.app.locale}.json`);
    return (
      <IntlProvider locale={this.props.app.locale} messages={messages}>
        <div className={styles.app}>
          <Message text={this.props.app.message} />
        </div>
      </IntlProvider>
    );
  }
}
App.propTypes = {
  app: React.PropTypes.object,
  getMessage: React.PropTypes.func.isRequired
};

export default connect(
  state => ({ app: state.app }),
  dispatch => bindActionCreators({ getMessage }, dispatch)
)(App);
