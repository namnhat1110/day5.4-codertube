import React from "react";
import { Modal } from "react-bootstrap";

import YoutubeEmbed from "../components/YoutubeEmbed";

const ModalBox = (props) => {
  return (
    <div>
      <Modal
        size="xl"
        show={props.modalOpen}
        onHide={props.setModalOpen}
        aria-labelledby="example-modal-sizes-title-xl"
      >
        <Modal.Body>
          <YoutubeEmbed embedId={props.movieTrailerKey.key} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalBox;
