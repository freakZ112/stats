function playerInfos() {

    var infoBuildingsDatabase = aBuildings.slice(0);
    var vehicles = { "rth": 0, "polHeli": 0, "grtw": 0, "naw": 0, "itw": 0, "onDispatchCenter": [] };
    var fire = {};
    var rescue = {};
    var seg = {};
    var police = {};
    var bepo = {};
    var polSonder = {};
    var thw = {};
    var hospitals = {};
    var otherBuildings = {};
    var premiumCount = user_premium ? 15 : 20;
    var valVehicles = 0;
    var configTable = {
        "arrowFire": `<div class="glyphicon glyphicon-arrow-right" style="margin-left:2em;color:firebrick"></div>`,
        "arrowRescue": `<div class="glyphicon glyphicon-arrow-right" style="margin-left:2em;color:orangered"></div>`,
        "arrowPolice": `<div class="glyphicon glyphicon-arrow-right" style="margin-left:2em;color:green"></div>`,
        "arrowThw": `<div class="glyphicon glyphicon-arrow-right" style="margin-left:2em;color:midnightblue"></div>`,
        "arrowHospital": `<div class="glyphicon glyphicon-arrow-right" style="margin-left:2em;color:deepskyblue"></div>`,
        "marginLeft": `<div style="margin-left:1em">%PLATZHALTER%</div>`,
        "expand": `<span class="glyphicon glyphicon-plus-sign pull-right treeView %CLASS%"></span>`
    };

    $.each(aVehicles, function(key, item) {
        var value = aVehicleTypesNew.filter((obj) => obj.id === item.vehicle_type)[0].cost;
        switch (item.vehicle_type) {
            case 31:
                vehicles.rth++;
                break;
            case 61:
                vehicles.polHeli++;
                break;
            case 73:
                vehicles.grtw++;
                break;
            case 74:
                vehicles.naw++;
                break;
            case 97:
                vehicles.itw++;
                break;
        }
        vehicles.onDispatchCenter.push({ "name": item.caption, "lst": fum_database.buildings.get.onDispatchCenter[item.building_id] });
        valVehicles += value;
    });

    if (!isNaN(fum_options.dropdown.dispatchCenter.id)) {
        for (let i = infoBuildingsDatabase.length - 1; i >= 0; i--) {
            if (infoBuildingsDatabase[i].leitstelle_building_id && infoBuildingsDatabase[i].leitstelle_building_id !== fum_options.dropdown.dispatchCenter.id) {
                infoBuildingsDatabase.splice(i, 1);
            }
        }
        for (let i = vehicles.onDispatchCenter.length - 1; i >= 0; i--) {
            if (vehicles.onDispatchCenter[i].lst !== fum_options.dropdown.dispatchCenter.id) {
                vehicles.onDispatchCenter.splice(i, 1);
            }
        }
    }

    $.each(infoBuildingsDatabase, function(key, item) {
        switch (item.building_type) {
            case 0:
                if (item.small_building) fire.small > 0 ? fire.small++ : fire.small = 1;
                else fire.normal > 0 ? fire.normal++ : fire.normal = 1;
                break;
            case 1:
                fire.school > 0 ? fire.school++ : fire.school = 1;
                break;
            case 2:
                if (item.small_building) rescue.small > 0 ? rescue.small++ : rescue.small = 1;
                else rescue.normal > 0 ? rescue.normal++ : rescue.normal = 1;
                break;
            case 3:
                rescue.school > 0 ? rescue.school++ : rescue.school = 1;
                break;
            case 4:
                hospitals.count > 0 ? hospitals.count++ : hospitals.count = 1;
                hospitals.beds > 0 ? hospitals.beds += item.level : hospitals.beds = item.level;
                hospitals.patients ? hospitals.patients += item.patient_count : hospitals.patients = item.patient_count;
                break;
            case 5:
                if (!rescue.helicopter) rescue.helicopter = 0;
                if (!rescue.activeHelicopter) rescue.activeHelicopter = 0;
                if (item.enabled) {
                    item.level > 0 ? rescue.helicopter += (item.level + 1) : rescue.helicopter++;
                    item.level > 0 ? rescue.activeHelicopter += (item.level + 1) : rescue.activeHelicopter++;
                } else {
                    item.level > 0 ? rescue.helicopter += (item.level + 1) : rescue.helicopter++;
                }
                break;
            case 6:
                if (item.small_building) {
                    police.small > 0 ? police.small++ : police.small = 1;
                    police.smallPrisoners ? police.smallPrisoners += item.prisoner_count : police.smallPrisoners = item.prisoner_count;
                } else {
                    police.normal > 0 ? police.normal++ : police.normal = 1;
                    police.normalPrisoners ? police.normalPrisoners += item.prisoner_count : police.normalPrisoners = item.prisoner_count;
                }
                break;
            case 7:
                otherBuildings.lst > 0 ? otherBuildings.lst++ : otherBuildings.lst = 1;
                break;
            case 8:
                police.school > 0 ? police.school++ : police.school = 1;
                break;
            case 9:
                thw.count > 0 ? thw.count++ : thw.count = 1;
                break;
            case 10:
                thw.school > 0 ? thw.school++ : thw.school = 1;
                break;
            case 11:
                bepo.count > 0 ? bepo.count++ : bepo.count = 1;
                break;
            case 12:
                seg.count > 0 ? seg.count++ : seg.count = 1;
                break;
            case 13:
                if (!police.helicopter) police.helicopter = 0;
                if (!police.activeHelicopter) police.activeHelicopter = 0;
                if (item.enabled) {
                    item.level > 0 ? police.helicopter += (item.level + 1) : police.helicopter++;
                    item.level > 0 ? police.activeHelicopter += (item.level + 1) : police.activeHelicopter++;
                } else item.level > 0 ? police.helicopter += (item.level + 1) : police.helicopter++;
                break;
            case 14:
                otherBuildings.bsr > 0 ? otherBuildings.bsr++ : otherBuildings.bsr = 1;
                break;
            case 15:
                if (!otherBuildings.wr) otherBuildings.wr = 0;
                if (!otherBuildings.activeWr) otherBuildings.activeWr = 0;
                item.enabled ? otherBuildings.activeWr++ : otherBuildings.wr++;
                break;
            case 17:
                polSonder.count > 0 ? polSonder.count++ : polSonder.count = 1;
                break;
            case 21:
                if (!otherBuildings.rescueDogs) otherBuildings.rescueDogs = 0;
                if (!otherBuildings.activeRescueDogs) otherBuildings.activeRescueDogs = 0;
                item.enabled ? otherBuildings.activeRescueDogs++ : otherBuildings.rescueDogs++;
                break;
        }
        if (item.extensions.length > 0) {
            for (let i = 0; i < item.extensions.length; i++) {
                var switchOptions = {
                    "active": item.extensions[i].enabled && item.extensions[i].available,
                    "build": item.extensions[i].available,
                    "onBuild": !item.extensions[i].available && item.extensions[i].enabled && fum_options.general.showOnBuild
                };
                switch (item.extensions[i].caption) {
                    case "GroÃŸwache":
                        if (switchOptions.build) fire.big > 0 ? fire.big++ : fire.big = 1;
                        if (switchOptions.onBuild) fire.onBuildBig > 0 ? fire.onBuildBig++ : fire.onBuildBig = 1;
                        break;
                    case "Rettungsdienst-Erweiterung":
                        if (switchOptions.build) fire.rescue > 0 ? fire.rescue++ : fire.rescue = 1;
                        if (switchOptions.active) fire.activeRescue > 0 ? fire.activeRescue++ : fire.activeRescue = 1;
                        if (switchOptions.onBuild) fire.onBuildRescue > 0 ? fire.onBuildRescue++ : fire.onBuildRescue = 1;
                        break;
                    case "Werkfeuerwehr":
                        if (switchOptions.build) fire.wf > 0 ? fire.wf++ : fire.wf = 1;
                        if (switchOptions.active) fire.activeWf > 0 ? fire.activeWf++ : fire.activeWf = 1;
                        if (switchOptions.onBuild) fire.onBuildWf > 0 ? fire.onBuildWf++ : fire.onBuildWf = 1;
                        break;
                    case "Flughafen-Erweiterung":
                        if (switchOptions.build) fire.airport > 0 ? fire.airport++ : fire.airport = 1;
                        if (switchOptions.active) fire.activeAirport > 0 ? fire.activeAirport++ : fire.activeAirport = 1;
                        if (switchOptions.onBuild) fire.onBuildAirport > 0 ? fire.onBuildAirport++ : fire.onBuildAirport = 1;
                        break;
                    case "FÃ¼hrung":
                        if (switchOptions.build) seg.leader > 0 ? seg.leader++ : seg.leader = 1;
                        if (switchOptions.active) seg.activeLeader > 0 ? seg.activeLeader++ : seg.activeLeader = 1;
                        if (switchOptions.onBuild) seg.onBuildLeader > 0 ? seg.onBuildLeader++ : seg.onBuildLeader = 1;
                        break;
                    case "SanitÃ¤tsdienst":
                        if (switchOptions.build) seg.sanD > 0 ? seg.sanD++ : seg.sanD = 1;
                        if (switchOptions.active) seg.activeSanD > 0 ? seg.activeSanD++ : seg.activeSanD = 1;
                        if (switchOptions.onBuild) seg.onBuildSanD > 0 ? seg.onBuildSanD++ : seg.onBuildSanD = 1;
                        break;
                    case "Wasserrettungs-Erweiterung":
                        if (switchOptions.build) {
                            if (item.building_type == 0) fire.wr > 0 ? fire.wr++ : fire.wr = 1;
                            else if (item.building_type == 12) seg.wr > 0 ? seg.wr++ : seg.wr = 1;
                        }
                        if (switchOptions.active) {
                            if (item.building_type == 0) fire.activeWr > 0 ? fire.activeWr++ : fire.activeWr = 1;
                            else if (item.building_type == 12) seg.activeWr > 0 ? seg.activeWr++ : seg.activeWr = 1;
                        }
                        if (switchOptions.onBuild) {
                            if (item.building_type == 0) fire.onBuildWr > 0 ? fire.onBuildWr++ : fire.onBuildWr = 1;
                            else if (item.building_type == 12) seg.onBuildWr > 0 ? seg.onBuildWr++ : seg.onBuildWr = 1;
                        }
                        break;
                    case "Rettungshundestaffel":
                        if (switchOptions.build) seg.rescueDogs > 0 ? seg.rescueDogs++ : seg.rescueDogs = 1;
                        if (switchOptions.active) seg.activeRescueDogs > 0 ? seg.activeRescueDogs++ : seg.activeRescueDogs = 1;
                        if (switchOptions.onBuild) seg.onBuildRescueDogs > 0 ? seg.onBuildRescueDogs++ : seg.onBuildRescueDogs = 1;
                        break;
                    case "AbrollbehÃ¤lter-Stellplatz":
                        if (switchOptions.build) {
                            if (item.small_building) fire.abSmall > 0 ? fire.abSmall++ : fire.abSmall = 1;
                            else fire.abNormal > 0 ? fire.abNormal++ : fire.abNormal = 1;
                        }
                        if (switchOptions.onBuild) {
                            if (item.small_building) fire.onBuildAbSmall > 0 ? fire.onBuildAbSmall++ : fire.onBuildAbSmall = 1;
                            else fire.onBuildAbNormal > 0 ? fire.onBuildAbNormal++ : fire.onBuildAbNormal = 1;
                        }
                        break;
                    case "2. Zug der 1. Hundertschaft":
                        if (switchOptions.build) bepo.division2 > 0 ? bepo.division2++ : bepo.division2 = 1;
                        if (switchOptions.active) bepo.activeDivision2 > 0 ? bepo.activeDivision2++ : bepo.activeDivision2 = 1;
                        if (switchOptions.onBuild) bepo.onBuildDivision2 > 0 ? bepo.onBuildDivision2++ : bepo.onBuildDivision2 = 1;
                        break;
                    case "3. Zug der 1. Hundertschaft":
                        if (switchOptions.build) bepo.division3 > 0 ? bepo.division3++ : bepo.division3 = 1;
                        if (switchOptions.active) bepo.activeDivision3 > 0 ? bepo.activeDivision3++ : bepo.activeDivision3 = 1;
                        if (switchOptions.onBuild) bepo.onBuildDivision3 > 0 ? bepo.onBuildDivision3++ : bepo.onBuildDivision3 = 1;
                        break;
                    case "Sonderfahrzeug: Gefangenenkraftwagen":
                        if (switchOptions.build) bepo.mobilePrison > 0 ? bepo.mobilePrison++ : bepo.mobilePrison = 1;
                        if (switchOptions.active) bepo.activeMobilePrison > 0 ? bepo.activeMobilePrison++ : bepo.activeMobilePrison = 1;
                        if (switchOptions.onBuild) bepo.onBuildMobilePrison > 0 ? bepo.onBuildMobilePrison++ : bepo.onBuildMobilePrison = 1;
                        break;
                    case "Technischer Zug: Wasserwerfer":
                        if (switchOptions.build) bepo.waterthrower > 0 ? bepo.waterthrower++ : bepo.waterthrower = 1;
                        if (switchOptions.active) bepo.activeWaterthrower > 0 ? bepo.activeWaterthrower++ : bepo.activeWaterthrower = 1;
                        if (switchOptions.onBuild) bepo.onBuildWaterthrower > 0 ? bepo.onBuildWaterthrower++ : bepo.onBuildWaterthrower = 1;
                        break;
                    case "SEK: 1. Zug":
                        if (switchOptions.build) {
                            if (item.building_type == 11) bepo.sek1 > 0 ? bepo.sek1++ : bepo.sek1 = 1;
                            else if (item.building_type == 17) polSonder.sek1 > 0 ? polSonder.sek1++ : polSonder.sek1 = 1;
                        }
                        if (switchOptions.active) {
                            if (item.building_type == 11) bepo.activeSek1 > 0 ? bepo.activeSek1++ : bepo.activeSek1 = 1;
                            else if (item.building_type == 17) polSonder.activeSek1 > 0 ? polSonder.activeSek1++ : polSonder.activeSek1 = 1;
                        }
                        if (switchOptions.onBuild) {
                            if (item.building_type == 11) bepo.onBuildSek1 > 0 ? bepo.onBuildSek1++ : bepo.onBuildSek1 = 1;
                            else if (item.building_type == 17) polSonder.onBuildSek1 > 0 ? polSonder.onBuildSek1++ : polSonder.onBuildSek1 = 1;
                        }
                        break;
                    case "SEK: 2. Zug":
                        if (switchOptions.build) {
                            if (item.building_type == 11) bepo.sek2 > 0 ? bepo.sek2++ : bepo.sek2 = 1;
                            else if (item.building_type == 17) polSonder.sek2 > 0 ? polSonder.sek2++ : polSonder.sek2 = 1;
                        }
                        if (switchOptions.active) {
                            if (item.building_type == 11) bepo.activeSek2 > 0 ? bepo.activeSek2++ : bepo.activeSek2 = 1;
                            else if (item.building_type == 17) polSonder.ActiveSek2 > 0 ? polSonder.ActiveSek2++ : polSonder.ActiveSek2 = 1;
                        }
                        if (switchOptions.onBuild) {
                            if (item.building_type == 11) bepo.onBuildSek2 > 0 ? bepo.onBuildSek2++ : bepo.onBuildSek2 = 1;
                            else if (item.building_type == 17) polSonder.onBuildSek2 > 0 ? polSonder.onBuildSek2++ : polSonder.onBuildSek2 = 1;
                        }
                        break;
                    case "MEK: 1. Zug":
                        if (switchOptions.build) {
                            if (item.building_type == 11) bepo.mek1 > 0 ? bepo.mek1++ : bepo.mek1 = 1;
                            else if (item.building_type == 17) polSonder.mek1 > 0 ? polSonder.mek1++ : polSonder.mek1 = 1;
                        }
                        if (switchOptions.active) {
                            if (item.building_type == 11) bepo.activeMek1 > 0 ? bepo.activeMek1++ : bepo.activeMek1 = 1;
                            else if (item.building_type == 17) polSonder.activeMek1 > 0 ? polSonder.activeMek1++ : polSonder.activeMek1 = 1;
                        }
                        if (switchOptions.onBuild) {
                            if (item.building_type == 11) bepo.onBuildMek1 > 0 ? bepo.onBuildMek1++ : bepo.onBuildMek1 = 1;
                            else if (item.building_type == 17) polSonder.onBuildMek1 > 0 ? polSonder.onBuildMek1++ : polSonder.onBuildMek1 = 1;
                        }
                        break;
                    case "MEK: 2. Zug":
                        if (switchOptions.build) {
                            if (item.building_type == 11) bepo.mek2 > 0 ? bepo.mek2++ : bepo.mek2 = 1;
                            else if (item.building_type == 17) polSonder.mek2 > 0 ? polSonder.mek2++ : polSonder.mek2 = 1;
                        }
                        if (switchOptions.active) {
                            if (item.building_type == 11) bepo.activeMek2 > 0 ? bepo.activeMek2++ : bepo.activeMek2 = 1;
                            else if (item.building_type == 17) polSonder.activeMek2 > 0 ? polSonder.activeMek2++ : polSonder.activeMek2 = 1;
                        }
                        if (switchOptions.onBuild) {
                            if (item.building_type == 11) bepo.onBuildMek2 > 0 ? bepo.onBuildMek2++ : bepo.onBuildMek2 = 1;
                            else if (item.building_type == 17) polSonder.onBuildMek2 > 0 ? polSonder.onBuildMek2++ : polSonder.onBuildMek2 = 1;
                        }
                        break;
                    case "Diensthundestaffel":
                        if (switchOptions.build) {
                            if (item.building_type == 6) police.guardDogs > 0 ? police.guardDogs++ : police.guardDogs = 1;
                            else if (item.building_type == 11) bepo.guardDogs > 0 ? bepo.guardDogs++ : bepo.guardDogs = 1;
                            else if (item.building_type == 17) polSonder.guardDogs > 0 ? polSonder.guardDogs++ : polSonder.guardDogs = 1;
                        }
                        if (switchOptions.active) {
                            if (item.building_type == 6) police.activeGuardDogs > 0 ? police.activeGuardDogs++ : police.activeGuardDogs = 1;
                            else if (item.building_type == 11) bepo.activeGuardDogs > 0 ? bepo.activeGuardDogs++ : bepo.activeGuardDogs = 1;
                            else if (item.building_type == 17) polSonder.activeGuardDogs > 0 ? polSonder.activeGuardDogs++ : polSonder.activeGuardDogs = 1;
                        }
                        if (switchOptions.onBuild) {
                            if (item.building_type == 6) police.onBuildGuardDogs > 0 ? police.onBuildGuardDogs++ : police.onBuildGuardDogs = 1;
                            else if (item.building_type == 11) bepo.onBuildGuardDogs > 0 ? bepo.onBuildGuardDogs++ : bepo.onBuildGuardDogs = 1;
                            else if (item.building_type == 17) polSonder.onBuildGuardDogs > 0 ? polSonder.onBuildGuardDogs++ : polSonder.onBuildGuardDogs = 1;
                        }
                        break;
                    case "Kriminalpolizei-Erweiterung":
                        if (switchOptions.build) police.civil > 0 ? police.civil++ : police.civil = 1;
                        if (switchOptions.active) police.activeCivil > 0 ? police.activeCivil++ : police.activeCivil = 1;
                        if (switchOptions.onBuild) police.onBuildCivil > 0 ? police.onBuildCivil++ : police.onBuildCivil = 1;
                        break;
                    case "AuÃŸenlastbehÃ¤lter-Erweiterung":
                        if (switchOptions.build) police.waterbin > 0 ? police.waterbin++ : police.waterbin = 1;
                        if (switchOptions.active) police.activeWaterbin > 0 ? police.activeWaterbin++ : police.activeWaterbin = 1;
                        if (switchOptions.onBuild) police.onBuildWaterbin > 0 ? police.onBuildWaterbin++ : police.onBuildWaterbin = 1;
                        break;
                    case "1. Technischer Zug: Bergungsgruppe 2":
                        if (switchOptions.build) thw.tz1Bg > 0 ? thw.tz1Bg++ : thw.tz1Bg = 1;
                        if (switchOptions.active) thw.activeTz1Bg > 0 ? thw.activeTz1Bg++ : thw.activeTz1Bg = 1;
                        if (switchOptions.onBuild) thw.onBuildTz1Bg > 0 ? thw.onBuildTz1Bg++ : thw.onBuildTz1Bg = 1;
                        break;
                    case "1. Technischer Zug: Zugtrupp":
                        if (switchOptions.build) thw.tz1Zug > 0 ? thw.tz1Zug++ : thw.tz1Zug = 1;
                        if (switchOptions.active) thw.activeTz1Zug > 0 ? thw.activeTz1Zug++ : thw.activeTz1Zug = 1;
                        if (switchOptions.onBuild) thw.onBuildTz1Zug > 0 ? thw.onBuildTz1Zug++ : thw.onBuildTz1Zug = 1;
                        break;
                    case "Fachgruppe RÃ¤umen":
                        if (switchOptions.build) thw.fgrR > 0 ? thw.fgrR++ : thw.fgrR = 1;
                        if (switchOptions.active) thw.activeFgrR > 0 ? thw.activeFgrR++ : thw.activeFgrR = 1;
                        if (switchOptions.onBuild) thw.onBuildFgrR > 0 ? thw.onBuildFgrR++ : thw.onBuildFgrR = 1;
                        break;
                    case "Fachgruppe Wassergefahren":
                        if (switchOptions.build) thw.fgrW > 0 ? thw.fgrW++ : thw.fgrW = 1;
                        if (switchOptions.active) thw.activeFgrW > 0 ? thw.activeFgrW++ : thw.activeFgrW = 1;
                        if (switchOptions.onBuild) thw.onBuildFgrW > 0 ? thw.onBuildFgrW++ : thw.onBuildFgrW = 1;
                        break;
                    case "2. Technischer Zug - Grundvorraussetzungen":
                        if (switchOptions.build) thw.tz2Grund > 0 ? thw.tz2Grund++ : thw.tz2Grund = 1;
                        if (switchOptions.active) thw.activeTz2Grund > 0 ? thw.activeTz2Grund++ : thw.activeTz2Grund = 1;
                        if (switchOptions.onBuild) thw.onBuildTz2Grung > 0 ? thw.onBuildTz2Grung++ : thw.onBuildTz2Grung = 1;
                        break;
                    case "2. Technischer Zug: Bergungsgruppe 2":
                        if (switchOptions.build) thw.tz2Bg > 0 ? thw.tz2Bg++ : thw.tz2Bg = 1;
                        if (switchOptions.active) thw.activeTz2Bg > 0 ? thw.activeTz2Bg++ : thw.activeTz2Bg = 1;
                        if (switchOptions.onBuild) thw.onBuildTz2Bg > 0 ? thw.onBuildTz2Bg++ : thw.onBuildTz2Bg = 1;
                        break;
                    case "2. Technischer Zug: Zugtrupp":
                        if (switchOptions.build) thw.tz2Zug > 0 ? thw.tz2Zug++ : thw.tz2Zug = 1;
                        if (switchOptions.active) thw.activeTz2Zug > 0 ? thw.activeTz2Zug++ : thw.activeTz2Zug = 1;
                        if (switchOptions.onBuild) thw.onBuildTz2Zug > 0 ? thw.onBuildTz2Zug++ : thw.onBuildTz2Zug = 1;
                        break;
                    case "Fachgruppe Ortung":
                        if (switchOptions.build) thw.fgrO > 0 ? thw.fgrO++ : thw.fgrO = 1;
                        if (switchOptions.active) thw.activeFgrO > 0 ? thw.activeFgrO++ : thw.activeFgrO = 1;
                        if (switchOptions.onBuild) thw.onBuildFgrO > 0 ? thw.onBuildFgrO++ : thw.onBuildFgrO = 1;
                        break;
                    case "Fachgruppe Wasserschaden/Pumpen":
                        if (switchOptions.build) thw.fgrWP > 0 ? thw.fgrWP++ : thw.fgrWP = 1;
                        if (switchOptions.active) thw.activeFgrWP > 0 ? thw.activeFgrWP++ : thw.activeFgrWP = 1;
                        if (switchOptions.onBuild) thw.onBuildFgrWP > 0 ? thw.onBuildFgrWP++ : thw.onBuildFgrWP = 1;
                        break;
                    case "Allgemeine Innere":
                        if (switchOptions.build) hospitals.ina > 0 ? hospitals.ina++ : hospitals.ina = 1;
                        if (switchOptions.onBuild) hospitals.onBuildIna > 0 ? hospitals.onBuildIna++ : hospitals.onBuildIna = 1;
                        break;
                    case "Allgemeine Chirurgie":
                        if (switchOptions.build) hospitals.ach > 0 ? hospitals.ach++ : hospitals.ach = 1;
                        if (switchOptions.onBuild) hospitals.onBuildAch > 0 ? hospitals.onBuildAch++ : hospitals.onBuildAch = 1;
                        break;
                    case "GynÃ¤kologie":
                        if (switchOptions.build) hospitals.gyn > 0 ? hospitals.gyn++ : hospitals.gyn = 1;
                        if (switchOptions.onBuild) hospitals.onBuildGyn > 0 ? hospitals.onBuildGyn++ : hospitals.onBuildGyn = 1;
                        break;
                    case "Urologie":
                        if (switchOptions.build) hospitals.uro > 0 ? hospitals.uro++ : hospitals.uro = 1;
                        if (switchOptions.onBuild) hospitals.onBuildUro > 0 ? hospitals.onBuildUro++ : hospitals.onBuildUro = 1;
                        break;
                    case "Unfallchirurgie":
                        if (switchOptions.build) hospitals.uch > 0 ? hospitals.uch++ : hospitals.uch = 1;
                        if (switchOptions.onBuild) hospitals.onBuildUch > 0 ? hospitals.onBuildUch++ : hospitals.onBuildUch = 1;
                        break;
                    case "Neurologie":
                        if (switchOptions.build) hospitals.nrl > 0 ? hospitals.nrl++ : hospitals.nrl = 1;
                        if (switchOptions.onBuild) hospitals.onBuildNrl > 0 ? hospitals.onBuildNrl++ : hospitals.onBuildNrl = 1;
                        break;
                    case "Neurochirurgie":
                        if (switchOptions.build) hospitals.nch > 0 ? hospitals.nch++ : hospitals.nch = 1;
                        if (switchOptions.onBuild) hospitals.onBuildNch > 0 ? hospitals.onBuildNch++ : hospitals.onBuildNch = 1;
                        break;
                    case "Kardiologie":
                        if (switchOptions.build) hospitals.kar > 0 ? hospitals.kar++ : hospitals.kar = 1;
                        if (switchOptions.onBuild) hospitals.onBuildKar > 0 ? hospitals.onBuildKar++ : hospitals.onBuildKar = 1;
                        break;
                    case "Kardiochirurgie":
                        if (switchOptions.build) hospitals.kch > 0 ? hospitals.kch++ : hospitals.kch = 1;
                        if (switchOptions.onBuild) hospitals.onBuildKch > 0 ? hospitals.onBuildKch++ : hospitals.onBuildKch = 1;
                        break;
                    case "Zelle":
                        if (switchOptions.build) {
                            if (item.small_building) police.cellSmall > 0 ? police.cellSmall++ : police.cellSmall = 1;
                            else police.cellNormal > 0 ? police.cellNormal++ : police.cellNormal = 1;
                        }
                        if (switchOptions.onBuild) {
                            if (item.small_building) police.onBuildCellSmall > 0 ? police.onBuildCellSmall++ : police.onBuildCellSmall = 1;
                            else police.onBuildCellNormal > 0 ? police.onBuildCellNormal++ : police.onBuildCellNormal = 1;
                        }
                        break;
                    case "Weiterer Klassenraum":
                        if (switchOptions.build) {
                            if (item.building_type == 1) fire.classroom > 0 ? fire.classroom++ : fire.classroom = 1;
                            else if (item.building_type == 3) rescue.classroom > 0 ? rescue.classroom++ : rescue.classroom = 1;
                            else if (item.building_type == 8) police.classroom > 0 ? police.classroom++ : police.classroom = 1;
                            else if (item.building_type == 10) thw.classroom > 0 ? thw.classroom++ : thw.classroom = 1;
                        }
                        if (switchOptions.onBuild) {
                            if (item.building_type == 1) fire.onBuildClassroom > 0 ? fire.onBuildClassroom++ : fire.onBuildClassroom = 1;
                            else if (item.building_type == 3) rescue.onBuildClassroom > 0 ? rescue.onBuildClassroom++ : rescue.onBuildClassroom = 1;
                            else if (item.building_type == 8) police.onBuildClassroom > 0 ? police.onBuildClassroom++ : police.onBuildClassroom = 1;
                            else if (item.building_type == 10) thw.onBuildClassroom > 0 ? thw.onBuildClassroom++ : thw.onBuildClassroom = 1;
                        }
                        break;
                }
            }
        }
    });

    $('#tableStatusLabel').html(`<div class="pull-left"><span class="lightbox-open" style="cursor:pointer" href="/profile/${ aCredits.user_id }">${ aCredits.user_name } (${ aCredits.user_id })</span></div>
                                     <div class="pull-right" style="margin-right:3em">Toplist-Platz: <span class="lightbox-open" style="cursor:pointer" href="${ Math.ceil(aCredits.user_toplist_position / 20) > 1 ?
            `/toplist?page=${ Math.ceil(aCredits.user_toplist_position / 20) }` :
            `/toplist` }">${ aCredits.user_toplist_position.toLocaleString() }</span></div>`);

    let userInfos =
        `<table class="table">
                 <thead>
                 <tr>
                 <th class="col">Bezeichnung<br>&nbsp;</th>
                 <th class="col-1"><center>Anzahl<br>${ fum_options.general.showOnBuild ? `ist (aktiv) / max / Ausbau` : `ist (aktiv) / max` }</center></th>
                 </tr>
                 </thead>
                 <tbody>`;

    function infoContentOneValue(name, value, cssClass) {
        if (value === undefined) value = 0;
        userInfos += `<tr class="${ cssClass }">
                          <td class="col">${ name }</td>
                          <td class="col-1"><center>${ value.toLocaleString() }</center></td>
                          </tr>`;
    }

    function percentage(name, value, cssClass) {
        if (value === undefined) value = 0;
        var percent = Math.round(value / (infoBuildingsDatabase.length - (otherBuildings.lst > 0 ? otherBuildings.lst : 0)) * 100);
        userInfos += `<tr class="${ cssClass }">
                          <td class="col">${ name }</div></td>
                          <td class="col-1"><center>${ value } (${ percent }&percnt;)</center></td>
                          </tr>`;
    }

    function infoContentMax(name, valueNow, valueMax, cssClass) {
        if (valueNow === undefined) valueNow = 0;
        if (valueMax === undefined) valueMax = 0;
        userInfos += `<tr class="${ cssClass }">
                          <td class="col">${ name }</td>
                          <td class="col-1"><center>${ valueNow == 0 ? `<span style="color:red">${ valueNow.toLocaleString() }</span>` : valueNow < valueMax ?
                `<span style="color:orange">${ valueNow.toLocaleString() }</span>` :
                `<span style="color:limegreen">${ valueNow.toLocaleString() }</span>` } / ${ valueMax.toLocaleString() }</center></td>
                          </tr>`;
    }

    function percentageMax(name, valueNow, valueMax, cssClass) {
        if (valueNow === undefined) valueNow = 0;
        if (valueMax === undefined) valueMax = 0;
        var percent = Math.round(valueMax / (infoBuildingsDatabase.length - (otherBuildings.lst > 0 ? otherBuildings.lst : 0)) * 100);
        userInfos += `<tr class="${ cssClass }">
                          <td class="col">${ name }</td>
                          <td class="col-1"><center>${ valueNow == 0 ? `<span style="color:red">${ valueNow.toLocaleString() }</span>` : valueNow < valueMax ?
                `<span style="color:orange">${ valueNow.toLocaleString() }</span>` :
                `<span style="color:limegreen">${ valueNow.toLocaleString() }</span>` } / ${ valueMax.toLocaleString() } (${ percent }&percnt;)</center></td>
                          </tr>`;
    }

    function infoContentOnBuild(name, valueNow, valueMax, valueOnBuild, cssClass) {
        if (valueNow === undefined) valueNow = 0;
        if (valueMax === undefined) valueMax = 0;
        if (valueOnBuild === undefined) valueOnBuild = 0;
        userInfos += `<tr class="${ cssClass }">
                          <td class="col">${ name }</td>
                          <td class="col-1"><center>${ valueNow == 0 ? `<span style="color:red">${ valueNow.toLocaleString() }</span>` : valueNow < valueMax ?
                `<span style="color:orange">${ valueNow.toLocaleString() }</span>` :
                `<span style="color:limegreen">${ valueNow.toLocaleString() }</span>` } / ${ valueMax.toLocaleString() } / <span style="color:mediumslateblue">${ valueOnBuild.toLocaleString() }</span></center></td>
                          </tr>`;
    }

    function tableExtension(name, typeArrow, valueNow, valueMax, valueOnBuild, cssClass) {
        if (valueNow === undefined) valueNow = 0;
        if (valueMax === undefined) valueMax = 0;
        if (valueOnBuild === undefined) valueOnBuild = 0;
        var showOnTable = `${ typeArrow } ${ name }`;
        if (valueMax > 0 || valueOnBuild > 0) {
            if (valueOnBuild > 0) infoContentOnBuild(showOnTable, valueNow, valueMax, valueOnBuild, cssClass);
            else infoContentMax(showOnTable, valueNow, valueMax, cssClass);
        }
    }

    function rescueVehicles(html, value, cssClass) {
        if (value === undefined) value = 0;
        infoContentMax(`${ html } Notarztwagen (NAW)`, vehicles.naw, value, cssClass);
        if (value >= premiumCount) {
            infoContentMax(`${ html } GroÃŸraumrettungswagen (GRTW)`, vehicles.grtw, Math.floor(value / premiumCount), cssClass);
            infoContentMax(`${ html } Intensivtransportwagen (ITW)`, vehicles.itw, Math.floor(value / (premiumCount - 5)), cssClass);
        }
    }

    function calculateNextGrtw(html, rescueBuildings, cssClass) {
        var maxGrtw = Math.floor(rescueBuildings / premiumCount);
        var maxItw = Math.floor(rescueBuildings / (premiumCount - 5));
        var usedBuildingsGrtw = rescueBuildings - (maxGrtw * premiumCount);
        var usedBuildingsItw = rescueBuildings - (maxItw * (premiumCount - 5));
        var nextGrtw = premiumCount - usedBuildingsGrtw;
        var nextItw = (premiumCount - 5) - usedBuildingsItw;
        if (nextGrtw < 0) nextGrtw = 0;
        if (nextItw < 0) nextItw = 0;
        userInfos += `<tr class="${ cssClass }">
                          <td class="col">${ html } benÃ¶tigte Rettungswachen bis zum nÃ¤chsten GRTW</td>
                          <td class="col-1"><center>${ nextGrtw.toLocaleString() }</center></td>
                          </tr>
                          <tr class="${ cssClass }">
                          <td class="col">${ html } benÃ¶tigte Rettungswachen bis zum nÃ¤chsten ITW</td>
                          <td class="col-1"><center>${ nextItw.toLocaleString() }</center></td>
                          </tr>`;
    }

    function calculateNextHeli(html, name, value, cssClass) {
        if (value === undefined) value = 0;
        var usedBuildings = aBuildings.length - (value * 25);
        var nextHeli = 25 - usedBuildings;
        if (nextHeli < 0) nextHeli = 0;
        userInfos += `<tr class="${ cssClass }">
                          <td class="col">${ html } benÃ¶tigte GebÃ¤ude bis zum nÃ¤chsten ${ name }</td>
                          <td class="col-1"><center>${ nextHeli.toLocaleString() }</center></td>
                          </tr>`;
    }

    function calculateNextLst(html, value, cssClass) {
        if (value === undefined) value = 0;
        var usedBuildings = value * 25;
        var nextLst = 25 - (aBuildings.length - usedBuildings);
        if (nextLst < 0) nextLst = 0;
        userInfos += `<tr class="${ cssClass }">
                          <td class="col">${ html } benÃ¶tigte GebÃ¤ude bis zur nÃ¤chsten Leitstelle</td>
                          <td class="col-1"><center>${ nextLst.toLocaleString() }</center></td>
                          </tr>`;
    }

    isNaN(fum_options.dropdown.dispatchCenter.id) ? infoContentOneValue("Fahrzeuge" + configTable.expand.replace("%CLASS%", "vehicles"), aVehicles.length, "noTree") : infoContentMax("Fahrzeuge" + configTable.expand.replace("%CLASS%", "vehicles"), vehicles.onDispatchCenter.length, aVehicles.length, "noTree");
    infoContentOneValue(configTable.marginLeft.replace("%PLATZHALTER%", "Wert des gesamten Fuhrparks in Credits"), valVehicles, "vehicles fumNested");
    if (rescue.helicopter == 0) {
        infoContentMax(configTable.marginLeft.replace('%PLATZHALTER%', 'Rettungshubscrauber (RTH)'), vehicles.rth, Math.floor(aBuildings.length / 25) > 4 ? Math.floor(aBuildings.length / 25) : 4, 'vehicles fumNested');
    }
    if (police.helicopter == 0) {
        infoContentMax(configTable.marginLeft.replace('%PLATZHALTER%', 'Polizeihubschrauber'), vehicles.polHeli, Math.floor(aBuildings.length / 25) > 4 ? Math.floor(aBuildings.length / 25) : 4, 'vehicles fumNested');
    }

    isNaN(fum_options.dropdown.dispatchCenter.id) ? infoContentOneValue("GebÃ¤ude", aBuildings.length, 'noTree') : infoContentMax("GebÃ¤ude", infoBuildingsDatabase.length - (otherBuildings.lst > 0 ? otherBuildings.lst : 0), aBuildings.length, 'noTree');

    infoContentOneValue("maximal mÃ¶gliche eigene EinsÃ¤tze", mission_count_max.toLocaleString(), "noTree");

    infoContentMax(configTable.marginLeft.replace('%PLATZHALTER%', 'Leitstellen' + configTable.expand.replace("%CLASS%", "lst")), otherBuildings.lst, Math.ceil(aBuildings.length / 25), 'noTree');
    calculateNextLst(configTable.arrowHospital, Math.floor(aBuildings.length / 25), 'lst fumNested');

    if (otherBuildings.bsr > 0) {
        infoContentOneValue(configTable.marginLeft.replace('%PLATZHALTER%', 'BereitstellungsrÃ¤ume (BSR)'), otherBuildings.bsr, 'noTree');
    }

    if (fire.small > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'Feuerwachen (klein)' + configTable.expand.replace("%CLASS%", "fireSm")), fire.small, 'noTree');
        if (fire.abSmall > 0 || fire.onBuildAbSmall > 0) {
            tableExtension(`AB-StellplÃ¤tze`, configTable.arrowFire, fire.abSmall, fire.small * 2, fire.onBuildAbSmall, 'fireSm fumNested');
        }
    }

    if (fire.normal > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'Feuerwachen' + configTable.expand.replace("%CLASS%", "fireNm")), fire.normal, 'noTree');
        if (Math.floor((fire.small > 0 ? fire.small : 0 + fire.normal) / 10) > 0) {
            tableExtension(`GroÃŸwache`, configTable.arrowFire, fire.big, Math.floor((fire.small > 0 ? fire.small + fire.normal : fire.normal) / 10), fire.onBuildBig, 'fireNm fumNested');
        }
        tableExtension(`Rettungsdienst-Erweiterung`, configTable.arrowFire, fire.activeRescue, fire.rescue, fire.onBuildRescue, 'fireNm fumNested');
        if (fire.rescue > 0) {
            if (!rescue.normal && !rescue.small) {
                rescueVehicles(`<div class="glyphicon glyphicon-arrow-right" style="margin-left:3em;color:orangered"></div>`, fire.rescue, 'fireNm fumNested');
                calculateNextGrtw(`<div class="glyphicon glyphicon-arrow-right" style="margin-left:3em;color:orangered"></div>`, fire.rescue, 'fireNm fumNested');
            }
        }
        tableExtension(`Wasserrettungs-Erweiterung`, configTable.arrowFire, fire.activeWr, fire.wr, fire.onBuildWr, 'fireNm fumNested');
        tableExtension(`Flughafen-Erweiterung`, configTable.arrowFire, fire.activeAirport, fire.airport, fire.onBuildAirport, 'fireNm fumNested');
        tableExtension(`Werkfeuerwehr`, configTable.arrowFire, fire.activeWf, fire.wf, fire.onBuildWf, 'fireNm fumNested');
        if (fire.abNormal > 0 || fire.onBuildAbNormal > 0) {
            tableExtension(`AB-StellplÃ¤tze`, configTable.arrowFire, fire.abNormal, fire.normal * 9, fire.onBuildAbNormal, 'fireNm fumNested');
        }
    }

    if (fire.school > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'Feuerwehrschulen' + configTable.expand.replace("%CLASS%", "fireSchool")), fire.school, 'noTree');
        tableExtension(`KlassenrÃ¤ume`, configTable.arrowFire, fire.classroom + fire.school, fire.school * 4, fire.onBuildClassroom, 'fireSchool fumNested');
    }

    if (rescue.small > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'Rettungswachen (klein)' + configTable.expand.replace("%CLASS%", "rescueSm")), rescue.small, 'noTree');
        if (!rescue.normal) {
            rescueVehicles(configTable.arrowRescue, rescue.small + (fire.activeRescue > 0 ? fire.activeRescue : 0), 'rescueSm fumNested');
            calculateNextGrtw(configTable.arrowRescue, rescue.small + (fire.activeRescue > 0 ? fire.activeRescue : 0), 'rescueSm fumNested');
        }
    }

    if (rescue.normal > 0) {
        if (!rescue.small) rescue.small = 0;
        if (!fire.activeRescue) fire.activeRescue = 0;
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'Rettungswachen' + configTable.expand.replace("%CLASS%", "rescueNm")), rescue.normal, 'noTree');
        rescueVehicles(configTable.arrowRescue, rescue.normal + rescue.small + fire.activeRescue, 'rescueNm fumNested');
        calculateNextGrtw(configTable.arrowRescue, rescue.normal + rescue.small + fire.activeRescue, 'rescueNm fumNested');
    }

    if (seg.count > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'Schnelleinsatzgruppen (SEG)' + configTable.expand.replace("%CLASS%", "seg")), seg.count, 'noTree');
        tableExtension(`FÃ¼hrung`, configTable.arrowRescue, seg.activeLeader, seg.leader, seg.onBuildLeader, 'seg fumNested');
        tableExtension(`SanitÃ¤tsdienst`, configTable.arrowRescue, seg.activeSanD, seg.sanD, seg.onBuildSanD, 'seg fumNested');
        tableExtension(`Wasserrettungs-Erweiterung`, configTable.arrowRescue, seg.activeWr, seg.wr, seg.onBuildWr, 'seg fumNested');
        tableExtension(`Rettungshundestaffel`, configTable.arrowRescue, seg.activeRescueDogs, seg.rescueDogs, seg.onBuildRescueDogs, 'seg fumNested');
    }

    if (otherBuildings.wr > 0 || otherBuildings.activeWr > 0) {
        percentageMax(configTable.marginLeft.replace('%PLATZHALTER%', 'Wasserrettungswachen'), otherBuildings.activeWr, otherBuildings.wr + otherBuildings.activeWr, 'noTree');
    }

    if (otherBuildings.rescueDogs > 0 || otherBuildings.activeRescueDogs > 0) {
        percentageMax(configTable.marginLeft.replace('%PLATZHALTER%', 'Rettungshundestaffeln'), otherBuildings.activeRescueDogs, otherBuildings.rescueDogs + otherBuildings.activeRescueDogs, 'noTree');
    }

    if (rescue.helicopter > 0) {
        percentageMax(configTable.marginLeft.replace('%PLATZHALTER%', 'Rettungshubschrauber-Stationen' + configTable.expand.replace("%CLASS%", "rescueHeli")), rescue.activeHelicopter, rescue.helicopter, 'noTree');
        infoContentMax(`${ configTable.arrowRescue } Rettungshubschrauber (RTH)`, vehicles.rth, Math.floor(aBuildings.length / 25) > 4 ? Math.floor(aBuildings.length / 25) : 4, 'rescueHeli fumNested');
        calculateNextHeli(configTable.arrowRescue, "Rettungshubschrauber (RTH)", Math.floor(aBuildings.length / 25) > 4 ? Math.floor(aBuildings.length / 25) : 4, 'rescueHeli fumNested');
    }

    if (rescue.school > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'Rettungsdienstschulen' + configTable.expand.replace("%CLASS%", "rescueSchool")), rescue.school, 'noTree');
        tableExtension(`KlassenrÃ¤ume`, configTable.arrowRescue, rescue.classroom + rescue.school, rescue.school * 4, rescue.onBuildClassroom, 'rescueSchool fumNested');
    }

    if (police.small > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'Polizeiwachen (klein)' + configTable.expand.replace("%CLASS%", "polSm")), police.small, 'noTree');
        tableExtension(`Zellen`, configTable.arrowPolice, police.cellSmall, police.small * 2, police.onBuildCellSmall, 'polSm fumNested');
        infoContentOneValue(configTable.arrowPolice + " davon belegt", police.smallPrisoners, "polSm fumNested");
    }

    if (police.normal > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'Polizeiwachen' + configTable.expand.replace("%CLASS%", "polNm")), police.normal, 'noTree');
        tableExtension(`Zellen`, configTable.arrowPolice, police.cellNormal, police.normal * 10, police.onBuildCellNormal, 'polNm fumNested');
        infoContentOneValue(configTable.arrowPolice + " davon belegt", police.normalPrisoners, "polNm fumNested");
        tableExtension(`Diensthundestaffel`, configTable.arrowPolice, police.activeGuardDogs, police.guardDogs, police.onBuildGuardDogs, 'polNm fumNested');
        tableExtension(`Kriminalpolizei`, configTable.arrowPolice, police.activeCivil, police.civil, police.onBuildCivil, 'polNm fumNested');
    }

    if (bepo.count > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'Bereitschaftspolizei' + configTable.expand.replace("%CLASS%", "bepo")), bepo.count, 'noTree');
        tableExtension(`2. Zug der 1. Hundertschaft`, configTable.arrowPolice, bepo.activeDivision2, bepo.division2, bepo.onBuildDivision2, 'bepo fumNested');
        tableExtension(`3. Zug der 1. Hundertschaft`, configTable.arrowPolice, bepo.activeDivision3, bepo.division3, bepo.onBuildDivision3, 'bepo fumNested');
        tableExtension(`Sonderfahrzeug: Gefangenenkraftwagen`, configTable.arrowPolice, bepo.activeMobilePrison, bepo.mobilePrison, bepo.onBuildMobilePrison, 'bepo fumNested');
        tableExtension(`Technischer Zug: Wasserwerfer`, configTable.arrowPolice, bepo.activeWaterthrower, bepo.waterthrower, bepo.onBuildWaterthrower, 'bepo fumNested');
        tableExtension(`SEK: 1. Zug`, configTable.arrowPolice, bepo.activeSek1, bepo.sek1, bepo.onBuildSek1, 'bepo fumNested');
        tableExtension(`SEK: 2. Zug`, configTable.arrowPolice, bepo.activeSek2, bepo.sek2, bepo.onBuildSek2, 'bepo fumNested');
        tableExtension(`MEK: 1. Zug`, configTable.arrowPolice, bepo.activeMek1, bepo.mek1, bepo.onBuildMek1, 'bepo fumNested');
        tableExtension(`MEK: 2. Zug`, configTable.arrowPolice, bepo.activeMek2, bepo.mek2, bepo.onBuildMek2, 'bepo fumNested');
        tableExtension(`Diensthundestaffel`, configTable.arrowPolice, bepo.activeGuardDogs, bepo.guardDogs, bepo.onBuildGuardDogs, 'bepo fumNested');
    }

    if (polSonder.count > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'Polizei-Sondereinheiten' + configTable.expand.replace("%CLASS%", "polSonder")), polSonder.count, 'noTree');
        tableExtension(`SEK: 1. Zug`, configTable.arrowPolice, polSonder.activeSek1, polSonder.sek1, polSonder.onBuildSek1, 'polSonder fumNested');
        tableExtension(`SEK: 2. Zug`, configTable.arrowPolice, polSonder.activeSek2, polSonder.sek2, polSonder.onBuildSek2, 'polSonder fumNested');
        tableExtension(`MEK: 1. Zug`, configTable.arrowPolice, polSonder.activeMek1, polSonder.mek1, polSonder.onBuildMek1, 'polSonder fumNested');
        tableExtension(`MEK: 2. Zug`, configTable.arrowPolice, polSonder.activeMek2, polSonder.mek2, polSonder.onBuildMek2, 'polSonder fumNested');
        tableExtension(`Diensthundestaffel`, configTable.arrowPolice, polSonder.activeGuardDogs, polSonder.guardDogs, polSonder.onBuildGuardDogs, 'polSonder fumNested');
    }

    if (police.helicopter > 0) {
        percentageMax(configTable.marginLeft.replace('%PLATZHALTER%', 'Polizeihubschrauber-Stationen' + configTable.expand.replace("%CLASS%", "polHeli")), police.activeHelicopter, police.helicopter, 'noTree');
        infoContentMax(`${ configTable.arrowPolice } Polizeihubschrauber`, vehicles.polHeli, Math.floor(aBuildings.length / 25) > 4 ? Math.floor(aBuildings.length / 25) : 4, 'polHeli fumNested');
        tableExtension(`AuÃŸenlastbehÃ¤lter (allgemein)`, configTable.arrowPolice, police.activeWaterbin, police.waterbin, police.onBuildWaterbin, 'polHeli fumNested');
        calculateNextHeli(configTable.arrowPolice, "Polizeihubschrauber", Math.floor(aBuildings.length / 25) > 4 ? Math.floor(aBuildings.length / 25) : 4, 'polHeli fumNested');
    }

    if (police.school > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'Polizeischulen' + configTable.expand.replace("%CLASS%", "polSchool")), police.school, 'noTree');
        tableExtension(`KlassenrÃ¤ume`, configTable.arrowPolice, police.classroom + police.school, police.school * 4, police.onBuildClassroom, 'polSchool fumNested');
    }

    if (thw.count > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'THW OrtsverbÃ¤nde' + configTable.expand.replace("%CLASS%", "thw")), thw.count, 'noTree');
        tableExtension(`1. Technischer Zug: Bergungsgruppe 2`, configTable.arrowThw, thw.activeTz1Bg, thw.tz1Bg, thw.onBuildTz1Bg, 'thw fumNested');
        tableExtension(`1. Technischer Zug: Zugtrupp`, configTable.arrowThw, thw.activeTz1Zug, thw.tz1Zug, thw.onBuildTz1Zug, 'thw fumNested');
        tableExtension(`Fachgruppe RÃ¤umen`, configTable.arrowThw, thw.activeFgrR, thw.fgrR, thw.onBuildFgrR, 'thw fumNested');
        tableExtension(`Fachgruppe Wassergefahren`, configTable.arrowThw, thw.activeFgrW, thw.fgrW, thw.onBuildFgrW, 'thw fumNested');
        tableExtension(`2. Technischer Zug: Grundvoraussetzungen`, configTable.arrowThw, thw.activeTz2Grund, thw.tz2Grund, thw.onBuildTz2Grund, 'thw fumNested');
        tableExtension(`2. Technischer Zug: Bergungsgruppe 2`, configTable.arrowThw, thw.activeTz2Bg, thw.tz2Bg, thw.onBuildTz2Bg, 'thw fumNested');
        tableExtension(`2. Technischer Zug: Zugtrupp`, configTable.arrowThw, thw.activeTz2Zug, thw.tz2Zug, thw.onBuildTz2Zug, 'thw fumNested');
        tableExtension(`Fachgruppe Ortung`, configTable.arrowThw, thw.activeFgrO, thw.fgrO, thw.onBuildFgrO, 'thw fumNested');
        tableExtension(`Fachgruppe Wasserschaden/Pumpen`, configTable.arrowThw, thw.activeFgrWP, thw.fgrWP, thw.onBuildFgrWP, 'thw fumNested');
    }

    if (thw.school > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'THW Bundesschulen' + configTable.expand.replace("%CLASS%", "thwSchool")), thw.school, 'noTree');
        tableExtension(`KlassenrÃ¤ume`, configTable.arrowThw, thw.classroom + thw.school, thw.school * 4, thw.onBuildClassroom, 'thwSchool fumNested');
    }

    if (hospitals.count > 0) {
        percentage(configTable.marginLeft.replace('%PLATZHALTER%', 'KrankenhÃ¤user' + configTable.expand.replace("%CLASS%", "hospital")), hospitals.count, 'noTree');
        infoContentMax(`${ configTable.arrowHospital } Betten`, hospitals.beds + (hospitals.count * 10), hospitals.count * 30, 'hospital fumNested');
        infoContentOneValue(configTable.arrowHospital + " davon belegt", hospitals.patients, "hospital fumNested");
        tableExtension(`Allgemeine Innere`, configTable.arrowHospital, hospitals.ina, hospitals.count, hospitals.onBuildIna, 'hospital fumNested');
        tableExtension(`Allgemeine Chirurgie`, configTable.arrowHospital, hospitals.ach, hospitals.count, hospitals.onBuildAch, 'hospital fumNested');
        tableExtension(`GynÃ¤kologie`, configTable.arrowHospital, hospitals.gyn, hospitals.count, hospitals.onBuildGyn, 'hospital fumNested');
        tableExtension(`Urologie`, configTable.arrowHospital, hospitals.uro, hospitals.count, hospitals.onBuildUro, 'hospital fumNested');
        tableExtension(`Unfallchirurgie`, configTable.arrowHospital, hospitals.uch, hospitals.count, hospitals.onBuildUch, 'hospital fumNested');
        tableExtension(`Neurologie`, configTable.arrowHospital, hospitals.nrl, hospitals.count, hospitals.onBuildNrl, 'hospital fumNested');
        tableExtension(`Neurochirurgie`, configTable.arrowHospital, hospitals.nch, hospitals.count, hospitals.onBuildNch, 'hospital fumNested');
        tableExtension(`Kardiologie`, configTable.arrowHospital, hospitals.kar, hospitals.count, hospitals.onBuildKar, 'hospital fumNested');
        tableExtension(`Kardiochirurgie`, configTable.arrowHospital, hospitals.kch, hospitals.count, hospitals.onBuildKch, 'hospital fumNested');
    }

    userInfos += `</tbody></table>`;

    $('#tableStatusBody').html(userInfos);
}
