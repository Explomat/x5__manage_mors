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
	//var localPath = String(AbsoluteUrl('manage_mors.js'));
	//alert(localPath);
	//alert(ParentDirectory(localPath));

	// DropFormsCache('x-local://wt/web/common/json.js');
	// var json = OpenCodeLib('x-local://wt/web/common/json.js');

	var LIMIT = 25;
	var OFFSET = 1;
	var userID = curUserID;
	var users = [6148914691236517121];

	function __countPages(total, limit){
		var t = total / Real(limit);
		var t1 = Math.round(total / limit);
		return t > t1 ? t1 + 1 : t1;
	}

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
		DropFormsCache('x-local://wt/web/x5__manage_mors/server/region.js');
		var _region = OpenCodeLib('x-local://wt/web/x5__manage_mors/server/region.js');

		var regionId = queryObjects.HasProperty('region_id') ? queryObjects.region_id : null;
		if (regionId != null){
			var region = ArrayOptFirstElem(
				XQuery("sql:
					select
						cast(\"sub_id\" as varchar2(32)) \"sub_id\",
						\"sub_name\",
						cast(\"mor_id\" as varchar2(32)) \"mor_id\",
						mc.\"fullname\" as \"mor_fullname\",
						cast(\"alternate_id\" as varchar2(32)) \"alternate_id\",
						ac.\"fullname\" as \"alternate_mor_fullname\",
						\"alternate_date\",
    					acc.\"fullname\" as \"alternate_creater_fullname\"
					from \"cc_mor_controls\"
					left join \"collaborators\" mc on mc.\"id\" = \"mor_id\"
					left join \"collaborators\" ac on ac.\"id\" = \"alternate_id\"
					left join \"collaborators\" acc on acc.\"id\" = \"alternate_creater_id\"
					where \"sub_id\" = " + regionId
				)
			);
			if (region != undefined) {
				return tools.object_to_text(_region.Region(region), 'json');
			}
			queryObjects.Request.SetRespStatus(404, 'Регион не найден');
		}

		var page = queryObjects.HasProperty('page') ? Int(queryObjects.page) : 0;
		var regions = XQuery("sql:
			with e(sub_id, sub_name, mor_id, mor_fullname, alternate_id, alternate_mor_fullname, alternate_date, rnb, total) as
			(
				select
					cast(\"sub_id\" as varchar2(32)) \"sub_id\",
					\"sub_name\",
					cast(\"mor_id\" as varchar2(32)) \"mor_id\",
					mc.\"fullname\" as \"mor_fullname\",
					cast(\"alternate_id\" as varchar2(32)) \"alternate_id\",
					ac.\"fullname\" as \"alternate_mor_fullname\",
					\"alternate_date\",
					row_number() over (order by \"sub_name\") rnb,
					count(*) over() total
				from \"cc_mor_controls\"
				left join \"collaborators\" mc on mc.\"id\" = \"mor_id\"
				left join \"collaborators\" ac on ac.\"id\" = \"alternate_id\"
			)
			select
				e.sub_id \"sub_id\",
				e.sub_name \"sub_name\",
				e.mor_id \"mor_id\",
				e.mor_fullname \"mor_fullname\",
				e.alternate_id \"alternate_id\",
				e.alternate_mor_fullname \"alternate_mor_fullname\",
				e.alternate_date \"alternate_date\",
				e.rnb,
				e.total \"total\"
			from e
			--where (e.mor_id = ' + userID + ' or e.mor_id in (\'' + users.join('\',\'') + '\'))
			where e.rnb BETWEEN " + (page * LIMIT) + " AND " + ((page * LIMIT) + LIMIT)
		);

		var oregions = [];
		var total = 0;

		for (r in regions){
			total = r.total;
			oregions.push(_region.Region(r));
		}

		return tools.object_to_text({
			regions: oregions,
			paging: {
				limit: LIMIT,
				offset: OFFSET,
				total: total
			}
		}, 'json');
	}

	function put_Regions(queryObjects){
		var regionId = queryObjects.HasProperty('region_id') ? queryObjects.region_id : null;
		if ( regionId != null ) {
			var findRegion = ArrayOptFirstElem(
				XQuery("for $elem in cc_mor_controls where $elem/sub_id = " + regionId + " return $elem")
			);
			if ( findRegion != undefined ) {
				var data = tools.read_object(queryObjects.Body);
				var mor = data.GetOptProperty('mor');
				var subMor = data.GetOptProperty('subMor');

				try {
					var curDoc = OpenDoc(UrlFromDocID(Int(findRegion.id)));
					if (subMor != null && subMor.id != curDoc.TopElem.alternate_id) {
						curDoc.TopElem.alternate_creater_id = userID;
					}
					curDoc.TopElem.mor_id = mor != null ? mor.id : null;
					curDoc.TopElem.alternate_id = subMor != null ? subMor.id : null;
					curDoc.TopElem.alternate_date =
						(subMor != null && subMor.HasProperty('alternate_date')) ? Date(subMor.alternate_date) : null;
					curDoc.Save();
					return tools.object_to_text({
						status: 'ok'
					}, 'json')
				} catch (e) {
					queryObjects.Request.SetRespStatus( 404, 'Ошибка при сохранении изменений -' + e);
				}
			} else {
				queryObjects.Request.SetRespStatus( 404, 'Регион не найден');
			}
		}
	}

	function get_Collaborators(queryObjects){
		var search = queryObjects.HasProperty('search') ? queryObjects.search : '';
		var page = queryObjects.HasProperty('page') ? Int(queryObjects.page) : 0;

		alert('page: ' + page);
		var _mors = XQuery("sql:
			with e(id, fullname, position_name, rnb, total) as
			(
				SELECT
					cast(c.\"id\" as varchar2(32)) \"id\",
					\"fullname\",
					\"position_name\",
					row_number() over (order by \"fullname\") rnb,
					count(*) over() total
				FROM \"collaborators\" cc
				inner join \"collaborator\" c on c.\"id\" = cc.\"id\"
				where cc.\"is_dismiss\" = 0
				and cc.\"fullname\" LIKE \'%" + search + "%\'
			)
			select
				e.id \"id\",
				e.fullname \"fullname\",
				e.position_name \"position_name\",
				e.rnb,
				e.total \"total\"
			from e
			where e.rnb BETWEEN " + (page * LIMIT) + " AND " + ((page * LIMIT) + LIMIT)
		);

		var omors = [];
		var total = 0;
		for (r in _mors){
			total = r.total;
			omors.push({
				id: Trim(r.id),
				data: {
					fullname: Trim(r.fullname)
				}
			});
		}
		return tools.object_to_text({
			headerCols: [ { fullname: 'ФИО', type: 'string' } ],
			items: omors,
			page: page,
			pagesCount: __countPages(total, LIMIT)
		}, 'json');
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
