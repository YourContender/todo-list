const initialState = {
    data: []
}

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TASKS_LIST':
            return {
                ...state, 
                data: action.payload
            }
        case 'ADD_NEW_TASK': 
            return {
                ...state,
                data: action.payload
            }
        case 'REMOVE_TASK': 
            return {
                ...state, 
                data: action.payload
            }
        
        default:
            return state
    }
}

export default tasksReducer;