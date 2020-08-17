module.exports = function (components, _ = {}, api = {}) {
  return components.reduce((obj, component) => {
    const mixin = component(obj._, obj.api)
    return {
      _: Object.assign(_, mixin.self),
      api: Object.assign(api, mixin.api)
    }
  }, { _, api })
}
