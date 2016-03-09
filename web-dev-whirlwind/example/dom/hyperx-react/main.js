var React = require('react')
var render = require('react-dom').render
var hyperx = require('hyperx')
var hx = hyperx(React.createElement)

var App = React.createClass({
  getInitialState: function () { return { times: 0 } },
  render: function () {
    return hx`<div>
      <h1>clicked ${this.state.times} times</h1>
      <div>
        <button onClick=${this.handleClick}>click me!</button>
      </div>
    </div>`
  },
  handleClick: function () {
    this.setState({ times: this.state.times + 1 })
  }
})
render(React.createElement(App), document.querySelector('#content'))
