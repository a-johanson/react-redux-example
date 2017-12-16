import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import PropTypes from 'prop-types'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

// Actions
const INCREMENT = 'INCREMENT'

// Action creators
const increment = (amount) => (
  {
    type: INCREMENT,
    amount: amount
  }
)

// Reducer
const reducer = (state = { impressions: 0 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return {impressions: state.impressions + action.amount}
    default:
      return state
  }
}

// React components
const ImpressionResults = ({ impressions, onResultClick }) => (
  <div>
    <h1>Active Reach</h1>
    <p onClick={() => onResultClick()}>Impressions: {impressions}</p>
  </div>
)

ImpressionResults.propTypes = {
  impressions: PropTypes.number.isRequired
}

// Creating the connected components, which map the state of the Redux store to properties of the React compnents
const mapStateToProps = (state) => (
  {
    impressions: state.impressions
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    onResultClick: () => { dispatch(increment(10)) }
  }
)

const ConnectedImpressionResults = connect(mapStateToProps, mapDispatchToProps)(ImpressionResults)


// Redux store
const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Render initial state
ReactDOM.render(<Provider store={store}>
    <ConnectedImpressionResults />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();


// Manually dispatch actions
window.setInterval(() => {
    console.log("tick");
    store.dispatch(increment(3));
  }, 1000);
