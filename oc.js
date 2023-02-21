$("body").on("click", "#vehicleManagement", async function() {
    await $.getScript(`${ fum_url }/stats/main/ve_tab.js?${ fum_datestring }`); 
    $('#filterDispatchCenter').html(`<option selected>wird geladen ...</option>`);
    $('#filterType').html(`<option selected>wird geladen ...</option>`);
    $('#tableStatusLabel').html('');
    $('#tableStatusBody').html(greetings());
    fum_options.status.count = 0;
    fum_database.buildings.get.typeId.length = 0;
    fum_database.buildings.get.name.length = 0;
    fum_database.buildings.get.onDispatchCenter.length = 0;
    $('#fms1').removeClass().addClass(fum_btn.i);
    $('#fms2').removeClass().addClass(fum_btn.i);
    $('#fms3').removeClass().addClass(fum_btn.i);
    $('#fms4').removeClass().addClass(fum_btn.i);
    $('#fms5').removeClass().addClass(fum_btn.i);
    $('#fms6').removeClass().addClass(fum_btn.i);
    $('#fms7').removeClass().addClass(fum_btn.i);
    $('#fms9').removeClass().addClass(fum_btn.i);
    $('#complete').removeClass().addClass(fum_btn.w);
    apiDropdown();
});

$("body").on("click", "#tableStatusBody span", function() {
    if ($(this)[0].className == "building_list_fms building_list_fms_6") {
        $.get('/vehicles/' + $(this)[0].id.replace('tableFms_', '') + '/set_fms/2');
        $(this).toggleClass("building_list_fms_6 building_list_fms_2");
        $(this).text("2");
    } else if ($(this)[0].className == "building_list_fms building_list_fms_2") {
        $.get('/vehicles/' + $(this)[0].id.replace('tableFms_', '') + '/set_fms/6');
        $(this).toggleClass("building_list_fms_6 building_list_fms_2");
        $(this).text("6");
    }
});

$("body").on("click", "span.treeView", function() {
    var $this = $(this);
    var key;
    if ($this.hasClass("glyphicon-plus-sign")) {
        $this.removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
        for (key of $this[0].classList) {
            if ($("tr." + key).length) $("tr." + key).addClass("fumActive");
        }
    } else if ($this.hasClass("glyphicon-minus-sign")) {
        $this.removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
        for (key of $this[0].classList) {
            if ($("tr." + key).length) $("tr." + key).removeClass("fumActive");
        }
    }
});

$("body").on("click", "#filterDispatchCenter", function() {
    fum_options.dropdown.dispatchCenter.id = parseInt($('#filterDispatchCenter').val());
    if (fum_options.status.count > 0) createTable(fum_options.status.count);
});

$("body").on("click", "#filterType", function() {
    fum_options.dropdown.vehicles.type = parseInt($('#filterType').val());
    fum_options.dropdown.vehicles.ownClass = $('#filterType').find(':selected').data('vehicle');
    if (fum_options.status.count !== 0) createTable(fum_options.status.count);
});

$("body").on("click", "#sortBy", function() {
    if (fum_options.status.count !== 0) createTable(fum_options.status.count);
});

$("body").on("click", "#btnSettingsFuM", function() {
    $('#fms1').removeClass().addClass(fum_btn.i);
    $('#fms2').removeClass().addClass(fum_btn.i);
    $('#fms3').removeClass().addClass(fum_btn.i);
    $('#fms4').removeClass().addClass(fum_btn.i);
    $('#fms5').removeClass().addClass(fum_btn.i);
    $('#fms6').removeClass().addClass(fum_btn.i);
    $('#fms7').removeClass().addClass(fum_btn.i);
    $('#fms9').removeClass().addClass(fum_btn.i);
    $('#complete').removeClass().addClass(fum_btn.w);
    $('#tableStatusLabel').html('');
    $('#tableStatusBody')
        .html(`<h5>Einstellungen</h5>
                   <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="cbxOnBuild" ${ fum_options.general.showOnBuild ? 'checked' : '' }>
                     <label class="form-check-label" for="cbxOnBuild">
                       Zeige Erweiterungen im Ausbau
                     </label>
                   </div>
                   <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="cbxWork" ${ fum_options.general.showWork ? 'checked' : '' }>
                     <label class="form-check-label" for="cbxWork">
                       Zeige Dienstzeiten in der Fahrzeugtabelle
                     </label>
                   </div>
                   <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="cbxDelay" ${ fum_options.general.showDelay ? 'checked' : '' }>
                     <label class="form-check-label" for="cbxDelay">
                       Zeige AusrÃ¼ckverzÃ¶gerung in der Fahrzeugtabelle
                     </label>
                   </div>
                   <br>Nach dem Speichern der Einstellungen wird die Seite neu geladen.<br>
                   <a class="btn btn-success" id="btnSavePreferencesFuM">Speichern</a>`);
});

