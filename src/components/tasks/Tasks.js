import { onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const Tasks = () => {
    const [tasksList, setTasksList] = useState([]);

    // read tasks
    useEffect(() => {
        getFullListTasksFromDatabase()
    }, [])

    const getFullListTasksFromDatabase = () => {
        onValue(ref(db), item => {
            setTasksList([]);

            const data = item.val();
            if (data !== null) {
                Object.values(data).map(elem => {
                    setTasksList((prev) => {
                        return [elem, ...prev]
                    })
                })
            }
        })
    }

    // remove task
    const removeCurrentTask = (id) => {
        remove(ref(db, id))
    }

    return (
        <div className="tasks">
            {
                tasksList.map(item => {
                    return (
                        <li>
                            <span>{item.titleTask}</span>
                            <span>{item.descrTask}</span>

                            <button>edit</button>
                            <button>done</button>
                            <button onClick={() => removeCurrentTask(item.id)}>remove</button>
                        </li>
                    )
                })
            }
        </div>
    )
}

export default Tasks;