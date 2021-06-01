import api from '@/api/dummyStore.js'

const state = {
    todos: []
}

const getters = {
    allTodos: (state) => state.todos
}

const actions = {
    async fetchTodos ({commit}) {
        const response = await api.fetchTodos()
        commit('SET_TODOS', response.data)
    },

    async addTodo( {commit}, title) {
        const response = api.addTodo(title)
        commit('ADD_TODO', response.data)
    },

    async deleteTodo( {commit}, id) {
        await api.deleteTodo(id)
        commit('DELETE_TODO', id)
    },

    async filterTodos( { commit }, event) {
        const limit = parseInt(event.target.value)
        console.log(limit)
        const response = await api.fetchWithLimit(limit)        
        console.log(response.data)
        commit('SET_TODOS', response.data)
    },

    async updateTodo({ commit }, todo) {
        const response = await api.updateTodo(todo)
        commit('UPDATE_TODO', response.data)
        console.log(response.data)
    },
}

const mutations = {
    SET_TODOS: (state, todos) => (state.todos = todos),
    ADD_TODO: (state, todo) => (state.todos.unshift(todo)),
    DELETE_TODO: (state, id) => (state.todos = state.todos.filter(todo => todo.id !== id)),
    UPDATE_TODO: (state, todo) => {
        const index = state.todos.findIndex(t => t.id === todo.id)
        if( index !== -1) {
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
