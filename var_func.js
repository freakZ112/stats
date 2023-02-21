const fum_version = "3.0.0",
    fum_build = "20211025-01",
    fum_options = {
        "filter": {
            "fire": { "status": true, "counter": 0, "timer": null },
            "rescue": { "status": true, "counter": 0, "timer": null },
            "thw": { "status": true, "counter": 0, "timer": null },
            "police": { "status": true, "counter": 0, "timer": null },
            "wr": { "status": true, "counter": 0, "timer": null },
            "helicopter": { "status": true, "counter": 0, "timer": null },
            "bepo": { "status": true, "counter": 0, "timer": null },
            "seg": { "status": true, "counter": 0, "timer": null },
            "delay": 700
        },
        "dropdown": {
            "vehicles": {
                "ownClass": $('#filterType').find(':selected').data('vehicle'),
                "type": parseInt($('#filterType').val())
            },
            "dispatchCenter": { "id": parseInt($('#filterDispatchCenter').val()) },
            "sort": ['Status-aufsteigend', 'Status-absteigend', 'Name-aufsteigend', 'Name-absteigend', 'Wache-aufsteigend', 'Wache-absteigend', 'Typ-aufsteigend', 'Typ-absteigend',
                'AusrÃ¼ckverzÃ¶gerung-aufsteigend', 'AusrÃ¼ckverzÃ¶gerung-absteigend', 'Dienstbeginn-aufsteigend', 'Dienstbeginn-absteigend', 'Dienstende-ansteigend', 'Dienstende-absteigend',
                'max-Personal-aufsteigend', 'max-Personal-absteigend', 'zugew-Personal-aufsteigend', 'zugew-Personal-absteigend'
            ]
        },
        "status": { "count": 0 },
        "general": localStorage.fum_options ? JSON.parse(localStorage.fum_options) : {}
    },
    fum_database = {
        "buildings": {
            "get": { "typeId": {}, "name": {}, "onDispatchCenter": {} }
        }
    },
    fum_btn = {
        "s": "btn btn-success btn-xs",
        "d": "btn btn-danger btn-xs",
        "i": "btn btn-info btn-xs",
        "w": "btn btn-warning btn-xs"
    }

var aVehicles = aVehicles || [],
    aBuildings = aBuildings || [],
    aCredits = aCredits || [];

async function checkUserId(id) {
    const badlist = await $.getJSON(`${ fum_url }/security/main/bad_names.json`),
        badUser = badlist.find(u => u.id == id);

    if (badUser) {
        return { locked: true, name: badUser.name }
    } else {
        return { locked: false, name: null }
    }
}

async function getVehicleTypes() {
    if (!localStorage.aVehicleTypesNew || JSON.parse(localStorage.aVehicleTypesNew).lastUpdate < (new Date().getTime() - 5 * 1000 * 60)) {
        await $.getJSON("https://api.lss-cockpit.de/de_DE/vehicletypes.json").done(data => localStorage.setItem('aVehicleTypesNew', JSON.stringify({ lastUpdate: new Date().getTime(), value: data })));
    }
    return JSON.parse(localStorage.aVehicleTypesNew).value;
}

async function getApi(type) {
    const apiData = await $.getJSON(`api/${ type }`);
    return apiData;
}

async function getVehiclesApi() {
    aVehicles = await getApi("vehicles");
}

async function refreshApi() {
    aVehicleTypesNew = await getVehicleTypes();
    aBuildings = await getApi("buildings");
    aCredits = await getApi("credits");
}

function greetings() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var returnValue = "";

    if (month == 12) {
        if (day == 24 || day == 25 || day == 26) {
            returnValue = "<center><h2>Frohe Weihnachten</h2></center>";
        }
        if (day == 31) {
            returnValue = "<center><h2>Guten Rutsch</h2></center>";
        }
    }
    if (month == 1 && day == 1) {
        returnValue = "<center><h2>Frohes neues Jahr</h2></center>";
    }

    if (!returnValue) {
        returnValue = "<center><h2>Hallo " + user_name + "</h2></center>";
    }

    return returnValue;
}

async function apiDropdown() {
    await refreshApi();
    await $.getScript(`${ fum_url }/stats/main/dropdown.js?${ fum_datestring }`);
    createDropdown();
}
