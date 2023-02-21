setInterval(async function() {
    await getVehiclesApi();
}, 5 * 1000 * 60);

let radioMessageOrig = radioMessage;
radioMessage = e => {
    radioMessageOrig(e);
    if (e.user_id == user_id) {
        for (let i in aVehicles) {
            if (aVehicles[i].id == e.id) {
                aVehicles[i].fms_real = e.fms_real;
                aVehicles[i].fms = e.fms;
                switch (e.fms_real) {
                    case 1:
                    case 7:
                        aVehicles[i].target_id = e.target_building_id;
                        break;
                    case 2:
                    case 6:
                        aVehicles[i].target_id = null;
                        break;
                    case 3:
                    case 4:
                        aVehicles[i].target_id = e.mission_id;
                        break;
                }
                break;
            }
        }
    }
}
