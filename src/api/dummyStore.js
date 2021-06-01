import axios from 'axios'

export default {
    async fetchTodos() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        return response
    },

    async addTodo(title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false})
        return response
    },

    async deleteTodo(id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/{id}`)
    },

    async fetchWithLimit(limit) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
        return response
    },

    async updateTodo(todo) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo)
        return response
    }
}