$("body").on("click", "#btnSavePreferencesFuM", function() {
    var save = {};

    save.build = $('#cbxOnBuild')[0].checked;
    save.work = $('#cbxWork')[0].checked;
    save.delay = $('#cbxDelay')[0].checked;

    localStorage.fum_options = JSON.stringify({ "showOnBuild": save.build, "showWork": save.work, "showDelay": save.delay });

    window.location.reload();
});

$("body").on("click", "#filterFw", function() {

    fum_options.filter.fire.counter++;

    if (fum_options.filter.fire.counter === 1) {
        fum_options.filter.fire.timer = setTimeout(function() {
            fum_options.filter.fire.status = !fum_options.filter.fire.status;
            $('#filterFw').toggleClass("btn-success btn-danger");
            if (fum_options.status.count !== 0) createTable(fum_options.status.count);
            fum_options.filter.fire.counter = 0;
        }, fum_options.filter.delay);
    } else {
        clearTimeout(fum_options.filter.fire.timer);
        fum_options.filter.fire.status = true;
        $('#filterFw').removeClass().addClass(fum_btn.s);
        fum_options.filter.rescue.status = false;
        $('#filterRd').removeClass().addClass(fum_btn.d);
        fum_options.filter.thw.status = false;
        $('#filterThw').removeClass().addClass(fum_btn.d);
        fum_options.filter.police.status = false;
        $('#filterPol').removeClass().addClass(fum_btn.d);
        fum_options.filter.wr.status = false;
        $('#filterWr').removeClass().addClass(fum_btn.d);
        fum_options.filter.helicopter.status = false;
        $('#filterHeli').removeClass().addClass(fum_btn.d);
        fum_options.filter.bepo.status = false;
        $('#filterBp').removeClass().addClass(fum_btn.d);
        fum_options.filter.seg.status = false;
        $('#filterSeg').removeClass().addClass(fum_btn.d);
        fum_options.filter.fire.counter = 0;
        if (fum_options.status.count !== 0) createTable(fum_options.status.count);
    }
});

$("body").on("click", "#filterRd", function() {

    fum_options.filter.rescue.counter++;

    if (fum_options.filter.rescue.counter === 1) {
        fum_options.filter.rescue.timer = setTimeout(function() {
            fum_options.filter.rescue.status = !fum_options.filter.rescue.status;
            $('#filterRd').toggleClass("btn-success btn-danger");
            if (fum_options.status.count !== 0) createTable(fum_options.status.count);
            fum_options.filter.rescue.counter = 0;
        }, fum_options.filter.delay);
    } else {
        clearTimeout(fum_options.filter.rescue.timer);
        fum_options.filter.fire.status = false;
        $('#filterFw').removeClass().addClass(fum_btn.d);
        fum_options.filter.rescue.status = true;
        $('#filterRd').removeClass().addClass(fum_btn.s);
        fum_options.filter.thw.status = false;
        $('#filterThw').removeClass().addClass(fum_btn.d);
        fum_options.filter.police.status = false;
        $('#filterPol').removeClass().addClass(fum_btn.d);
        fum_options.filter.wr.status = false;
        $('#filterWr').removeClass().addClass(fum_btn.d);
        fum_options.filter.helicopter.status = false;
        $('#filterHeli').removeClass().addClass(fum_btn.d);
        fum_options.filter.bepo.status = false;
        $('#filterBp').removeClass().addClass(fum_btn.d);
        fum_options.filter.seg.status = false;
        $('#filterSeg').removeClass().addClass(fum_btn.d);
        fum_options.filter.rescue.counter = 0;
        if (fum_options.status.count !== 0) createTable(fum_options.status.count);
    }
});

