<%

function _isFieldsFilled(state){

    function _setGroups(){
        var groups = {};
        for (s in state){
            isGr = s.indexOf('__') != -1;
            if (isGr){
                gr = s.substr(0, s.indexOf('__'));
                if (groups.GetOptProperty(gr) == undefined){
                    groups.SetProperty(gr, {});
                }
                groups.GetProperty(gr).SetProperty(s, state[s]);
            } else {
                groups.SetProperty(s, state[s]);
            }
        }
        return groups;
    }

    var groups = _setGroups();

    var rtcYesConditionsText =
        groups.rtc.rtc__yes_conditions ?
        groups.rtc.rtc__yes_conditions_text :
        true;


    var isTextFieldsFilled =
        groups.fullname != '' &&
        groups.shop_name != '' &&
        groups.location != '' &&
        rtcYesConditionsText != '';

    var weFilledFields = [];
    for (g in groups.we){
        if (groups.we[g] == true){
            weFilledFields.push(groups.we[g]);
        }
    }

    var positionsFilledFields = [];
    for (g in groups.position){
        if (groups.position[g] == true){
            positionsFilledFields.push(groups.position[g]);
        }
    }

    var nlFilledFields = [];
    for (g in groups.nl){
        if (groups.nl[g] == true){
            nlFilledFields.push(groups.nl[g]);
        }
    }

    var isTtwGroupFilled = [];
    for (g in groups.ttw){
        if (groups.ttw[g] == true){
            isTtwGroupFilled.push(groups.ttw[g]);
        }
    }

    var rtcFilledFields = [];
    for (g in groups.rtc){
        if (groups.rtc[g] == true){
            rtcFilledFields.push(groups.rtc[g]);
        }
    }

    return (
        isTextFieldsFilled &&
        weFilledFields.length == 1 &&
        positionsFilledFields.length == 1 &&
        nlFilledFields.length == 3 &&
        isTtwGroupFilled.length == 1 &&
        rtcFilledFields.length == 1
    );
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

function post_Submit(queryObjects){
    try {
        var obj = tools.read_object(queryObjects.Body);
        if (_isFieldsFilled(obj) == false){
            throw 'Не заполнены обязательные поля.';
        }
        var curDoc = OpenNewDoc("x-local://udt/udt_cc_dismissal_form.xmd");
		curDoc.BindToDb();
        __assignDoc(curDoc.TopElem, obj);
        curDoc.Save();

        /*curDoc.TopElem.we__less_3_months = obj.work_experience__less_3_months;
        curDoc.TopElem.we__3_to_6_months = obj.work_experience__3_to_6_months;
        curDoc.TopElem.we__half_to_1_year = obj.work_experience__half_to_1_year;
        curDoc.TopElem.we__1_to_1_5_years = obj.work_experience__1_to_1_5_years;
        curDoc.TopElem.we__1_5_to_3_years = obj.work_experience__1_5_to_3_years;
        curDoc.TopElem.we__3_to_6_years = obj.work_experience__3_to_6_years;
        curDoc.TopElem.we__more_6_years = obj.work_experience__more_6_years;

        curDoc.TopElem.position__cashier_seller = obj.position__cashier_seller;
        curDoc.TopElem.position__cashier_cook = obj.position__cashier_cook;
        curDoc.TopElem.position__cashier_baker = obj.position__cashier_baker;
        curDoc.TopElem.position__cashier_other = obj.position__cashier_other;

        curDoc.TopElem.nl__team_attitude = obj.not_like__team_attitude;
        curDoc.TopElem.nl__payment = obj.not_like__payment;
        curDoc.TopElem.nl__disrespect = obj.not_like__disrespect;
        curDoc.TopElem.nl__living_conditions = obj.not_like__living_conditions;
        curDoc.TopElem.nl__equipment = obj.not_like__equipment;
        curDoc.TopElem.nl__organization = obj.not_like__organization;
        curDoc.TopElem.nl__long_to_go_work = obj.not_like__long_to_go_work;
        curDoc.TopElem.nl__location = obj.not_like__location;
        curDoc.TopElem.nl__schedule = obj.not_like__schedule;
        curDoc.TopElem.nl__load = obj.not_like__load;
        curDoc.TopElem.nl__reprocessing = obj.not_like__reprocessing;
        curDoc.TopElem.nl__reprocessing_not_paid = obj.not_like__reprocessing_not_paid;
        curDoc.TopElem.nl__heavy = obj.not_like__heavy;
        curDoc.TopElem.nl__low_salary = obj.not_like__low_salary;
        curDoc.TopElem.nl__conditions_salary = obj.not_like__conditions_salary;
        curDoc.TopElem.nl__buy_products = obj.not_like__buy_products;
        curDoc.TopElem.nl__not_in_time_payment = obj.not_like__not_in_time_payment;
        curDoc.TopElem.nl__social_package = obj.not_like__social_package;
        curDoc.TopElem.nl__monotony = obj.not_like__monotony;
        curDoc.TopElem.nl__not_independence = obj.not_like__not_independence;
        curDoc.TopElem.nl__not_career = obj.not_like__not_career;

        curDoc.TopElem.ttw__not_planned = obj.time_to_work__not_planned;
        curDoc.TopElem.ttw__more_than_month = obj.time_to_work__more_than_month;
        curDoc.TopElem.ttw__in_month = obj.time_to_work__in_month;

        curDoc.TopElem.leaving_company = obj.leaving_company;

        curDoc.TopElem.rtc__yes = obj.return_to_company__yes;
        curDoc.TopElem.rtc__yes_conditions = obj.return_to_company__yes_conditions;
        curDoc.TopElem.rtc__yes_conditions_text = obj.return_to_company__yes_conditions_text;
        curDoc.TopElem.rtc__no = obj.return_to_company__no;

        curDoc.TopElem.fullname = obj.fullname;

        curDoc.TopElem.shop_name = obj.shop_name;

        curDoc.TopElem.location = obj.location;
        curDoc.Save();*/
        return tools.object_to_text({
            status: 'ok'
        }, 'json');
    } catch(e){
        return tools.object_to_text({
            error: 'Произошла ошибка при сохранении документа! \r\n ' + e
        }, 'json');
    }
}
%>