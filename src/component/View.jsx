import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';

const View = ({ nama, task }) => {
    const [openModal, setOpenModal] = useState()
    const [email, setEmail] = useState("");
    const props = { openModal, setOpenModal, email, setEmail }
    const [data, setdata] = useState([])

    useEffect(() => {

    }, [])

    return (
        <>
            
        </>
    )
}

export default View