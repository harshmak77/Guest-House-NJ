const CONSTANT_CR_TYPE = {
    ALL: 'all',
    BUCKET: 'bucket'
}

const CONSTANT_AZURE_TYPE = {
    BUG: 'Bug',
    FEATURE: 'Feature',
    EPIC: 'Epic',
    TASK: 'Task'
}

const ITEM_TYPE = {
    CHANGE: "Change",
    INCIDENT: "Incident",
    TASK: "Task"
}

const COLOR_CODE = {
    RED: "#FF0000",
    GREEN: "#12BB77",
    WHITE: "#ffffff",
    GREY: "#808080",
    YELLOW: "#FFFF00",
    PALEYELLOW: "#FFB300",
    CYAN: "#00B9FF",
    BLUE: "#5F1EC9"
}

const CHECK_LIST_CODE = {
    CONSTANT_ZCD_CHECK_CODE: "ZCDCheck"

}

const CHECK_LIST_TEXT = {
    CONSTANT_ZCD_CHECK_TEXT: "ZCD-Check document"

}

const ENVIRONMENT_LIST = {
    CONSTANT_DEV: "DEV",
    CONSTANT_QAS: "QAS",
    CONSTANT_RC8: "RC8",
    CONSTANT_PROD: "PD"

}
module.exports.ITEM_TYPE = ITEM_TYPE;
module.exports.CONSTANT_CR_TYPE = CONSTANT_CR_TYPE;
module.exports.CONSTANT_AZURE_TYPE = CONSTANT_AZURE_TYPE;
module.exports.COLOR_CODE = COLOR_CODE;
module.exports.CHECK_LIST_CODE = CHECK_LIST_CODE;
module.exports.CHECK_LIST_TEXT = CHECK_LIST_TEXT;
module.exports.ENVIRONMENT_LIST = ENVIRONMENT_LIST;