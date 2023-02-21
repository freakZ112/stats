$("body")
    .prepend(`<div class="modal fade"
                     id="tableStatus"
                     tabindex="-1"
                     role="dialog"
                     aria-labelledby="exampleModalLabel"
                     aria-hidden="true"
                >
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                             <div class="pull-left">
                              <h5>Fuhrpark-Manager</h5>
                             </div>
                             <button type="button"
                                        class="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                             <div class="pull-right" style="padding-top:2.5em">
                              <select id="filterDispatchCenter" class="custom-select" style="width:15em">
                               <option selected>wird geladen ...</option>
                              </select><br>
                              <select id="filterType" class="custom-select" style="width:15em">
                               <option selected>wird geladen ...</option>
                              </select><br>
                              <select id="sortBy" class="custom-select" style="width:15em">
                               <option selected>unsortiert</option>
                              </select>
                             </div>
                              <div class="pull-left">
                               <div class="btn-group btn-group-xs" role="group" aria-label="Small button group" style="display:flex">
                                <a id="fms1" class="btn btn-info btn-xs" style="flex:1">Status 1</a>
                                <a id="fms2" class="btn btn-info btn-xs" style="flex:1">Status 2</a>
                                <a id="fms3" class="btn btn-info btn-xs" style="flex:1">Status 3</a>
                                <a id="fms4" class="btn btn-info btn-xs" style="flex:1">Status 4</a>
                                <a id="fms5" class="btn btn-info btn-xs" style="flex:1">Status 5</a>
                                <a id="fms6" class="btn btn-info btn-xs" style="flex:1">Status 6</a>
                                <a id="fms7" class="btn btn-info btn-xs" style="flex:1">Status 7</a>
                                <a id="fms9" class="btn btn-info btn-xs" style="flex:1">Status 9</a>
                                <a id="complete" class="btn btn-warning btn-xs" style="flex:1">alle Fahrzeuge</a>
                                <a id="player" class="btn btn-default btn-xs" style="flex:1">Spielerinfos</a>
                               </div>
                               <div class="btn-group btn-group-xs" role="group" aria-label="Small button group" style="display:flex">
                                <a id="filterFw" class="btn btn-success btn-xs" style="flex:1">Feuerwehr</a>
                                <a id="filterRd" class="btn btn-success btn-xs" style="flex:1">Rettungsdienst</a>
                                <a id="filterThw" class="btn btn-success btn-xs" style="flex:1">THW</a>
                                <a id="filterPol" class="btn btn-success btn-xs" style="flex:1">Polizei</a>
                                <a id="filterWr" class="btn btn-success btn-xs" style="flex:1">Wasserrettung</a>
                                <a id="filterHeli" class="btn btn-success btn-xs" style="flex:1">Hubschrauber</a>
                                <a id="filterBp" class="btn btn-success btn-xs" style="flex:1">BePo/Pol-Sonder</a>
                                <a id="filterSeg" class="btn btn-success btn-xs" style="flex:1">SEG/RHS</a>
                               </div>
                             </div>
                                <h5 class="modal-title" id="tableStatusLabel">
                                </h5>
                            </div>
                            <div class="modal-body" id="tableStatusBody"></div>
                            <div class="modal-footer">
                             <div class="pull-left">
                                v ${ fum_version } - ${ fum_build } - ${ fum_url.includes("localhost") ? "dev" : "stable" }
                             </div>
                             <div class="btn-group pull-right">
                                <a class="btn btn-success" id="btnSettingsFuM" title="Einstellungen"><div class="glyphicon glyphicon-cog" style="color:LightSteelBlue"></div></a>
                                <button type="button"
                                        id="tableStatusCloseButton"
                                        class="btn btn-danger"
                                        data-dismiss="modal"
                                >
                                    SchlieÃŸen
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>`);

for (var i = 0; i < fum_options.dropdown.sort.length; i++) {
    $('#sortBy').append(`<option value="${ fum_options.dropdown.sort[i] }">${ fum_options.dropdown.sort[i] }</option>`);
}

$("#navbar_profile_link")
    .parent()
    .after(`<li role="presentation"><a style="cursor:pointer" id="vehicleManagement" data-toggle="modal" data-target="#tableStatus" ><img class="icon icons8-Share" src="${ fum_url }/stats/main/RTW_Icon_Furpark.png" width="24" height="24"> Fuhrpark-Manager</a>
    </li>`);
