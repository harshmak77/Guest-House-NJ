const config = require('./configFromFile')
let mergedConfig = {}
var _value = ''
Object.keys(config).forEach((key) => {
    _value = process.env[key] || config[key] || null
    // check if it is a query string
    if (/\?/m.test(_value)) {
        // _value = _value
        // eslint-disable-next-line no-useless-escape
    } else if (/\&/m.test(_value)) {
        // eslint-disable-next-line no-useless-escape
        if (/\=/m.test(_value)) {
            // split and pust to object props
            if (_value !== null && _value !== '') {
                let _tmpObj = _value.split('&')
                _value = {}
                _tmpObj.forEach((ele) => {
                    let _tmpActualObj = ele.split('=')
                    _value[_tmpActualObj[0]] = _tmpActualObj[1]
                })
            }
        } else {
            //  check if it is an array
            let _tmpValues = _value.split('&')
            _value = _tmpValues
        }
    }
    // check if boolean
    _value = (_value !== null && _value.toString().toLowerCase() === 'true') ? true : _value
    _value = (_value !== null && _value.toString().toLowerCase() === 'false') ? false : _value
    // check if number
    _value = (/^-{0,1}\d+$/.test(_value)) ? Number(_value) : _value
    mergedConfig[key] = _value
})
// console.log(mergedConfig)
module.exports = mergedConfig
