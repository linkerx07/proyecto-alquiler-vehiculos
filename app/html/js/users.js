function miCuenta() {
    let body;
    let sesion = JSON.parse(localStorage.getItem('datauser'));
    if (sesion != null) {

        body = `
            <table class="table">
          
                <tbody>
                    <tr>
                        <td scope="row"></td>
                        <td>Mi Correo: </td>
                        <td>` + sesion.correo + `</td>
                    </tr>
                    <tr>
                        <td scope="row"></td>
                        <td>Mi Nombre:: </td>
                        <td>` + sesion.full_name + `</td>
                    </tr>
                    <tr>
                        <td scope="row"></td>
                        <td>Documento (Cedula/Pasaporte): </td>
                        <td>` + sesion.documento + `</td>
                    </tr>
                    <tr>
                        <td scope="row"></td>
                        <td>Teléfono: </td>
                        <td>` + sesion.telefono + `</td>
                    </tr>
                  
                </tbody>

            </table>  
            <button type="button" class="btn btn-success btn-lg ">Ver mi Historial de Alquiler</button>
            <button type="button" class="btn btn-danger btn-lg" onclick="salir()">Cerrar Sesión</button>
            <br><br>
        `;


        // console.log(sesion.correo);
    } else {
        body = `

    <div id="miCuenta">
<div class="form-group">
  <label for="">Correo:</label>
  <input type="text"
    class="form-control" name="" id="correo" aria-describedby="helpId" autofocus placeholder="Introduzca su Correo">
  <small id="helpId" class="form-text text-muted">Help text</small>
</div>

<div class="form-group">
  <label for="">Contraseña:</label>
  <input type="password" class="form-control" name="password" id="pass" placeholder="Introduzca su contraseña">
</div>

<div class="mt-4" >
  <button type="button" class="btn btn-primary btn-lg" onclick="login()">Iniciar Sesión</button>
  <button type="button" class="btn btn-warning btn-lg" onclick="formRegistro()">Registro</button>
</div></div>
`;


    }

    alertify.alert(body, function() {
        alertify.message("OK");

    });
    setTimeout(() => {
        let correo = document.getElementById("correo").focus();
    }, 1000);
}


function salir() {
    localStorage.clear();
    alertify
        .alert("usted ha cerrado sesión. Por favor espere...", function() {
            alertify.message('OK');
        });

    setTimeout(() => {
        location.reload();
    }, 2000);


}

function formRegistro() {
    let miCuenta = document.getElementById("miCuenta");

    let body = `
    <div class="form-group">
      <label for="">Correo</label>
      <input type="text"
        class="form-control" name="" id="correo" aria-describedby="helpId" placeholder="Correo">
     
    </div>
    <div class="form-group">
    <label for="">Contraseña</label>
    <input type="password"
      class="form-control" name="" id="pass" aria-describedby="helpId" placeholder="Contraseña">
    
  </div>
  <div class="form-group">
  <label for="">Repita su contraseña</label>
  <input type="password"
    class="form-control" name="" id="repass" aria-describedby="helpId" placeholder="Repita su Contraseña">
  
</div>
  <div class="form-group">
  <label for="">Nombre:</label>
  <input type="text"
    class="form-control" name="" id="full_name" aria-describedby="helpId" placeholder="Nombre Completo">
</div>

<div class="form-group">
<label for="">Telefono:</label>
<input type="text"
  class="form-control" name="" id="telefono" aria-describedby="helpId" placeholder="Introduzca su Telefono">
</div>

<div class="form-group">
<label for="">Numero de Documento Personal (Cedula/Pasaporte):</label>
<input type="text"
  class="form-control" name="" id="documento" aria-describedby="helpId" placeholder="Cedula/Pasaporte">
</div>

<button type="button" class="btn btn-primary btn-lg" onclick="registro()">Registrarse</button>
<button type="button" class="btn btn-danger btn-lg" onclick="cancelar()">Cancelar</button>

`;

    miCuenta.innerHTML = body;

}


function registro() {
    let miCuenta = document.getElementById("miCuenta");
    let correo = document.getElementById("correo").value;
    let pass = document.getElementById("pass").value;
    let repass = document.getElementById("repass").value;
    let full_name = document.getElementById("full_name").value;
    let telefono = document.getElementById("telefono").value;
    let documento = document.getElementById("documento").value;

    // validaciones
    if (correo != '' && pass != '' && repass != '' && full_name != '' && telefono != '' && documento != '') {

        if (pass == repass) {
            //success

            axios.post("/user/registro", {
                'correo': correo,
                'pass': pass,
                'repass': repass,
                'full_name': full_name,
                'telefono': telefono,
                'documento': documento
            }).then(
                (response) => {
                    // console.log(response.data);
                    miCuenta.innerHTML = response.data.message;
                    setTimeout(() => {
                        cancelar();

                    }, 3000);
                },
                (error) => {
                    console.log(error);
                }
            );

        } else {

            alertify
                .warning("Las Contraseñas no coinciden.", function() {
                    alertify.message('OK');
                });
        }

    } else {
        alertify
            .warning("Complete todos los campos del formulario.", function() {
                alertify.message('OK');
            });
    }





}

function cancelar() {
    alertify.alert().destroy();
}



function misAlquileres() {}




function login() {
    let correo = document.getElementById("correo").value;
    let pass = document.getElementById("pass").value;


    if (correo != '' && pass != '') {
        axios.post("/user/login", {
            'correo': correo,
            'pass': pass,
        }).then(
            (response) => {
                // console.log(response.data);
                miCuenta.innerHTML = response.data.mensaje;
                if (response.data.status == '1') {
                    //  console.log('sesion basica creada');
                    localStorage.setItem('datauser', JSON.stringify(response.data));
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }

                // cancelar();

                alertify
                    .alert(response.data.mensaje, function() {
                        alertify.message('OK');
                    });


            },
            (error) => {
                console.log(error);
            }
        );



    } else {

    }


}