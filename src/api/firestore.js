import db from '@/components/firebaseinit.js'


export default {
    async fetchTodos(limit) {
        let snapshot;
        if(limit <= 0) {
            snapshot = await db.collection('todos').orderBy('timestamp', 'desc').get()
        }
        else {
            snapshot = await db.collection('todos').orderBy('timestamp', 'desc').limit(limit).get()
        }
        const todoArr = new Array()
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            const id = doc.id
            const title = doc.data().title
            const timestamp = doc.data().timestamp
            const completed = doc.data().completed
            const todo = {id, title, completed, timestamp}
            todoArr.push(todo)
        });
        return todoArr
    },

    async addTodo(title) {
        const newTodo = {
            title,
            completed: false,
            timestamp: new Date().getTime()
        }
        const response = await db.collection('todos').add(newTodo);
        newTodo.id = response.id
        console.log('Added document: ', newTodo);
        return newTodo   
    },

    async deleteTodo(id) {
        const response = await db.collection('todos').doc(id).delete()
        return response
    },

    async updateTodo(todo) {
        todo.timestamp = new Date().getTime()
        const response = await db.collection('todos').doc(todo.id).update(todo)
        return response;
    }
}