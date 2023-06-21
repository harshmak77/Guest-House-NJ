SELECT_QUERY = {
    FIND_USER_PREF_SERVER_GRP : `SELECT field_id FROM RCMFOSA.tbl_itsm_preference_headers where domain_id=? and screen_id = ?`
}

module.exports.SELECT_QUERY = SELECT_QUERY;