$("body").on("click", "#filterThw", function() {

    fum_options.filter.thw.counter++;

    if (fum_options.filter.thw.counter === 1) {
        fum_options.filter.thw.timer = setTimeout(function() {
            fum_options.filter.thw.status = !fum_options.filter.thw.status;
            $('#filterThw').toggleClass("btn-success btn-danger");
            if (fum_options.status.count !== 0) createTable(fum_options.status.count);
            fum_options.filter.thw.counter = 0;
        }, fum_options.filter.delay);
    } else {
        clearTimeout(fum_options.filter.thw.timer);
        fum_options.filter.fire.status = false;
        $('#filterFw').removeClass().addClass(fum_btn.d);
        fum_options.filter.rescue.status = false;
        $('#filterRd').removeClass().addClass(fum_btn.d);
        fum_options.filter.thw.status = true;
        $('#filterThw').removeClass().addClass(fum_btn.s);
        fum_options.filter.police.status = false;
        $('#filterPol').removeClass().addClass(fum_btn.d);
        fum_options.filter.wr.status = false;
        $('#filterWr').removeClass().addClass(fum_btn.d);
        fum_options.filter.helicopter.status = false;
        $('#filterHeli').removeClass().addClass(fum_btn.d);
        fum_options.filter.bepo.status = false;
        $('#filterBp').removeClass().addClass(fum_btn.d);
        fum_options.filter.seg.status = false;
        $('#filterSeg').removeClass().addClass(fum_btn.d);
        fum_options.filter.thw.counter = 0;
        if (fum_options.status.count !== 0) createTable(fum_options.status.count);
    }
});

$("body").on("click", "#filterPol", function() {

    fum_options.filter.police.counter++;

    if (fum_options.filter.police.counter === 1) {
        fum_options.filter.police.timer = setTimeout(function() {
            fum_options.filter.police.status = !fum_options.filter.police.status;
            $('#filterPol').toggleClass("btn-success btn-danger");
            if (fum_options.status.count !== 0) createTable(fum_options.status.count);
            fum_options.filter.police.counter = 0;
        }, fum_options.filter.delay);
    } else {
        clearTimeout(fum_options.filter.police.timer);
        fum_options.filter.fire.status = false;
        $('#filterFw').removeClass().addClass(fum_btn.d);
        fum_options.filter.rescue.status = false;
        $('#filterRd').removeClass().addClass(fum_btn.d);
        fum_options.filter.thw.status = false;
        $('#filterThw').removeClass().addClass(fum_btn.d);
        fum_options.filter.police.status = true;
        $('#filterPol').removeClass().addClass(fum_btn.s);
        fum_options.filter.wr.status = false;
        $('#filterWr').removeClass().addClass(fum_btn.d);
        fum_options.filter.helicopter.status = false;
        $('#filterHeli').removeClass().addClass(fum_btn.d);
        fum_options.filter.bepo.status = false;
        $('#filterBp').removeClass().addClass(fum_btn.d);
        fum_options.filter.seg.status = false;
        $('#filterSeg').removeClass().addClass(fum_btn.d);
        fum_options.filter.police.counter = 0;
        if (fum_options.status.count !== 0) createTable(fum_options.status.count);
    }
});

$("body").on("click", "#filterWr", function() {

    fum_options.filter.wr.counter++;

    if (fum_options.filter.wr.counter === 1) {
        fum_options.filter.wr.timer = setTimeout(function() {
            fum_options.filter.wr.status = !fum_options.filter.wr.status;
            $('#filterWr').toggleClass("btn-success btn-danger");
            if (fum_options.status.count !== 0) createTable(fum_options.status.count);
            fum_options.filter.wr.counter = 0;
        }, fum_options.filter.delay);
    } else {
        clearTimeout(fum_options.filter.wr.timer);
        fum_options.filter.fire.status = false;
        $('#filterFw').removeClass().addClass(fum_btn.d);
        fum_options.filter.rescue.status = false;
        $('#filterRd').removeClass().addClass(fum_btn.d);
        fum_options.filter.thw.status = false;
        $('#filterThw').removeClass().addClass(fum_btn.d);
        fum_options.filter.police.status = false;
        $('#filterPol').removeClass().addClass(fum_btn.d);
        fum_options.filter.wr.status = true;
        $('#filterWr').removeClass().addClass(fum_btn.s);
        fum_options.filter.helicopter.status = false;
        $('#filterHeli').removeClass().addClass(fum_btn.d);
        fum_options.filter.bepo.status = false;
        $('#filterBp').removeClass().addClass(fum_btn.d);
        fum_options.filter.seg.status = false;
        $('#filterSeg').removeClass().addClass(fum_btn.d);
        fum_options.filter.wr.counter = 0;
        if (fum_options.status.count !== 0) createTable(fum_options.status.count);
    }
});

