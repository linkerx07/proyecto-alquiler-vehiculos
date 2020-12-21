function onVehiculos() {
    //set variables para contenido
    let Vistas = document.getElementById("Vistas");
    Vistas.innerHTML = "";
    titlePage = document.getElementById("titlePage");

    axios.get("/vehiculos", {}).then(
        (response) => {
            // console.log(response.data);
            Vistas.innerHTML = Inner_getVehiculos(response.data);
        },
        (error) => {
            console.log(error);
        }
    );
    //set icon and title page with FontsAweasome
    titlePage.innerHTML = " Lista de Vehiculos";
    document.getElementById("icon").className = "fas fa-car";
}

function Inner_getVehiculos(response) {
    let data = "";

    for (let x = 0; x < response.length; x++) {
        data =
            data +
            '<div class="col-md-4 mb-4">' +
            '<div class="card text-left">' +
            '<img class="card-imgcrop zoom" onclick="onPrepareForm(' +
            response[x].id_vehiculo +
            ')" src="' +
            response[x].foto +
            '" alt="">' +
            ' <div class="card-body">' +
            '  <h4 class="card-title">' +
            response[x].marca +
            "</h4>" +
            '<div class="card w-100" style="width: 18rem;">' +
            '   <ul class="list-group list-group-flush">' +
            '    <li class="list-group-item">Modelo: ' +
            response[x].modelo +
            "</li>" +
            ' <li class="list-group-item">Año: ' +
            response[x].anno +
            "</li>" +
            '<li class="list-group-item">Color: ' +
            response[x].color +
            "</li>" +
            '<li class="list-group-item">Alquiler: ' +
            response[x].disponibilidad +
            "</li>" +
            ' <li class="list-group-item"><a name="" id="btn-alquilar"  data-toggle="modal" data-target="#modelId" class="btn btn-primary zoom" onclick="onPrepareForm(\'' +
            response[x].id_vehiculo +
            '\')" role="button">Alquilar</a></li>' +
            " </ul>" +
            "</div>" +
            "</div>" +
            "</div>" +
            " </div></div>";

        //  console.log(response[x].id_vehiculo);
    }
    return data;
}

function onPrepareForm(data) {
    axios.get("/vehiculos/" + data, {}).then(
        (response) => {
            // this.getFormulario.innerHTML = this.modal;
            this.getForm(response.data);
            // resultElement.innerHTML = HTMLOutput_getVehiculos(response.data);
        },
        (error) => {
            console.log(error);
        }
    );
}

