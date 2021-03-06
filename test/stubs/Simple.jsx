import React from 'react'
import _ from 'lodash'
import { isObservable } from '@nx-js/observer-util'

export default () =>
  class Simple extends React.Component {
    constructor (props) {
      super(props)
      this.renderCount = 0
    }

    render () {
      // console.log('model', this.model.get())
      this.renderCount++
      let { items = [] } = this.props.scope
      // Handle situation when subscribing to one doc instead of query
      if (!_.isArray(items)) items = [items]
      let names = items.map(i => i.name).join(',')
      let colors = items
        .filter(i => i.showColor)
        .map(i => i.color)
        .join(',')
      if (typeof DEBUG !== 'undefined') {
        console.log(`RENDER ${this.renderCount}:`, names)
        console.log('  colors:', colors)
        console.log(
          '  props:',
          _.pickBy(this.props, (value, key) => key && /^[^$]/.test(key))
        )
      }
      return (
        <div>
          <div className={`Simple RENDER-${this.renderCount}`}>{names}</div>
          <div>{colors}</div>
        </div>
      )
    }
  }