$("body").on("click", "#filterHeli", function() {

    fum_options.filter.helicopter.counter++;

    if (fum_options.filter.helicopter.counter === 1) {
        fum_options.filter.helicopter.timer = setTimeout(function() {
            fum_options.filter.helicopter.status = !fum_options.filter.helicopter.status;
            $('#filterHeli').toggleClass("btn-success btn-danger");
            if (fum_options.status.count !== 0) createTable(fum_options.status.count);
            fum_options.filter.helicopter.counter = 0;
        }, fum_options.filter.delay);
    } else {
        clearTimeout(fum_options.filter.helicopter.timer);
        fum_options.filter.fire.status = false;
        $('#filterFw').removeClass().addClass(fum_btn.d);
        fum_options.filter.rescue.status = false;
        $('#filterRd').removeClass().addClass(fum_btn.d);
        fum_options.filter.thw.status = false;
        $('#filterThw').removeClass().addClass(fum_btn.d);
        fum_options.filter.police.status = false;
        $('#filterPol').removeClass().addClass(fum_btn.d);
        fum_options.filter.wr.status = false;
        $('#filterWr').removeClass().addClass(fum_btn.d);
        fum_options.filter.helicopter.status = true;
        $('#filterHeli').removeClass().addClass(fum_btn.s);
        fum_options.filter.bepo.status = false;
        $('#filterBp').removeClass().addClass(fum_btn.d);
        fum_options.filter.seg.status = false;
        $('#filterSeg').removeClass().addClass(fum_btn.d);
        fum_options.filter.helicopter.counter = 0;
        if (fum_options.status.count !== 0) createTable(fum_options.status.count);
    }
});

$("body").on("click", "#filterBp", function() {

    fum_options.filter.bepo.counter++;

    if (fum_options.filter.bepo.counter === 1) {
        fum_options.filter.bepo.timer = setTimeout(function() {
            fum_options.filter.bepo.status = !fum_options.filter.bepo.status;
            $('#filterBp').toggleClass("btn-success btn-danger");
            if (fum_options.status.count !== 0) createTable(fum_options.status.count);
            fum_options.filter.bepo.counter = 0;
        }, fum_options.filter.delay);
    } else {
        clearTimeout(fum_options.filter.bepo.timer);
        fum_options.filter.fire.status = false;
        $('#filterFw').removeClass().addClass(fum_btn.d);
        fum_options.filter.rescue.status = false;
        $('#filterRd').removeClass().addClass(fum_btn.d);
        fum_options.filter.thw.status = false;
        $('#filterThw').removeClass().addClass(fum_btn.d);
        fum_options.filter.police.status = false;
        $('#filterPol').removeClass().addClass(fum_btn.d);
        fum_options.filter.wr.status = false;
        $('#filterWr').removeClass().addClass(fum_btn.d);
        fum_options.filter.helicopter.status = false;
        $('#filterHeli').removeClass().addClass(fum_btn.d);
        fum_options.filter.bepo.status = true;
        $('#filterBp').removeClass().addClass(fum_btn.s);
        fum_options.filter.seg.status = false;
        $('#filterSeg').removeClass().addClass(fum_btn.d);
        fum_options.filter.bepo.counter = 0;
        if (fum_options.status.count !== 0) createTable(fum_options.status.count);
    }
});

