import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('repositories', {
        title: 'ReactJS - desafio 1',
        url: 'https://github.com/cintiafumi',
        techs: ['ReactJS', 'NodeJS'],
      });
      setRepositories([ ...repositories, response.data ]);
    } catch (err) {
      alert('Erro ao adicionar repositório. Tente novamente.');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (err) {
      alert('Erro ao deletar repositório. Tente novamente.');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
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
