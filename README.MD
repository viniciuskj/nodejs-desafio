# Requisitos Funcionais - Sistema de Lista de Tarefas

## Lista de Tarefas

| Código | Descrição | Método | Rota |
|--------|-----------|--------|------|
| **RF01** | Um usuário deve ser capaz de criar uma lista de tarefas | POST | `/list/` | x 
| **RF02** | Um usuário deve ser capaz de editar a descrição de suas listas de tarefas | PATCH | `/list/` | x 
| **RF03** | Um usuário deve ser capaz de excluir uma lista de tarefas | DELETE | `/list/` | x  
| **RF04** | Ao excluir uma lista de tarefas, todas as tarefas relacionadas a mesma devem ser excluídas | - | - | x 
| **RF05** | Um usuário deve ser capaz de visualizar todas as suas listas cadastradas | GET | `/list/all` | x
| **RF06** | Um usuário deve ser capaz de visualizar uma única lista cadastrada (devem ser visíveis todas as tarefas desta lista) | GET | `/list/:id` | x 

## Tarefas

| Código | Descrição | Método | Rota |
|--------|-----------|--------|------|
| **RF07** | Um usuário deve ser capaz de criar uma tarefa associada a uma lista de tarefas | POST | `/task/` | x 
| **RF08** | Um usuário deve ser capaz de editar tanto o status quanto a descrição de suas tarefas | PATCH | `/task/` | x
| **RF09** | Um usuário deve ser capaz de excluir uma tarefa | DELETE | `/task/` |

## Observações

- **RF04**: Este requisito é uma regra de negócio que deve ser implementada quando a exclusão de uma lista de tarefas for executada
- **RF06**: A visualização de uma lista específica deve incluir todas as tarefas associadas a ela
- **RF08**: A edição de tarefas permite modificar tanto o status (ex: pendente/concluída) quanto a descrição da tarefa