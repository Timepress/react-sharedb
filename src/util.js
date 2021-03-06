import model from '@react-sharedb/model'
import { observable, isObservable } from '@nx-js/observer-util'
import _ from 'lodash'

export function observablePath (path) {
  let segments = model._splitPath(path)
  let originalSegments = model._dereference(segments, true)
  let parentSegments = originalSegments.slice(0, -1)
  let leafSegment = originalSegments[originalSegments.length - 1]
  let result = _.get(model.data, originalSegments)
  if (typeof result === 'object' && result !== null && !isObservable(result)) {
    _.get(model.data, parentSegments)[leafSegment] = observable(result)
  }
}
