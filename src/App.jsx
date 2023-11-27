import styles from './App.module.css'
import {useState} from "react";

function App() {
    const [tasks, setTasks] = useState([{
        id_: 1,
        task: 'try again',
        done: false
    }, {
        id_: 2,
        task: 'try one more time',
        done: false
    }])
    const [showTasks, setShowTask] = useState(true)

    const [inputValue, setInputValue] = useState('')

    function markAsDone(id) {
        setTasks(tasks.map((e => (e.id_ === id ? {...e, done: true} : e))))
    }

    function deleteTask(id) {
        setTasks(prevTasks => prevTasks.filter(task => task.id_ !== id))
    }

    function switchTasksForm() {
        setShowTask(!showTasks)
    }

    function addTask(e) {
        setTasks((prevTask) => [...prevTask, {id_: prevTask.id_ + 1, task: e.target.value, done: false}])
        switchTasksForm()
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1>ToDo list</h1>
                        <h2>TODO {tasks.length} tasks</h2>
                    </div>
                    <div>
                        <button className={styles.button} onClick={switchTasksForm}>+</button>
                    </div>
                </div>
                {showTasks ? <ul>
                    {
                        tasks && tasks.map((e) => {
                            return <li key={e.id_} className={styles.item}>
                                <div className={styles.header}>
                                    <div className={`${styles.name} ${e.done ? styles.done : ''}`}>{e.task}</div>
                                    <div className={styles.header}>
                                        {!e.done && <button className={styles.buttonTask} onClick={() => {
                                            markAsDone(e.id_)
                                        }}>Done
                                        </button>}
                                        <button className={styles.buttonTask} onClick={() => {
                                            deleteTask(e.id_)
                                        }}>delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul> : <><input type="text" onChange={(e) => {
                    setInputValue(e.target.value)
                }}/>
                    <button className={styles.buttonTask} value={inputValue} onClick={addTask}>Add</button>
                </>}
            </div>
        </>
    )
}

export default App
