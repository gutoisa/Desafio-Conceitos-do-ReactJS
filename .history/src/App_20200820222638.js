import React from "react";

import "./styles.css";
import { useEffect,useState } from "react";
import api from "./services/api";

function App() {
  const [projects,setProjects] = useState([]);
  useEffect(() =>{
    api.get('./repositories').then(response =>{
      setProjects(response.data);
    });

},[]);



  async function handleAddRepository() {
   
     const response = await api.post('/repositories',{
        "title": 'Desafio ReactJS',
      });
   const project = response.data;

   setProjects([...projects,project]);

  }

  async function handleRemoveRepository(id) {
    console.log(id);
      const response = await api.delete(`repositories/${id}`,{                  
    });

    const repositorie = projects.filter(project => project.id != id);
    setProjects(repositorie);
  
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {projects.map(project =>(
          <li key={project.id}>{project.title}
          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
           </li>
        ))}
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
