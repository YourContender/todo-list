import { onValue, ref, set, update } from "firebase/database";
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

export const updateCurrentTaskFromDatabase = (updateListTask, id, editTitle, editDescr) => {
    return async dispatch => {
        update(ref(db, `/${id.uid}`), {
            titleTask: editTitle,
            descrTask: editDescr,
            id: id.uid,
            stateTask: false
        })

        dispatch({
            type: 'UPDATE_TASK',
            payload: updateListTask
        })
    }
}