function getForm(data) {
    // console.log(data);


    let form =
        `
    <div id="FormAlquiler">
    <div class="alert alert-info w-75" role="alert">
        <strong>Usted procedera a alquilar el siguiente Vehiculo</strong>
    </div>
    
    
    <div class="row">
        <div class="col-md-6">
        <form>
    <div class="form-group">
      <label for="correo">Correo Electrónico</label>
      <input type="email" class="form-control" id="correo" aria-describedby="emailHelp" placeholder="Introduzca su Correo">
      <small id="emailHelp" class="form-text text-muted">Para seguimiento de su reserva.</small>
    </div>

    <div class="form-group">
      <label for="">Nombre Completo</label>
      <input type="text"
        class="form-control" name="" id="fullname" aria-describedby="helpId" placeholder="Introduzca su Nombre">
      <small id="helpId" class="form-text text-muted"></small>
    </div>

    <div class="form-group">
      <label for="">Teléfono:</label>
      <input type="text"
        class="form-control" name="" id="telefono" aria-describedby="helpId" placeholder="Introduzca su Telefono">
      <small id="helpId" class="form-text text-muted">Teléfono Fijo o Celular</small>
    </div>

    
    <div class="form-group">
      <label for="">Numero de Cedula o Pasaporte: </label>
      <input type="text"
        class="form-control" name="" id="documento" aria-describedby="helpId" placeholder="Introduzca su numero de Documento">
      <small id="helpId" class="form-text text-muted"></small>
    </div>

    <div class="row">
        <div class="col-md-6">
             <div class="form-group">
      <label for="">Fecha de Inicial</label>
      <input type="date"
        class="form-control" onchange="costo_dias(` +
        data[0].precio_dia +
        `)" name="" id="fecha_in" aria-describedby="helpId">
      <small id="helpId" class="form-text text-muted">Dia de Retiro</small>
    </div>
        </div>

        <div class="col-md-6">
              <div class="form-group">
    <label for="">Fecha de Entrega</label>
    <input type="date"
      class="form-control" onchange="costo_dias(` +
        data[0].precio_dia +
        `)" name="" id="fecha_en" aria-describedby="helpId">
    <small id="helpId" class="form-text text-muted">Dia de Devolución</small>
  </div>
        </div>

    </div>

    <button type="button" class="btn btn-primary btn-lg btn-right mb-5" id="btn-alquiler" onclick="getRegAlquiler(\`` +
        data[0].id_vehiculo +
        `\`)">Realizar Alquiler</button>
    
  </form>
  <br>
        </div>

    <div class="col-md-6">
         <div class="card text-left w-50">
                <img class="card-img-top" src="` +
        data[0].foto +
        `" alt="">
                     <div class="card-body">
                        <h4 class="card-title">` +
        data[0].marca +
        `</h4>
                        <ul class="list-group">
                            <li class="list-group-item">Modelo: ` +
        data[0].modelo +
        `</li>
                            <li class="list-group-item">Año: ` +
        data[0].anno +
        `</li>
                            <li class="list-group-item">Color: ` +
        data[0].color +
        `</li>
                            <li class="list-group-item">Precio por Dia: B/. ` +
        data[0].precio_dia +
        `</li>
                        </ul>
                        <br>
                    <h4 id="total" style="color: green">TOTAL A PAGAR: B/. 0.00</h4>
                    <h6>Seleccione la fecha de inical y de entrega para determinar el precio total.</h6>
                     </div>
                  </div>
                  <div class="" id="loading"></div>
    </div>    

    </div>
</div>`;



    if (!alertify.myAlert) {
        //define a new dialog
        alertify.dialog("myAlert", function() {
            setTimeout(() => {
                document.getElementById("correo").focus();
                let sesion = JSON.parse(localStorage.getItem('datauser'));

                if (sesion != null) {
                    document.getElementById("correo").value = sesion.correo;
                    document.getElementById("correo").readOnly = true;

                    document.getElementById("fullname").value = sesion.full_name;
                    document.getElementById("fullname").readOnly = true;

                    document.getElementById("telefono").value = sesion.telefono;
                    document.getElementById("telefono").readOnly = true;

                    document.getElementById("documento").value = sesion.documento;
                    document.getElementById("documento").readOnly = true;


                }


            }, 500);


            return {
                main: function(message) {
                    this.message = message;
                },
                setup: function() {
                    return {
                        buttons: [{ text: "Cancelar", key: 27 /*Esc*/ }],

                        options: {
                            onresize: true,
                            startMaximized: true,
                        },
                    };
                },
                prepare: function() {
                    this.setContent(this.message);
                },
            };
        });
    }
    //launch it.
    alertify.myAlert(form);
}

function costo_dias(precio_dia) {
    let fecha_in = document.getElementById("fecha_in").value;
    let fecha_en = document.getElementById("fecha_en").value;
    let total = document.getElementById("total");
    let costo_total = '0.00';

    let fecha1 = moment(fecha_in);
    let fecha2 = moment(fecha_en);

    costo_total = precio_dia * fecha2.diff(fecha1, "days");
    //  console.log(costo_total);

    if (costo_total < 0) {
        alertify.alert(
            "La Fecha de entrega debe ser superior a la de Inicio.",
            function() {
                alertify.message("OK");
            }
        );
        document.getElementById("fecha_en").value = "";
        document.getElementById("fecha_in").value = "";
    } else if (costo_total == 0) {
        alertify.alert(
            "El Alquiler de un Vehiculo debe se por lo menos de un dia de diferencia.",
            function() {
                alertify.message("OK");
            }
        );
        document.getElementById("fecha_en").value = "";
        document.getElementById("fecha_in").value = "";
    } else {

        total.innerHTML = "TOTAL A PAGAR: B/. " + costo_total;
    }

    //console.log(fecha2.diff(fecha1, 'days'));
}