$("body").on("click", "#filterSeg", function() {

    fum_options.filter.seg.counter++;

    if (fum_options.filter.seg.counter === 1) {
        fum_options.filter.seg.timer = setTimeout(function() {
            fum_options.filter.seg.status = !fum_options.filter.seg.status;
            $('#filterSeg').toggleClass("btn-success btn-danger");
            if (fum_options.status.count !== 0) createTable(fum_options.status.count);
            fum_options.filter.seg.counter = 0;
        }, fum_options.filter.delay);
    } else {
        clearTimeout(fum_options.filter.seg.timer);
        fum_options.filter.fire.status = false;
        $('#filterFw').removeClass().addClass(fum_btn.d);
        fum_options.filter.rescue.status = false;
        $('#filterRd').removeClass().addClass(fum_btn.d);
        fum_options.filter.thw.status = false;
        $('#filterThw').removeClass().addClass(fum_btn.d);
        fum_options.filter.police.status = false;
        $('#filterPol').removeClass().addClass(fum_btn.d);
        fum_options.filter.wr.status = false;
        $('#filterWr').removeClass().addClass(fum_btn.d);
        fum_options.filter.helicopter.status = false;
        $('#filterHeli').removeClass().addClass(fum_btn.d);
        fum_options.filter.bepo.status = false;
        $('#filterBp').removeClass().addClass(fum_btn.d);
        fum_options.filter.seg.status = true;
        $('#filterSeg').removeClass().addClass(fum_btn.s);
        fum_options.filter.seg.counter = 0;
        if (fum_options.status.count !== 0) createTable(fum_options.status.count);
    }
});

$("body").on("click", "#player", async function() {
    await $.getScript(`${ fum_url }/stats/main/p_infos.js?${ fum_datestring }`);
    fum_options.status.count = 0;
    $('#fms1').removeClass().addClass(fum_btn.i);
    $('#fms2').removeClass().addClass(fum_btn.i);
    $('#fms3').removeClass().addClass(fum_btn.i);
    $('#fms4').removeClass().addClass(fum_btn.i);
    $('#fms5').removeClass().addClass(fum_btn.i);
    $('#fms6').removeClass().addClass(fum_btn.i);
    $('#fms7').removeClass().addClass(fum_btn.i);
    $('#fms9').removeClass().addClass(fum_btn.i);
    $('#complete').removeClass().addClass(fum_btn.w);
    playerInfos();
});

$("body").on("click", "#complete", function() {
    fum_options.status.count = "1 bis 9";
    $('#fms1').removeClass().addClass(fum_btn.i);
    $('#fms2').removeClass().addClass(fum_btn.i);
    $('#fms3').removeClass().addClass(fum_btn.i);
    $('#fms4').removeClass().addClass(fum_btn.i);
    $('#fms5').removeClass().addClass(fum_btn.i);
    $('#fms6').removeClass().addClass(fum_btn.i);
    $('#fms7').removeClass().addClass(fum_btn.i);
    $('#fms9').removeClass().addClass(fum_btn.i);
    $('#complete').removeClass().addClass(fum_btn.s);
    createTable(fum_options.status.count);
});

$("body").on("click", "#fms1", function() {
    fum_options.status.count = 1;
    $('#fms1').removeClass().addClass(fum_btn.s);
    $('#fms2').removeClass().addClass(fum_btn.i);
    $('#fms3').removeClass().addClass(fum_btn.i);
    $('#fms4').removeClass().addClass(fum_btn.i);
    $('#fms5').removeClass().addClass(fum_btn.i);
    $('#fms6').removeClass().addClass(fum_btn.i);
    $('#fms7').removeClass().addClass(fum_btn.i);
    $('#fms9').removeClass().addClass(fum_btn.i);
    $('#complete').removeClass().addClass(fum_btn.w);
    createTable(fum_options.status.count);
});

$("body").on("click", "#fms2", function() {
    fum_options.status.count = 2;
    $('#fms1').removeClass().addClass(fum_btn.i);
    $('#fms2').removeClass().addClass(fum_btn.s);
    $('#fms3').removeClass().addClass(fum_btn.i);
    $('#fms4').removeClass().addClass(fum_btn.i);
    $('#fms5').removeClass().addClass(fum_btn.i);
    $('#fms6').removeClass().addClass(fum_btn.i);
    $('#fms7').removeClass().addClass(fum_btn.i);
    $('#fms9').removeClass().addClass(fum_btn.i);
    $('#complete').removeClass().addClass(fum_btn.w);
    createTable(fum_options.status.count);
});

