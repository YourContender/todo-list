import { onValue, ref, remove, set, update } from "firebase/database";
import { db } from "../../firebase";

export const getFullListTasksFromDatabase = () => {
    return async dispatch => {
        onValue(ref(db), item => {
            const data = item.val(); 

            if (data !== null) {
                dispatch({
                    type: 'GET_TASKS_LIST',
                    payload: data
                })
            }
        })
    }
}

export const addNewTaskToDatabase = (task, added, uid) => {
    return async dispatch => {
        set(ref(db, `/${uid}`), task) 

        dispatch({
            type: 'ADD_NEW_TASK',
            payload: added
        })
    }
}

export const removeCurrentTaskFromDatabase = (uid, newListTask) => {
    return async dispatch => {
        remove(ref(db, uid));
 
        dispatch({
            type: 'REMOVE_TASK',
            payload: newListTask
        })
    }
}

export const updateCurrentTaskFromDatabase = (updateListTask, currentTask, id) => {
    return async dispatch => {
        update(ref(db, `/${id}`), {
            titleTask: currentTask[0].titleTask,
            descrTask: currentTask[0].descrTask,
            id: id,
            stateTask: currentTask[0].stateTask
        })

        dispatch({
            type: 'UPDATE_TASK',
            payload: updateListTask
        })
    }
}