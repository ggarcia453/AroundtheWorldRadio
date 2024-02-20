import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import termsFrPath from './manual.md'


class Terms extends Component {
    constructor(props) {
      super(props)
  
      this.state = { terms: null }
    }
  
    componentWillMount() {
      fetch(termsFrPath).then((response) => response.text()).then((text) => {
        this.setState({ terms: text })
      })
    }
  
    render() {
      return (
        <div className="content"
        style={{
            justifyContent: "left",
            alignItems: "left",
            textAlign:"left"
        }}>
          <ReactMarkdown children={this.state.terms} />
        </div>
      )
    }
  }
  
  export default Terms;