$("body").on("click", "#fms3", function() {
    fum_options.status.count = 3;
    $('#fms1').removeClass().addClass(fum_btn.i);
    $('#fms2').removeClass().addClass(fum_btn.i);
    $('#fms3').removeClass().addClass(fum_btn.s);
    $('#fms4').removeClass().addClass(fum_btn.i);
    $('#fms5').removeClass().addClass(fum_btn.i);
    $('#fms6').removeClass().addClass(fum_btn.i);
    $('#fms7').removeClass().addClass(fum_btn.i);
    $('#fms9').removeClass().addClass(fum_btn.i);
    $('#complete').removeClass().addClass(fum_btn.w);
    createTable(fum_options.status.count);
});

$("body").on("click", "#fms4", function() {
    fum_options.status.count = 4;
    $('#fms1').removeClass().addClass(fum_btn.i);
    $('#fms2').removeClass().addClass(fum_btn.i);
    $('#fms3').removeClass().addClass(fum_btn.i);
    $('#fms4').removeClass().addClass(fum_btn.s);
    $('#fms5').removeClass().addClass(fum_btn.i);
    $('#fms6').removeClass().addClass(fum_btn.i);
    $('#fms7').removeClass().addClass(fum_btn.i);
    $('#fms9').removeClass().addClass(fum_btn.i);
    $('#complete').removeClass().addClass(fum_btn.w);
    createTable(fum_options.status.count);
});

$("body").on("click", "#fms5", function() {
    fum_options.status.count = 5;
    $('#fms1').removeClass().addClass(fum_btn.i);
    $('#fms2').removeClass().addClass(fum_btn.i);
    $('#fms3').removeClass().addClass(fum_btn.i);
    $('#fms4').removeClass().addClass(fum_btn.i);
    $('#fms5').removeClass().addClass(fum_btn.s);
    $('#fms6').removeClass().addClass(fum_btn.i);
    $('#fms7').removeClass().addClass(fum_btn.i);
    $('#fms9').removeClass().addClass(fum_btn.i);
    $('#complete').removeClass().addClass(fum_btn.w);
    createTable(fum_options.status.count);
});

$("body").on("click", "#fms6", function() {
    fum_options.status.count = 6;
    $('#fms1').removeClass().addClass(fum_btn.i);
    $('#fms2').removeClass().addClass(fum_btn.i);
    $('#fms3').removeClass().addClass(fum_btn.i);
    $('#fms4').removeClass().addClass(fum_btn.i);
    $('#fms5').removeClass().addClass(fum_btn.i);
    $('#fms6').removeClass().addClass(fum_btn.s);
    $('#fms7').removeClass().addClass(fum_btn.i);
    $('#fms9').removeClass().addClass(fum_btn.i);
    $('#complete').removeClass().addClass(fum_btn.w);
    createTable(fum_options.status.count);
});

$("body").on("click", "#fms7", function() {
    fum_options.status.count = 7;
    $('#fms1').removeClass().addClass(fum_btn.i);
    $('#fms2').removeClass().addClass(fum_btn.i);
    $('#fms3').removeClass().addClass(fum_btn.i);
    $('#fms4').removeClass().addClass(fum_btn.i);
    $('#fms5').removeClass().addClass(fum_btn.i);
    $('#fms6').removeClass().addClass(fum_btn.i);
    $('#fms7').removeClass().addClass(fum_btn.s);
    $('#fms9').removeClass().addClass(fum_btn.i);
    $('#complete').removeClass().addClass(fum_btn.w);
    createTable(fum_options.status.count);
});

$("body").on("click", "#fms9", function() {
    fum_options.status.count = 9;
    $('#fms1').removeClass().addClass(fum_btn.i);
    $('#fms2').removeClass().addClass(fum_btn.i);
    $('#fms3').removeClass().addClass(fum_btn.i);
    $('#fms4').removeClass().addClass(fum_btn.i);
    $('#fms5').removeClass().addClass(fum_btn.i);
    $('#fms6').removeClass().addClass(fum_btn.i);
    $('#fms7').removeClass().addClass(fum_btn.i);
    $('#fms9').removeClass().addClass(fum_btn.s);
    $('#complete').removeClass().addClass(fum_btn.w);
    createTable(fum_options.status.count);
});
