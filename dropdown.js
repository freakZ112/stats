unction createDropdown() {

    var dropdown = {
        "dispatchCenter": `<option selected>alle Leitstellen</option>`,
        "vehicleTypes": `<option selected>alle Fahrzeugtypen</option>`,
        "database": { "class": [], "types": [], "dispatchCenter": [] }
    };
    var i, e;
    for (i in aBuildings) {
        e = aBuildings[i]
        fum_database.buildings.get.typeId[e.id] = e.building_type;
        fum_database.buildings.get.name[e.id] = e.caption;
        fum_database.buildings.get.onDispatchCenter[e.id] = e.leitstelle_building_id;
        if (e.building_type == 7) {
            dropdown.database.dispatchCenter.push({ "id": e.id, "name": e.caption });
        }
    }
    for (i in aVehicleTypesNew) {
        e = aVehicleTypesNew[i]
        dropdown.database.types.push({ "typeId": e.id, "name": e.name });
    };
    for (i in aVehicles) {
        e = aVehicles[i]
        if (e.vehicle_type_caption && !dropdown.database.class.includes(e.vehicle_type_caption)) {
            dropdown.database.class.push(e.vehicle_type_caption);
        }
    };
    if (dropdown.database.dispatchCenter.length > 0) {
        if (dropdown.database.dispatchCenter.length >= 2) {
            dropdown.database.dispatchCenter.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);
        }
        for (i in dropdown.database.dispatchCenter) {
            dropdown.dispatchCenter += `<option value="${ dropdown.database.dispatchCenter[i].id }">${ dropdown.database.dispatchCenter[i].name }</option>`;
        }
    }
    dropdown.database.types.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);
    for (i in dropdown.database.types) {
        dropdown.vehicleTypes += `<option value="${ dropdown.database.types[i].typeId }">${ dropdown.database.types[i].name }</option>`;
    }
    if (dropdown.database.class.length > 0) {
        if (dropdown.database.class.length >= 2) dropdown.database.class.sort((a, b) => a.toUpperCase() > b.toUpperCase() ? 1 : -1);
        for (i in dropdown.database.class) {
            dropdown.vehicleTypes += `<option value="-1" data-vehicle="${ dropdown.database.class[i] }">${ dropdown.database.class[i] }</option>`;
        }
    }
    $('#filterDispatchCenter').html(dropdown.dispatchCenter);
    $('#filterType').html(dropdown.vehicleTypes);
    fum_options.dropdown.vehicles.type = parseInt($('#filterType').val());
    fum_options.dropdown.vehicles.ownClass = $('#filterType').find(':selected').data('vehicle');
    fum_options.dropdown.dispatchCenter.id = parseInt($('#filterDispatchCenter').val());
}
