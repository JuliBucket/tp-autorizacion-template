import { homePage } from "./homePage";

export const todosPage = () => {
  const container = document.createElement("div");

  const btnCreate = document.createElement("button")
  btnCreate.classList.add(
    "bg-green-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-green-600",
    "mb-4"
  );
  btnCreate.textContent="Create Task";
  btnCreate.addEventListener("click", () => {
    console.log("clikearon en crear xd");
  
    // Crear contenedor modal con Tailwind para ingresar el título y estado
    const modalContainer = document.createElement("div");
    modalContainer.classList.add(
      "fixed", "inset-0", "bg-gray-900", "bg-opacity-50", "flex", "items-center", "justify-center", "z-50"
    );
  
    // Crear el contenido del modal
    const modalContent = document.createElement("div");
    modalContent.classList.add(
      "bg-white", "p-6", "rounded-lg", "shadow-lg", "w-1/3"
    );
  
    // Crear input para el título
    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("placeholder", "Ingresa el título");
    inputTitle.classList.add(
      "border", "border-gray-300", "p-2", "w-full", "mb-4", "rounded-md"
    );
  
    // Texto para elegir el estado
    const labelCompleted = document.createElement("p");
    labelCompleted.textContent = "Selecciona el estado:";
    labelCompleted.classList.add("mb-2", "font-semibold");
  
    // Crear contenedor de botones para elegir estado
    const completedContainer = document.createElement("div");
    completedContainer.classList.add("flex", "justify-between", "mb-4");
  
    // Botón para "Completado"
    const btnCompleted = document.createElement("button");
    btnCompleted.textContent = "Completado";
    btnCompleted.classList.add(
      "bg-green-500", "text-white", "p-2", "rounded-md", "hover:bg-green-600", "w-1/2", "mr-2"
    );
  
    // Botón para "Pendiente"
    const btnPending = document.createElement("button");
    btnPending.textContent = "Pendiente";
    btnPending.classList.add(
      "bg-yellow-500", "text-white", "p-2", "rounded-md", "hover:bg-yellow-600", "w-1/2"
    );
  
    // Variable para almacenar el estado seleccionado
    let completed = false;
  
    // Lógica para cambiar el estado según el botón clickeado
    btnCompleted.addEventListener("click", () => {

      completed = true; // Establecer el estado como "Completado"
      console.log("Estado seleccionado: Completado");

      // Cambiar estilos visuales para indicar que está seleccionado
      btnCompleted.classList.add("ring-2", "ring-green-400");
      btnPending.classList.remove("ring-2", "ring-yellow-400");
    });
  
    btnPending.addEventListener("click", () => {
      completed = false; // Establecer el estado como "Pendiente"
      console.log("Estado seleccionado: Pendiente");
      // Cambiar estilos visuales para indicar que está seleccionado
      btnPending.classList.add("ring-2", "ring-yellow-400");
      btnCompleted.classList.remove("ring-2", "ring-green-400");
    });
  
    // Crear botón para confirmar la creación
    const btnConfirm = document.createElement("button");
    btnConfirm.textContent = "Confirmar";
    btnConfirm.classList.add(
      "bg-blue-500", "text-white", "p-2", "rounded-md", "hover:bg-blue-600", "mr-4"
    );
  
    // Crear botón para cancelar la acción
    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancelar";
    btnCancel.classList.add(
      "bg-red-500", "text-white", "p-2", "rounded-md", "hover:bg-red-600"
    );
  
    // Lógica cuando se confirma
    btnConfirm.addEventListener("click", () => {
      const title = inputTitle.value;
  
      // Aquí iría la lógica para crear la tarea con los valores obtenidos
      console.log(`Título: ${title}, Estado: ${completed ? "Completado" : "Pendiente"}`);
  
      // Cerrar modal
      modalContainer.remove();
      if (title.trim()) {
        fetch("http://localhost:4000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            completed: completed, // Por defecto es falso si es una tarea nueva
          }),
          credentials: "include",
        })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              console.error("Error al crear el todo:", error);
            });
          }
          return response.json();
        })
          
          .then((data) => {
            console.log(data);
            location.reload(); // Actualiza la página para mostrar el nuevo TODO
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        alert("Complete todos los campos");
      }
    });
  
    // Lógica para cancelar (cerrar el modal)
    btnCancel.addEventListener("click", () => {
      modalContainer.remove(); // Cerrar el modal sin realizar ninguna acción
    });

    // Agregar inputs y botones al contenido del modal
    modalContent.appendChild(inputTitle);
    modalContent.appendChild(labelCompleted);
    completedContainer.appendChild(btnCompleted);
    completedContainer.appendChild(btnPending);
    modalContent.appendChild(completedContainer);
    modalContent.appendChild(btnConfirm);
    modalContent.appendChild(btnCancel);
  
    // Agregar el modal al contenedor
    modalContainer.appendChild(modalContent);
  
    // Añadir el modal al DOM
    document.body.appendChild(modalContainer);
  });
  
  

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-auto",
    "bg-gray-200"
  );

  const btnHome = document.createElement("button");

  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );

  btnHome.textContent = "Home";

  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");

  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";
  

  const table = document.createElement("table");
  

  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);

  thead.appendChild(tr);

  const tbody = document.createElement("tbody");

  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);
  

  container.appendChild(btnHome);
  container.appendChild(btnCreate)
  fetch("http://localhost:4000/todos", {
    credentials: "include"
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("border", "px-4", "py-2");
        td1.textContent = todo.id;

        const td2 = document.createElement("td");
        td2.classList.add("border", "px-4", "py-2");
        td2.textContent = todo.title;

        const td3 = document.createElement("td");
        td3.classList.add("border", "px-4", "py-2");
        td3.textContent = todo.completed ? "Sí" : "No";

        const td4 = document.createElement("td");
        td4.classList.add("border", "px-4", "py-2");
        td4.textContent = todo.owner;

        const td5 = document.createElement("td");
        td5.classList.add("border", "px-4", "py-2");

        const btnDelete = document.createElement("button")
        btnDelete.classList.add(
          "bg-red-500",
          "text-white",
          "p-2",
          "rounded",
          "hover:bg-red-600",
          "mb-4")
          btnDelete.textContent = "Delete";
                  // Evento para el botón Borrar
              btnDelete.addEventListener("click", () => {
    
      // Crear contenedor modal con Tailwind para ingresar el título y estado
      const modalContainer = document.createElement("div");
      modalContainer.classList.add(
        "fixed", "inset-0", "bg-gray-900", "bg-opacity-50", "flex", "items-center", "justify-center", "z-50"
      );
    
      // Crear el contenido del modal
      const modalContent = document.createElement("div");
      modalContent.classList.add(
        "bg-white", "p-6", "rounded-lg", "shadow-lg", "w-1/5"
      );
    

    
      // Texto para elegir el estado
      const labelDelete = document.createElement("p");
      labelDelete.textContent = "¿Seguro que quieres borrar esta tarea?";
      labelDelete.classList.add("mb-2", "font-semibold");
    
  let confirmar = false

      // Crear botón para confirmar la creación
      const btnConfirm = document.createElement("button");
      btnConfirm.textContent = "Confirmar";
      btnConfirm.classList.add(
        "bg-blue-500", "text-white", "p-2", "rounded-md", "hover:bg-blue-600", "mr-4"
      );
    
      // Crear botón para cancelar la acción
      const btnCancel = document.createElement("button");
      btnCancel.textContent = "Cancelar";
      btnCancel.classList.add(
        "bg-red-500", "text-white", "p-2", "rounded-md", "hover:bg-red-600"
      );
    
      // Lógica cuando se confirma
      btnConfirm.addEventListener("click", () => {
        let confirmar = true
    
        // Cerrar modal
        modalContainer.remove();
        if (confirmar) {
          fetch(`http://localhost:4000/todos/${todo.id}`, {
            method: "DELETE",
            credentials: "include",
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Todo borrado:", data);
              location.reload(); // Recargar la página para reflejar los cambios
            })
            .catch((error) => console.error("Error al borrar todo:", error));
        }
      });
    
      // Lógica para cancelar (cerrar el modal)
      btnCancel.addEventListener("click", () => {
        modalContainer.remove(); // Cerrar el modal sin realizar ninguna acción
      });

      // Agregar inputs y botones al contenido del modal
      modalContent.appendChild(labelDelete);
      modalContent.appendChild(btnConfirm);
      modalContent.appendChild(btnCancel);
    
      // Agregar el modal al contenedor
      modalContainer.appendChild(modalContent);
    
      // Añadir el modal al DOM
      document.body.appendChild(modalContainer);
    });
      
          const btnEdit = document.createElement("button")
          btnEdit.classList.add(
            "bg-yellow-500",
            "text-white",
            "p-2",
            "rounded",
            "hover:bg-yellow-600",
            "mb-4",
            "mx-4")
            btnEdit.textContent = "Edit";
            // Evento para el botón Editar
            btnEdit.addEventListener("click", () => {
              console.log("clikearon en crear xd");
            
              // Crear contenedor modal con Tailwind para ingresar el título y estado
              const modalContainer = document.createElement("div");
              modalContainer.classList.add(
                "fixed", "inset-0", "bg-gray-900", "bg-opacity-50", "flex", "items-center", "justify-center", "z-50"
              );
            
              // Crear el contenido del modal
              const modalContent = document.createElement("div");
              modalContent.classList.add(
                "bg-white", "p-6", "rounded-lg", "shadow-lg", "w-1/3"
              );
            
              // Crear input para el título
              const inputTitle = document.createElement("input");
              inputTitle.setAttribute("type", "text");
              inputTitle.setAttribute("value", todo.title);
              inputTitle.classList.add(
                "border", "border-gray-300", "p-2", "w-full", "mb-4", "rounded-md"
              );
            
              // Texto para elegir el estado
              const labelCompleted = document.createElement("p");
              labelCompleted.textContent = "Selecciona el nuevo estado:";
              labelCompleted.classList.add("mb-2", "font-semibold");
            
              // Crear contenedor de botones para elegir estado
              const completedContainer = document.createElement("div");
              completedContainer.classList.add("flex", "justify-between", "mb-4", "h-10");
            
              // Botón para "Completado"
              const btnCompleted = document.createElement("button");
              btnCompleted.textContent = "Completado";
              btnCompleted.classList.add(
                "bg-green-500", "text-white", "p-2", "rounded-md", "hover:bg-green-600", "w-1/2", "mr-2"
              );
            
              // Botón para "Pendiente"
              const btnPending = document.createElement("button");
              btnPending.textContent = "Pendiente";
              btnPending.classList.add(
                "bg-yellow-500", "text-white", "p-2", "rounded-md", "hover:bg-yellow-600", "w-1/2"
              );
            
              // Variable para almacenar el estado seleccionado
              let newCompleted = false;
            
              // Lógica para cambiar el estado según el botón clickeado
              btnCompleted.addEventListener("click", () => {
          
                newCompleted = true; // Establecer el estado como "Completado"
                console.log("Estado seleccionado: Completado");
          
                // Cambiar estilos visuales para indicar que está seleccionado
                btnCompleted.classList.add("ring-2", "ring-green-400");
                btnPending.classList.remove("ring-2", "ring-yellow-400");
              });
            
              btnPending.addEventListener("click", () => {
                newCompleted = false; // Establecer el estado como "Pendiente"
                console.log("Estado seleccionado: Pendiente");
                // Cambiar estilos visuales para indicar que está seleccionado
                btnPending.classList.add("ring-2", "ring-yellow-400");
                btnCompleted.classList.remove("ring-2", "ring-green-400");
              });
            
              // Crear botón para confirmar la creación
              const btnConfirm = document.createElement("button");
              btnConfirm.textContent = "Confirmar";
              btnConfirm.classList.add(
                "bg-blue-500", "text-white", "p-2", "rounded-md", "hover:bg-blue-600", "mr-4"
              );
            
              // Crear botón para cancelar la acción
              const btnCancel = document.createElement("button");
              btnCancel.textContent = "Cancelar";
              btnCancel.classList.add(
                "bg-red-500", "text-white", "p-2", "rounded-md", "hover:bg-red-600"
              );
            
              // Lógica cuando se confirma
              btnConfirm.addEventListener("click", () => {
                const newTitle = inputTitle.value;
            
                // Aquí iría la lógica para crear la tarea con los valores obtenidos
                console.log(`Título: ${newTitle}, Estado: ${newCompleted ? "Completado" : "Pendiente"}`);
            
                // Cerrar modal
                modalContainer.remove();
                if (newTitle.trim()) {
                  fetch(`http://localhost:4000/todos/${todo.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                  title: newTitle,
                  completed: newCompleted,
                  }),
                  credentials: "include",
                  })
                  .then((response) => response.json())
                  .then((data) => {
                  console.log("Todo editado:", data);
                  location.reload(); // Recargar la página para reflejar los cambios
                })
                .catch((error) => console.error("Error al editar todo:", error));
              } else {
              alert("Debe ingresar un título válido");
              }
              });
            
              // Lógica para cancelar (cerrar el modal)
              btnCancel.addEventListener("click", () => {
                modalContainer.remove(); // Cerrar el modal sin realizar ninguna acción
              });
          
              // Agregar inputs y botones al contenido del modal
              modalContent.appendChild(inputTitle);
              modalContent.appendChild(labelCompleted);
              completedContainer.appendChild(btnCompleted);
              completedContainer.appendChild(btnPending);
              modalContent.appendChild(completedContainer);
              modalContent.appendChild(btnConfirm);
              modalContent.appendChild(btnCancel);
            
              // Agregar el modal al contenedor
              modalContainer.appendChild(modalContent);
            
              // Añadir el modal al DOM
              document.body.appendChild(modalContainer);
            });

        td5.appendChild(btnDelete);
        td5.appendChild(btnEdit);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
      });
    });

  container.appendChild(title);
  container.appendChild(table);
  return container;
};