function getRegAlquiler(data) {
    let loading = document.getElementById("loading");
    loading.innerHTML = "";
    let referencia = "";

    let correo = document.getElementById("correo").value;
    let fullname = document.getElementById("fullname").value;
    let telefono = document.getElementById("telefono").value;
    let documento = document.getElementById("documento").value;
    let fecha_in = document.getElementById("fecha_in").value;
    let fecha_en = document.getElementById("fecha_en").value;

    // console.log(data);
    if (
        correo != "" &&
        fullname != "" &&
        documento != "" &&
        fecha_in != "" &&
        fecha_en != ""
    ) {
        loading.innerHTML = `<div class="alert alert-warning m-2" role="alert"><strong>CARGANDO...</strong></div>`;
        document.getElementById("btn-alquiler").disabled = true;

        axios
            .post("/vehiculos/add-alquiler", {
                id_vehiculo: data,
                correo: correo,
                full_name: fullname,
                telefono: telefono,
                documento: documento,
                fecha_in: fecha_in,
                fecha_en: fecha_en,
            })
            .then(
                (response) => {
                    // this.getFormulario.innerHTML = this.modal;
                    response.data;

                    if (response.data.status == "1") {
                        axios.get("/vehiculos/getultreferencia/" + correo, {}).then(
                            (response) => {
                                // this.getFormulario.innerHTML = this.modal;
                                referencia = response.data;
                                // console.log(response.data);
                                // resultElement.innerHTML = HTMLOutput_getVehiculos(response.data);
                            },
                            (error) => {
                                console.log(error);
                            }
                        );

                        setTimeout(() => {
                            alertify.myAlert().destroy();

                            alertify.alert(
                                "Alquiler Registrado, su numero de seguimiento es: " +
                                referencia[0].referencia,
                                function() {
                                    alertify.message("OK");
                                }
                            );
                        }, 2000);
                    }

                    // resultElement.innerHTML = HTMLOutput_getVehiculos(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
    } else {
        alertify.alert(
            "Complete el Formulario para proceder al alquiler",
            function() {}
        );
    }
}

function getAlquiler() {
    let body = `
    <h4>Consultar Alquiler:</h4>
    <div class="form-group">
      <label for=""></label>
      <input type="text" autofocus
        class="form-control"  name="" id="referencia" aria-describedby="helpId" placeholder="Numero de Referencia">
      <small id="helpId" class="form-text text-muted">Coloque el numero de Referencia de su Alquiler</small>
    </div>
    <button type="button" class="btn btn-primary btn-lg " onclick="getInfoAlquiler()">Consultar</button>
    <div id="InfoAlquiler"></div>
    `;

    alertify.alert(body);
    setTimeout(() => {
        document.getElementById("referencia").focus();
    }, 1000);
}

function getInfoAlquiler() {
    //set variables para contenido
    let InfoAlquiler = document.getElementById("InfoAlquiler");
    let id = document.getElementById("referencia").value;
    InfoAlquiler.innerHTML = "";
    // titlePage = document.getElementById('titlePage');

    axios.get("/vehiculos/getinfo-alquiler/" + id, {}).then(
        (response) => {
            let body = "";

            // for (var i = 0; i < response.data.length; i++) {
            //     var obj = response.data[i];
            //     for (var key in obj) {

            //         var attrName = key;

            //     }
            // }

            InfoAlquiler.innerHTML =
                `
                <div class="card text-justify w-100 mt-4">
                  <img class="card-img-top" src="` +
                response.data[0].foto +
                `" alt="">
                  <div class="card-body">
                    <h4 class="card-title">Información de su Alquiler</h4>

                    <table class="table">
                      
                        <tbody>
                           <tr>
                                <td>ID del Vehiculo (Placa):</td>
                                <td>` +
                response.data[0].id_vehiculo +
                `</td>
                           </tr>
                           <tr>
                                <td>Correo:</td>
                                <td>` +
                response.data[0].correo +
                `</td>
                           </tr>
                            <tr>
                                <td>Telefono:</td>
                                <td>` +
                response.data[0].telefono +
                `</td>
                           </tr>
                           <tr>
                           <td>Num. de Documento:</td>
                           <td>` +
                response.data[0].documento +
                `</td>
                           </tr>
                           <td>Marca:</td>
                           <td>` +
                response.data[0].marca +
                `</td>
                </tr>
                <td>Modelo:</td>
                <td>` +
                response.data[0].modelo +
                `</td>
                </tr>
                <td>Color:</td>
                <td>` +
                response.data[0].color +
                `</td>
                </tr>
                <tr>
                <td>Fecha de Inicio:</td>
                <td>` +
                moment(response.data[0].fecha_in).format("DD/MM/YYYY") +
                `</td>
           </tr>
         <tr>
         <td>Fecha de Devolución:</td>
         <td>` +
                moment(response.data[0].fecha_en).format("DD/MM/YYYY") +
                `</td>
         </tr>
         <tr>
         <tr>
         <td>Cantidad de Dias:</td>
         <td>` +
                response.data[0].cantidad_dias +
                `</td>
         </tr>
                <td>Precio por dia:</td>
                <td>B/.` +
                response.data[0].precio_dia +
                `</td>
                </tr>
                <tr>
                    <td>Total a Pagar: </td>
                    <td>B/.` +
                response.data[0].total_alquiler +
                `</td>
                    </tr>
                    </tbody>
                    </table>
                    
                    </div>
                    </div>
                    `;
        },
        (error) => {
            console.log(error);
        }
    );
    //set icon and title page with FontsAweasome
    //titlePage.innerHTML = ' Lista de Vehiculos';
    //document.getElementById("icon").className = "fas fa-car";
}

this.onVehiculos();