<%
    /*
        POST /mors — создать новый регион
        GET /mors — получить список регионов
        PUT /mors — редактирование всех регинов сразу
        DELETE /mors — удаление всех регионов

        POST /mors/12345 — вернуть ошибку (регион 12345 уже создан)
        GET /mors/12345 — показать информацию о регионе
        PUT /mors/12345 — редактировать регион 12345
        DELETE /mors/12345 — удалить регион 12345
    */

    var LIMIT = 25;
    var OFFSET = 0;

    function get_Regions(queryObjects){
        var regionId = queryObjects.HasProperty('region_id') ? queryObjects.region_id : null;
        if (regionId != null){
            return Region();
        }
        return {
            regions: [
                Region(),
                Region()
            ],
            href: "/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Regions",
            page: 1,
            count: 132
        };
    }

    function post_Mors(queryObjects){
        var data = tools.read_object(queryObjects.Body);
        if (data){
            createMor(data);
        }
    }

    function get_Mors(queryObjects){
        var morId = queryObjects.HasProperty('mor_id') ? queryObjects.mor_id : null;
        if (morId != null){
            return Mor();
        }
        return {
            mors: [
                Mor(),
                Mor()
            ],
            href: "/custom_web_template.html?object_id=6426564961292851360&server_id=6426559944368726663&action_name=Mors",
            page: 1,
            count: 132
        };
    }

    function put_Mors(queryObjects){
        var morId = queryObjects.HasProperty('mor_id') ? queryObjects.mor_id : null;
        var data = tools.read_object(queryObjects.Body);
        if (morId != null){
            changeMor(morId);
        } else if (data){
            changeMors(data)
        }
    }

    function delete_Mors(queryObjects){
        var morId = queryObjects.HasProperty('mor_id') ? queryObjects.mor_id : null;
        if (morId != null){
            deleteMor(morId);
        }
    }
%>
