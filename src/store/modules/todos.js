import api from '@/api/dummyStore.js'
import fsapi from '@/api/firestore.js'

const state = {
    todos: []
}

const getters = {
    allTodos: (state) => state.todos
}

const actions = {
    async fetchTodos({ commit }) {
        const todos = await fsapi.fetchTodos(-1)
        commit('SET_TODOS', todos)
    },

    async addTodo({ commit }, title) {
        const todo = await fsapi.addTodo(title)
        commit('ADD_TODO', todo)
    },

    async deleteTodo({ commit }, id) {
        console.log('deleting todo with id:', id)
       const response =  await fsapi.deleteTodo(id)
       console.log(response)
        commit('DELETE_TODO', id)
    },

    async filterTodos({ commit }, event) {
        const limit = parseInt(event.target.value)
        console.log(limit)
        const todos = await fsapi.fetchTodos(limit)
        console.log(todos)
        commit('SET_TODOS', todos)
    },

    async updateTodo({ commit }, todo) {
        const response = await fsapi.updateTodo(todo)
        console.log(response)
        commit('UPDATE_TODO', todo)
    },
}

const mutations = {
    SET_TODOS: (state, todos) => (state.todos = todos),
    ADD_TODO: (state, todo) => (state.todos.unshift(todo)),
    DELETE_TODO: (state, id) => (state.todos = state.todos.filter(todo => todo.id !== id)),
    UPDATE_TODO: (state, todo) => {
        const index = state.todos.findIndex(t => t.id === todo.id)
        if (index !== -1) {
            state.todos.splice(index, 1, todo)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
