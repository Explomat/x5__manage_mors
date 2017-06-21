<%
	/*
		POST /mors — создать нового мора
		GET /mors — получить список моров
		PUT /mors — редактирование всех моров сразу
		DELETE /mors — удаление всех моров

		POST /mors/12345 — вернуть ошибку (мор 12345 уже создан)
		GET /mors/12345 — показать информацию о море
		PUT /mors/12345 — редактировать мор 12345
		DELETE /mors/12345 — удалить мор 12345


		POST /regions — создать новый регион
		GET /regions — получить список регионов
		PUT /regions — редактирование всех регинов сразу
		DELETE /regions — удаление всех регионов

		POST /regions/12345 — вернуть ошибку (регион 12345 уже создан)
		GET /regions/12345 — показать информацию о регионе
		PUT /regions/12345 — редактировать регион 12345
		DELETE /regions/12345 — удалить регион 12345
	*/

	var LIMIT = 25;
	var OFFSET = 0;
	var userID = curUserID;
	var users = [6421219165670962494];

	function __assignDoc(te, obj){
		for (el in te){
			objVal = obj.GetOptProperty(el.Name);
			if (objVal != undefined){
				child = te.OptChild(el.Name);
				if (child != undefined) {
					child.Value = objVal;
				}
			}
		}
	}

	function get_Regions(queryObjects){
		var regionId = queryObjects.HasProperty('region_id') ? queryObjects.region_id : null;
		if (regionId != null){
			var region = ArrayOptFirstElem(
				XQuery("for $r in cc_mor_controls
					where $r/sub_id = " + regionId + "
					and ($r/mor_id = " + userID + " or MatchSome(" + userID + ",(" + users.join(',') + ")))")
			);
			if (region != undefined) {
				return tools.object_to_text(Region(region), 'json');
			}
			queryObjects.Request.SetRespStatus(404, 'Регион не найден');
		}

		var limit = queryObjects.HasProperty('limit') ? queryObjects.limit : LIMIT;
		var offset = queryObjects.HasProperty('offset') ? queryObjects.offset : OFFSET;

		// var regions = XQuery('sql:
		//     with e(mor_id, int_rownum) as
		//     (
		//         SELECT i."mor_id", ROWNUM int_rownum
		//         FROM "cc_mor_controls" i
		//         WHERE ROWNUM <= (0 + 1) * 3
		//     )
		//     select e.mor_id, e.int_rownum
		//     from e
		//     where e.int_rownum > 0 * 3
		// ');
		//var regions = XQuery("for $rs in cc_mor_controls where $rs/mor_id = " + userID + " or MatchSome(" + userID + ",(" + users.join(',') + "))");

		var regions = XQuery('sql:
			with e(sub_id, sub_name, mor_id, mor_fullname, alternate_id, alternate_mor_fullname, rnb, total) as
			(
				SELECT
					"sub_id",
					"sub_name",
					"mor_id",
					"mor_fullname",
					"alternate_id",
					"alternate_mor_fullname",
					row_number() over (order by "mor_id") rnb,
					count(*) over() total
				FROM "cc_mor_controls"
			)
			select e.sub_id, e.sub_name, e.mor_id, e.mor_fullname, e.alternate_id, e.alternate_mor_fullname, e.rnb, e.total
			from e
			where (e.mor_id = ' + userID + ' or e.mor_id in (\'' + users.join('\',\'') + '\'))
			and rnb BETWEEN ' + offset + ' AND ' + limit + ';
		');

		var oregions = [];
		var total = 0;
		for (r in regions){
			total = r.total;
			oregions.push(Region(r));
		}
		return tools.object_to_text({
			regions: oregions,
			paging: {
				limit: limit,
				offset: offset,
				total: total
			}
		}, 'json');
	}

	function put_Regions(queryObjects){
		var regionId = queryObjects.HasProperty('region_id') ? queryObjects.region_id : null;
		if (regionId != null){
			var data = tools.read_object(queryObjects.Body);
			return tools.object_to_text(Region(saveRegion(data)), 'json');
		}
	}

	/*function post_Mors(queryObjects){
		var data = tools.read_object(queryObjects.Body);
		if (data){
			return tools.object_to_text(Mor(createMor(data)));
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
	}*/
%>
