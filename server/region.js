
function Region(region){
    region = region == undefined ? {} : region;

    var morId = region.GetOptProperty('mor_id');
    var mor = undefined;
    if (morId != undefined){
        mor = {
            id: morId,
            name: region.GetOptProperty('mor_fullname'),
            url: '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors&mor_id=' + morId
        }
    }

    var subMorId = region.GetOptProperty('alternate_id');
    var subMor = undefined;
    if (subMorId != undefined){
        subMor = {
            id: subMorId,
            name: region.GetOptProperty('alternate_mor_fullname'),
            url: '/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors&mor_id=' + subMorId
        }
    }

    return {
        id: region.GetOptProperty('sub_id'),
        title: region.GetOptProperty('sub_name'),
        mor: mor,
        subMor: subMor
    }
}
