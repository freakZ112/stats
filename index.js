const fum_url = "https://raw.githubusercontent.com/freakZ112", /* live */
    fum_datestring = new Date().getTime();

var aVehicleTypesNew = aVehicleTypesNew || [];

(async function () {

    await $.getScript(`${ fum_url }/stats/main/var_func.js?${ fum_datestring }`);

    const securityCheck = await checkUserId(user_id);

    if (securityCheck.locked === true) {
        alert(`Hallo ${ securityCheck.name },\nDu darfst mein Script nicht nutzen!`);
        window.location.reload;
        return false;
    }

    // temporÃ¤re Nachricht an Nutzer
    if (!sessionStorage.msg_traxx) {
        $("body")
            .prepend(`<div class="modal modal_fum" tabindex="-1" role="dialog" style="display:block !important">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Wichtige Mitteilung zum Fuhrpark-Manager</h5>
                                    <button type="button" class="close" onclick="$('.modal_fum').remove()" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p>Lieber ${ user_name }</p>
                                    <br>
                                    <p>Wie du sicherlich schon mitbekommen hast, ist mir aktuell der Support meines Scripts nicht mehr mÃ¶glich, da mein Account im Spiel, so wie im Forum gebannt wurde.</p>
                                    <p>Leider Ã¤uÃŸert sich der Support des Spiels nicht zu den UmstÃ¤nden des Banns, auf welchem Wege ich es auch versuche.</p>
                                    <p>Aus diesem Grund stelle ich aktuell den Support aller meiner Scripts bis auf weiteres ein.</p>
                                    <p>Sollte mich der Support bis Ende diesen Monats weiter ignorieren, werde ich auch die Funktion aller meiner Scripts einstellen.</p>
                                    <p>Ich bitte um Dein VerstÃ¤ndnis und hoffe, dass sich bald alles aufklÃ¤rt, so dass ich wie gewohnt weiter supporten und entwickeln kann.</p>
                                    <p>Bis dahin stehe ich  Dir gern unter support@drtraxx.de zur VerfÃ¼gung.</p>
                                    <br>
                                    <p>Liebe GrÃ¼ÃŸe</p>
                                    <p>DrTraxx</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" onclick="$('.modal_fum').remove()">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>`);
        sessionStorage.msg_traxx = "message shown";
    }

    if (aVehicleTypesNew.length === 0) {
        if (!localStorage.aVehicleTypesNew || JSON.parse(localStorage.aVehicleTypesNew).lastUpdate < (new Date().getTime() - 5 * 1000 * 60)) {
            await $.getJSON("https://raw.githubusercontent.com/freakZ112/vehicletypes/main/vehicletypes.json").done(data => localStorage.setItem('aVehicleTypesNew', JSON.stringify({ lastUpdate: new Date().getTime(), value: data }))); // hier kann man auch meine json einfügen
			        }
        aVehicleTypesNew = JSON.parse(localStorage.aVehicleTypesNew).value;
    }

    if (aVehicles.length === 0) {
        getVehiclesApi();
    }

    if (aBuildings.length === 0) {
        aBuildings = await getApi("buildings");
    }

    if (aCredits.length === 0) {
        aCredits = await getApi("credits");
    }

    $('head').append(`<link rel="stylesheet" href="${ fum_url }/stats/main/main.css?${ new Date().getTime() }" type="text/css" />`);

    await $.getScript(`${ fum_url }/stats/main/modal.js?${ fum_datestring }`); 
    await $.getScript(`${ fum_url }/stats/main/ini_fun.js?${ fum_datestring }`);  
    await $.getScript(`${ fum_url }/stats/main/oc.js?${ fum_datestring }`);
})();
