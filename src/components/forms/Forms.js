import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTaskToDatabase } from '../../redux/actions/actions';

const Forms = () => {
    const [titleTask, setTitleTask] = useState('');
    const [descrTask, setDescrTask] = useState('');

    const dispatch = useDispatch();
    const tasks = useSelector(elem => elem.tasks.data); 

    // add task
    const createTaskToDatabase = () => {
        const uid = uuidv4();

        let task = {
            titleTask,
            descrTask,
            id: uid,
            stateTask: false
        }

        const added = [task, ...Object.values(tasks)];

        dispatch(addNewTaskToDatabase(task, added, uid))

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