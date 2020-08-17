module.exports = function (_, api, ...components) {
  return components.reduce((obj, component) => {
    const mixin = component(obj._, obj.api)
    return {
      _: Object.assign(_, mixin.self),
      api: Object.assign(api, mixin.api)
    }
  }, { _, api })
}
