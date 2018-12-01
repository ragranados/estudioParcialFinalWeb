window.onload = () => {
    app.init();
}

let app = {
    init: () => {
        app.addEvents();
        app.loadContent();

        document.getElementById("cancelar").style.visibility = "hidden";
        document.getElementById("modificar").style.visibility = "hidden";
    },
    addEvents: () => {
        document.postForm.enviar.addEventListener('click', (event) => {
            event.preventDefault();
            //console.log(app);
            app.submitPost(event);
        });



        document.getElementById("cancelar").addEventListener("click", (event) => {
            event.preventDefault();
            console.log("caca");
            let formulario = document.getElementsByTagName("form")[0];
            formulario.setAttribute("action", '/post');
            formulario.name.setAttribute("value", "");
            formulario.autor.setAttribute("value", "");
            formulario.cancelar.style.visibility = "hidden";
            formulario.modificar.style.visibility = "hidden";
            formulario.enviar.value = "Enviar";
        });
    },
    addRow: (data) => {
        let tbody = document.getElementsByClassName("posts")[0];
        let tr = document.createElement("tr");
        tr.innerHTML = `<td> ${data._id} </td>
                            <td> ${data.name}<td>
                            <td> ${data.autor}<td>
                            <td> 
                                <a href="#" class="delete"> Delete </a>
                                <a href="#" class="update"> Update </a>
                            <td>`;
        tr.getElementsByClassName("delete")[0].addEventListener("click", (event) => {
            event.preventDefault();
            console.log("delete");
            //agregar funcion para eliminar row
        });

        tr.getElementsByClassName("update")[0].addEventListener("click", (event) => {
            event.preventDefault();
            console.log("update");

            let formulario = document.getElementsByTagName("form")[0];
            formulario.setAttribute("action", '/post');
            formulario.name.setAttribute("value", data.name);
            formulario.autor.setAttribute("value", data.autor);
            formulario.cancelar.style.visibility = "visible";
            formulario.modificar.style.visibility = "visible";


            document.postForm.modificar.addEventListener('click', (event) => {
                event.preventDefault();
                console.log("ëvento boton updatw gregado");
                app.updatePost(data);
            });
        });

        tbody.appendChild(tr);
    },
    deletePost: (data, tr, tbody) => {
        fetch('/api/post/' + data._id, {
            method: "DELETE"
        }).then(res => res.json())
            .then(res => {
                if (res.ok) {
                    tbody.removeChild(tr);
                } else {
                    document.getElementsByClassName("errors")[0].innertext = "No se puede eliminar";
                }
            });
    },
    updatePost: (data) => {


        let formulario = document.getElementsByTagName("form")[0];

        event.preventDefault();
        let dataToUpdate = {
            name: document.postForm.name.value,
            autor: document.postForm.autor.value
        };

        console.log(dataToUpdate.autor);

        fetch('/post/' + data._id, {
            method: 'PUT',
            body: JSON.stringify(dataToUpdate),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(datos => {
                if (datos.ok) {
                    app.loadContent();
                }
            });

        formulario.setAttribute("action", '/post');
        formulario.name.setAttribute("value", "");
        formulario.autor.setAttribute("value", "");
        formulario.cancelar.style.visibility = "hidden";
        formulario.modificar.style.visibility = "hidden";
        formulario.enviar.value = "Enviar";

        //app.loadContent();

    },
    submitPost: (event) => {
        event.preventDefault();

        let data = {
            name: document.postForm.name.value,
            autor: document.postForm.autor.value
        };

        console.log(data);

        fetch('/post', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(_data => {
                if (_data.ok) {
                    app.addRow(_data.guardado);
                } else {
                    document.getElementsByClassName("errors")[0].innerText = "No se pudo guardar";
                }
            });
    },
    loadContent: function () {
        console.log("si entra");
        fetch('/post', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.ok) {
                    data.posts.forEach(element => {
                        app.addRow(element);
                    });
                }
            });
    }
};