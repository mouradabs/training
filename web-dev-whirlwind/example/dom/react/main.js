var React = require('react')
var render = require('react-dom').render
var h = React.createElement

var App = React.createClass({
  getInitialState: function () { return { times: 0 } },
  render: function () {
    return h('div', null, [
      h('h1', null, 'clicked ' + this.state.times + ' times'),
      h('div', null, [
        h('button', { onClick: this.handleClick }, 'click me!')
      ])
    ])
  },
  handleClick: function () {
    this.setState({ times: this.state.times + 1 })
  }
})
render(h(App), document.querySelector('#content'))
