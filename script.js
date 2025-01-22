$(document).ready(function () {
    const $btnusuario = $('#btn-users');
    const $resultado = $('#result-container');
    const $btntodos = $('#btn-todos');
    const $btnañadir = $('#btn-añadir');
    const $btnbuscar = $('#btn-buscar');


    //Boton listar primero
    $btnusuario.on('click', function () {
        $.ajax({
            url: 'https://back-express-psi.vercel.app/api/users/user1',
            method: 'GET',
            dataType: 'json',
            success: function (user) {
    
                $resultado.html(`<h3>Usuario 1:</h3>
                                       <p>ID: ${user.id}</p>
                                       <p>Nombre: ${user.nombre}</p>
                                       <p>Apellido: ${user.apellido}</p>
                                       <p>Telefono: ${user.telefono}</p>`);
            },
            error: function () {
                $resultado.text('Ocurrió un error al obtener el usuario.');
            }
        });
    });

    //Boton listar todos
    $btntodos.on('click', function () {
        $.ajax({
            url: 'https://back-express-psi.vercel.app/api/users', 
            method: 'GET',
            dataType: 'json',
            success: function (users) {
                $resultado.empty();

                if (users.length > 0) {
                    $resultado.append('<h3>Usuarios:</h3>');
                    const $list = $('<ul></ul>');

                    users.forEach(user => {
                        $list.append(`<li>ID: ${user.id}, Nombre: ${user.nombre}</li>`);
                    });

               
                    $resultado.append($list);
                } else {
                    $resultado.text('No hay usuarios disponibles.');
                }
            },
            error: function () {
               
                $resultado.text('Ocurrió un error al obtener los usuarios.');
            }
        });
    });

    //Boton añadir
    $btnañadir.on('click', function () {
       
        $resultado.html(`
            <h3>Añadir Usuario</h3>
            <label for="user-id">ID:</label>
            <input type="number" id="user-id" required>
            <br>
            <label for="user-name">Nombre:</label>
            <input type="text" id="user-name" required>
            <br>
            <label for="user-apellido">Apellido:</label>
            <input type="text" id="user-apellido" required>
            <br>
            <label for="user-tlf">Telefono:</label>
            <input type="number" id="user-tlf" required>
            <br>
            <button id="submit-user">Guardar Usuario</button>
        `);

        $('#submit-user').on('click', function () {
            const id = $('#user-id').val();
            const nombre = $('#user-name').val();
            const apellido = $('#user-apellido').val();
            const telefono = $('#user-tlf').val();

            if (!id || !nombre || !apellido || !telefono) {
                alert('Por favor, completa todos los campos.');
                return;
            }


            $.ajax({
                url: 'https://back-express-psi.vercel.app/api/users',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ id: parseInt(id), nombre, apellido, telefono }),
                success: function (response) {
                    alert(response.message);
                    $('#result-container').empty();
                },
                error: function (xhr) {
                    alert('Error al añadir el usuario: ' + xhr.responseText);
                }
            });
        });
    });

    //Buscar por ID
    $btnbuscar.on('click', function () {
        $resultado.html(`
            <h3>Buscar Usuario</h3>
            <label for="user-id">ID del Usuario:</label>
            <input type="number" id="user-id" required>
            <button id="submit-search">Buscar</button>
        `);

        $('#submit-search').on('click', function () {
            const userId = $('#user-id').val();

            if (!userId) {
                alert('Por favor, ingresa un ID válido.');
                return;
            }

            $.ajax({
                url: `https://back-express-psi.vercel.app/api/users/${userId}`, 
                method: 'GET',
                dataType: 'json',
                success: function (user) {
                    
                    $resultado.html(`
                        <h3>Usuario Encontrado:</h3>
                        <p>ID: ${user.id}</p>
                        <p>Nombre: ${user.nombre}</p>
                        <p>Apellido: ${user.apellido}</p>
                        <p>Telefono: ${user.telefono}</p>`);
                },
                error: function (xhr) {
                    if (xhr.status === 404) {
                        $resultado.text('Usuario no encontrado.');
                    } else {
                        $resultado.text('Ocurrió un error al buscar el usuario.');
                    }
                }
            });
        });
    });




});
