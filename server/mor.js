function Mor(mor){
    mor = mor == undefined ? {} : mor;
    return {
        "id": mor.GetOptProperty('id'),
        "name": mor.GetOptProperty('name'),
        "regions": [
            {
                "id": 1,
                "title": "test",
                "href": "/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mor&region_id=1"
            }
        ]
    }
}
