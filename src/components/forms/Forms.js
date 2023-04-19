import { db } from '../../firebase';
import { useState } from 'react';
import { set, ref } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const Forms = () => {
    const [titleTask, setTitleTask] = useState('');
    const [descrTask, setDescrTask] = useState('');

    // add task
    const createTaskToDatabase = () => {
        const uid = uuidv4();
        set(ref(db, `/${uid}`), {
            titleTask,
            descrTask,
            id: uid,
            stateTask: false
        })

        setTitleTask('');
        setDescrTask('');
    }

    const enterTextInTitle = (e) => {
        setTitleTask(e.target.value);
    }

    const enterTextInDescr = (e) => {
        setDescrTask(e.target.value);
    }

    return (
        <div className="forms">
            <input 
                type="text" 
                placeholder="enter title" 
                value={titleTask}
                onChange={enterTextInTitle}
            />

            <input 
                type="text" 
                placeholder="enter description" 
                value={descrTask}
                onChange={enterTextInDescr}
            />

            <button 
                onClick={createTaskToDatabase}
            >
                Submit
            </button>
        </div>
    )
}

export default Forms;