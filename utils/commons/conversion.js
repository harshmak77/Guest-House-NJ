
/**
 * mapping for TR status
 */
module.exports.status = {
    D: "Modifiable",
    L: "Modifiable, Protected",
    O: "Release Started",
    R: "Released",
    N: "Released (Repaired Objects)"
}
/**
 * mapping for TR type
 */
module.exports.type = {
    K: "Workbench Request",
    W: "Customizing Request",
    C: "Relocation of Objects Without Package Change",
    O: "Relocation of Objects with Package Change",
    E: "Relocation of Complete Package",
    T: "Transport of Copies",
    S: "Development/Correction",
    R: "Repair",
    X: "Unclassified Task",
    Q: "Customizing Task",
    G: "Piece List for CTS Project",
    M: "Client Transport Request",
    P: "Piece List for Upgrade",
    D: "Piece List for Support Package",
    F: "Piece List",
    L: "Deletion transport"
}

/**
 * just for mapping reference for response of get call of TR not used in any logic
 */
module.exports.field = {
    transportRequest: "TRKORR",
    type: "TRFUNCTION",
    status: "TRSTATUS",
    reqOwner: "AS4USER",
    createdOnDate: "AS4DATE",
    createdOnTime: "AS4TIME",
    taskId: "TRKORR",
    tasktype: "TRFUNCTION",
    taskOwner: "AS4USER",
    taskStatus: "TRSTATUS"
}


let dummy = [{
    transportRequest: "",
    crTicketNumber: "",
    description: "",
    type: "",
    status: "",
    pipeline: "",
    system: "",
    client: "",
    releaseNo: "",
    azureRelUrl: "",
    reqOwner: "",
    reqOwnerName: "",
    reqOwnerEmailID: "",
    reqOwnerDomainId: "",
    createdOn: "",
    releasedOn: "",
    taskDetails: [
        {
            taskId: "",
            tasktype: "",
            taskOwner: "",
            taskOwnerName: "",
            taskOwnerdomainID: "",
            taskStatus: "",
            createdOn: "",
            CreatedBy: "",
            releasedOn: "",
            releasedBy: ""
        }
    ]
}]