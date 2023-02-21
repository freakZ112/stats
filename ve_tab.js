function createTable(statusIndex) {

    var tableDatabase = [];

    $.each(aVehicles, function(key, item) {
        var pushContent = {
            "status": item.fms_real,
            "id": item.id,
            "name": item.caption,
            "typeId": item.vehicle_type,
            "buildingId": item.building_id,
            "ownClass": item.vehicle_type_caption,
            "pers": item.assigned_personnel_count,
            "maxPers": item.max_personnel_override,
            "workStart": item.working_hour_start,
            "workEnd": item.working_hour_end,
            "delay": item.alarm_delay,
            "ignAao": item.ignore_aao,
            "target": item.target_id
        };
        if (isNaN(statusIndex)) {
            if (isNaN(fum_options.dropdown.vehicles.type)) tableDatabase.push(pushContent);
            else if (fum_options.dropdown.vehicles.type == -1 && fum_options.dropdown.vehicles.ownClass == item.vehicle_type_caption) tableDatabase.push(pushContent);
            else if (fum_options.dropdown.vehicles.type == item.vehicle_type && !item.vehicle_type_caption) tableDatabase.push(pushContent);
        } else if (statusIndex == item.fms_real) {
            if (isNaN(fum_options.dropdown.vehicles.type)) tableDatabase.push(pushContent);
            else if (fum_options.dropdown.vehicles.type == -1 && fum_options.dropdown.vehicles.ownClass == item.vehicle_type_caption) tableDatabase.push(pushContent);
            else if (fum_options.dropdown.vehicles.type == item.vehicle_type && !item.vehicle_type_caption) tableDatabase.push(pushContent);
        }
    });

    if (!isNaN(fum_options.dropdown.dispatchCenter.id)) {
        for (let i = tableDatabase.length - 1; i >= 0; i--) {
            if (fum_options.dropdown.dispatchCenter.id !== fum_database.buildings.get.onDispatchCenter[tableDatabase[i].buildingId]) tableDatabase.splice(i, 1);
        }
    }

    function filterDatabase(typeId1, typeId2) {
        for (let i = tableDatabase.length - 1; i >= 0; i--) {
            if (fum_database.buildings.get.typeId[tableDatabase[i].buildingId] == typeId1 || fum_database.buildings.get.typeId[tableDatabase[i].buildingId] == typeId2) tableDatabase.splice(i, 1);
        }
    }

    if (!fum_options.filter.fire.status) filterDatabase("0", "18");
    if (!fum_options.filter.rescue.status) filterDatabase("2", "20");
    if (!fum_options.filter.thw.status) filterDatabase("9", "9");
    if (!fum_options.filter.police.status) filterDatabase("6", "19");
    if (!fum_options.filter.wr.status) filterDatabase("15", "15");
    if (!fum_options.filter.helicopter.status) filterDatabase("5", "13");
    if (!fum_options.filter.bepo.status) filterDatabase("11", "17");
    if (!fum_options.filter.seg.status) filterDatabase("12", "21");

    switch ($('#sortBy').val()) {
        case "Status-aufsteigend":
            tableDatabase.sort((a, b) => a.status > b.status ? 1 : -1);
            break;
        case "Status-absteigend":
            tableDatabase.sort((a, b) => a.status > b.status ? -1 : 1);
            break;
        case "Name-aufsteigend":
            tableDatabase.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);
            break;
        case "Name-absteigend":
            tableDatabase.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1);
            break;
        case "Wache-aufsteigend":
            tableDatabase.sort((a, b) => fum_database.buildings.get.name[a.buildingId].toUpperCase() > fum_database.buildings.get.name[b.buildingId].toUpperCase() ? 1 : -1);
            break;
        case "Wache-absteigend":
            tableDatabase.sort((a, b) => fum_database.buildings.get.name[a.buildingId].toUpperCase() > fum_database.buildings.get.name[b.buildingId].toUpperCase() ? -1 : 1);
            break;
        case "Typ-aufsteigend":
            tableDatabase.sort((a, b) => (a.ownClass ? a.ownClass.toUpperCase() : aVehicleTypesNew[a.typeId].name.toUpperCase()) > (b.ownClass ? b.ownClass.toUpperCase() : aVehicleTypesNew[b.typeId].name.toUpperCase()) ? 1 : -1);
            break;
        case "Typ-absteigend":
            tableDatabase.sort((a, b) => (a.ownClass ? a.ownClass.toUpperCase() : aVehicleTypesNew[a.typeId].name.toUpperCase()) > (b.ownClass ? b.ownClass.toUpperCase() : aVehicleTypesNew[b.typeId].name.toUpperCase()) ? -1 : 1);
            break;
        case "AusrÃ¼ckverzÃ¶gerung-aufsteigend":
            tableDatabase.sort((a, b) => a.delay > b.delay ? 1 : -1);
            break;
        case "AusrÃ¼ckverzÃ¶gerung-absteigend":
            tableDatabase.sort((a, b) => a.delay > b.delay ? -1 : 1);
            break;
        case "Dienstbeginn-aufsteigend":
            tableDatabase.sort((a, b) => a.workStart > b.workStart ? 1 : -1);
            break;
        case "Dienstbeginn-absteigend":
            tableDatabase.sort((a, b) => a.workStart > b.workStart ? -1 : 1);
            break;
        case "Dienstende-aufsteigend":
            tableDatabase.sort((a, b) => a.workEnd > b.workEnd ? 1 : -1);
            break;
        case "Dienstende-absteigend":
            tableDatabase.sort((a, b) => a.workEnd > b.workEnd ? -1 : 1);
            break;
        case "max-Personal-aufsteigend":
            tableDatabase.sort((a, b) => a.maxPers ? a.maxPers : aVehicleTypesNew[a.typeId].personal.max > b.maxPers ? b.maxPers : aVehicleTypesNew[b.typeId].personal.max ? 1 : -1);
            break;
        case "max-Personal-absteigend":
            tableDatabase.sort((a, b) => a.maxPers ? a.maxPers : aVehicleTypesNew[a.typeId].personal.max > b.maxPers ? b.maxPers : aVehicleTypesNew[b.typeId].personal.max ? -1 : 1);
            break;
        case "zugew-Personal-aufsteigend":
            tableDatabase.sort((a, b) => a.pers > b.pers ? 1 : -1);
            break;
        case "zugew-Personal-absteigend":
            tableDatabase.sort((a, b) => a.pers > b.pers ? -1 : 1);
            break;
    }

    let intoLabel =
        `<div class="pull-left">${ isNaN(statusIndex) ? `keinen Statusfilter gesetzt` : `Status ${ statusIndex }` }</div>
             <div class="pull-right" style="margin-right:3em">${ tableDatabase.length.toLocaleString() } Fahrzeuge</div>`;
    let intoTable =
        `<table class="table">
             <thead>
             <tr>
             <th class="col-1">FMS</th>
             <th class="col">Kennung</th>
             <th class="col">Fahrzeugtyp</th>
             <th class="col-xs-3"></th>
             <th class="col">Wache</th>
             </tr>
             </thead>
             <tbody>`;

    for (let i = 0; i < tableDatabase.length; i++) {
        var e = tableDatabase[i];
        var vType = aVehicleTypesNew[e.typeId];
        var buildingHtml = `<a class="lightbox-open" href="/buildings/${ e.buildingId }">${ fum_database.buildings.get.name[e.buildingId] }</a>`;
        if (e.pers === null) e.pers = 0;
        if (e.status === 3 || e.status === 4 || e.status === 7) {
            var bolMission = e.status === 7 ? false : true;
            var linkName = bolMission === true ? $("#mission_caption_" + e.target).contents().not($("#mission_caption_" + e.target).children()).text().replace(",", "").trim().replace("[Verband]", "").replace("[Event]", "") : (aBuildings.find(b => b.id === e.target) ? aBuildings.find(b => b.id === e.target).caption : "VerbandsgebÃ¤ude");
            if (e.target !== null) {
                buildingHtml += `<br><span class="glyphicon glyphicon-log-in"></span>
                                     <a class="lightbox-open" href="/${ bolMission === true ? "missions" : "buildings" }/${ e.target }">${ linkName }</a>`;
            } else {
                buildingHtml += `<br><span class="glyphicon glyphicon-log-in"></span> Krankentransport`;
            }
        }
        intoTable +=
            `<tr>
                 <td class="col-1"><span style="cursor:${ e.status == 2 || e.status == 6 ? `pointer` : `not-allowed` }" class="building_list_fms building_list_fms_${ e.status }" id="tableFms_${ e.id }">${ e.status }</span>
                 <td class="col"><a class="lightbox-open" href="/vehicles/${ e.id }" style="display:block">${ e.name }</a>
                  <small style="display:${ fum_options.general.showWork ? "block" : "none" }">Dienstzeiten: ${ e.workStart }:00 bis ${ e.workEnd }:00 Uhr</small>
                  <small style="display:${ fum_options.general.showDelay ? "block" : "none" }">AusrÃ¼ckverzÃ¶gerung: ${ e.delay.toLocaleString() } Sek.</small>
                 </td>
                 <td class="col">${ !e.ownClass ? (vType.name + (vType.name !== vType.short_name ? "<br>(" + vType.short_name + ")" : "")) : e.ownClass }</td>
                 <td class="col-xs-3">
                  <div class="btn-group">
                   <a class="lightbox-open btn btn-default btn-xs" style="text-decoration:none" href="/vehicles/${ e.id }/edit"><div class="glyphicon glyphicon-pencil"></div></a>
                   <a class="lightbox-open btn btn-default btn-xs" style="text-decoration:none" href="/vehicles/${ e.id }/zuweisung">Personalzuweisung (${ e.pers }/${ e.maxPers ? e.maxPers : vType.personal.max })</a>
                  </div><br>
                  <a class="label label-${ e.ignAao ? "danger" : "success" }" style="cursor:default;color:black">AAO</a>
                  ${ vType.additional.water ? (`<a class="label label-info" style="cursor:default;color:black">Wasser: ${ vType.additional.water.toLocaleString() } Liter</a>`) : `` }
                  ${ vType.additional.water_bonus ? (`<a class="label label-info" style="cursor:default;color:black">Wasserbonus: ${ vType.additional.water_bonus } %</a>`) : `` }
                  ${ vType.additional.qualification ? (`<a class="label label-warning" style="cursor:default;color:black">${ vType.additional.qualification.join(", ") }</a>`) : `` }
                  ${ vType.additional.trailer ? (`<a class="label label-warning" style="cursor:default;color:black">benÃ¶tigt Zugfahrzeug</a>`) : `` }
                 </td>
                 <td class="col">
                   ${ buildingHtml }
                 </td>
                 </tr>`;
    }

    intoTable += `</tbody>
                      </table>`;

    $('#tableStatusLabel').html(intoLabel);
    $('#tableStatusBody').html(intoTable);
    tableDatabase.length = 0;
}
