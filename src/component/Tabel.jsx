import axios from 'axios';
import { Button, Table, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';


const Tabel = () => {

    // Per Data'an
    const [data, setData] = useState([])
    const [dataView, setDataView] = useState([])
    const [dataEdit, setDataEdit] = useState({
        nama: '',
        task: ''
    })

    // Id
    const [id, setId] = useState("")

    // MODAL
    const [openModal, setOpenModal] = useState()
    const [email, setEmail] = useState("");
    const props = { openModal, setOpenModal, email, setEmail }
    
    const [openEdit, setOpenEdit] = useState();
    const [emailEdit, setEmailEdit] = useState("");
    const edit = { openEdit, setOpenEdit, email, setEmail };


    useEffect(() => {
        axios.get('http://localhost:3001/data')

        .then(response => {
            setData(response.data)
        })

        .catch(error => {
            console.log(error)
        })
    }, [data])

    const deleteHandle = (id) => {
        axios.delete(`http://localhost:3001/data/${id}`)

        .then(response => {
            console.log(response)
        })

        .catch(error => {
            console.log(error)
        })
    }

    const viewHandle = (id) => {
        props.setOpenModal('form-elements')
        setDataView(data[id])
    }

    const editHandle = (id, index) => {
        edit.setOpenEdit('form-elements')
        setDataView(data[index])
        setId(id)
    }

    const updated = (e) => {
        e.preventDefault();
        
        axios.put(`http://localhost:3001/data/${id}`, dataEdit)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

        edit.setOpenEdit(undefined)
    }

    return (
        <div className='relative overflow-x-auto'>
            <Table>
                <Table.Head>
                    <Table.HeadCell>
                        No
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Nama
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Task
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Tindakan
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        data.map((item, index) => {
                            return (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {index+1}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.nama}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.task}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className='flex gap-4'>
                                            <Button color='warning' onClick={() => viewHandle(index)}>Lihat</Button>
                                            <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                                                <Modal.Header>{dataView.nama}</Modal.Header>
                                                <Modal.Body>
                                                    <span>Nama: {dataView.nama}</span><br/>
                                                    <span>Task: {dataView.task}</span>
                                                </Modal.Body>
                                            </Modal>

                                            <Button onClick={() => editHandle(item.id, index)}>Edit</Button>
                                            <Modal show={edit.openEdit === 'form-elements'} size="md" popup onClose={() => edit.setOpenEdit(undefined)}>
                                                <Modal.Header>
                                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">{dataView.nama}</h3>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <form onSubmit={updated}>
                                                        <div className="space-y-6">
                                                            <div>
                                                                <div className="mb-2 block">
                                                                    <Label value="Nama" />
                                                                </div>
                                                                <TextInput type='text' placeholder='Nama Baru'  required onChange={(e) => setDataEdit((item) => {
                                                                    return {
                                                                        ...item,
                                                                        nama: e.target.value
                                                                    }
                                                                })} />
                                                            </div>
                                                            <div>
                                                                <div className="mb-2 block">
                                                                    <Label value="Task" />
                                                                </div>
                                                                <TextInput type='text' placeholder='Task Baru'  required onChange={(e) => setDataEdit((item) => {
                                                                    return {
                                                                        ...item,
                                                                        task: e.target.value
                                                                    }
                                                                })} />
                                                            </div>
                                                            <div className="w-full flex justify-end">
                                                                <Button type='submit'>Simpan</Button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </Modal.Body>
                                            </Modal>

                                            <Button color='failure' onClick={() => deleteHandle(item.id)}>Hapus</Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
        </div> 
     );
}
 
export default Tabel;