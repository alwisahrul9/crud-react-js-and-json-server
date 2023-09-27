import axios from 'axios';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';

const Form = () => {

    const [obj, setObj] = useState({
        nama: '',
        task: ''
    })

    const save = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3001/data', obj)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

        setObj({
            nama: '',
            task: ''
        })
    }

    return(
        <>
            <form className="flex w-full flex-col gap-4" onSubmit={save}>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="nama"
                        value="Nama"
                    />
                    </div>
                    <TextInput
                        id="nama"
                        placeholder="Masukkan Nama"
                        required
                        type="text"
                        value={obj.nama}
                        onChange={(e) => setObj((item) => {
                            return {
                                ...item,
                                nama: e.target.value
                            }
                        })}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="task"
                            value="Task"
                        />
                    </div>
                    <TextInput
                        id="task"
                        required
                        type="text"
                        placeholder="Kegiatan"
                        value={obj.task}
                        onChange={(e) => setObj((item) => {
                            return {
                                ...item,
                                task: e.target.value
                            }
                        })}
                    />
                </div>
                <Button type="submit">
                    Submit
                </Button>
            </form>
        </>
    )
}

export default Form