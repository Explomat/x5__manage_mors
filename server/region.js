
function _replaceQuotes(str){
    return StrReplace(StrReplace(str, '\\', '\\\\'), '\"', '\'');
}

function Region(region, curUserID, usersIdsForEdit){
    //region = region == undefined ? {} : region;
    var outObj = {};
    usersIdsForEdit = usersIdsForEdit == undefined ? [] : usersIdsForEdit;

    var morId = OptInt(region.OptChild('mor_id'));
    var mor = undefined;
    if (morId != undefined){
        outObj.mor = {
            id: morId,
            name: _replaceQuotes(String(region.OptChild('mor_fullname'))),
            url: '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors&mor_id=' + morId
        }
    }

    var subMorId = OptInt(region.OptChild('alternate_id'));
    var subMor = undefined;
    if (subMorId != undefined){
        var altDate = (region.OptChild('alternate_date') != undefined &&
            region.alternate_date != undefined &&
            region.alternate_date != null) ?
                StrXmlDate(region.alternate_date) : '';
        outObj.subMor = {
            id: subMorId,
            name: _replaceQuotes(String(region.OptChild('alternate_mor_fullname'))),
            alternate_date: altDate,
            alternate_creater_fullname: String(region.OptChild('alternate_creater_fullname')),
            url: '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors&mor_id=' + subMorId
        }
    }
    outObj.id = OptInt(region.OptChild('sub_id'));
    outObj.title = _replaceQuotes(String(region.OptChild('sub_name')));

    var isEdit = false;
    if (morId == curUserID) {
        isEdit = true;
    }
    for (u in usersIdsForEdit){
        if (curUserID == u){
            isEdit = true;
        }
    }

    outObj.isEdit = isEdit;
    return outObj;
}
