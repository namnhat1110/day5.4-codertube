import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

import YoutubeEmbed from "../components/YoutubeEmbed"

const ModalBox = () => {
    const [xlShow, setXlShow] = useState(false);
    return (
        <div>
            <Button onClick={() => setXlShow(true)}>View Trailer</Button>
            <Modal
                size="xl"
                show={xlShow}
                onHide={() => setXlShow(false)}
                aria-labelledby="example-modal-sizes-title-xl"

            >
                <Modal.Body><YoutubeEmbed embedId="odM92ap8_c0" /></Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalBox