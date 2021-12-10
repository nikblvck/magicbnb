import {useState} from "react";
import {Modal} from "../../context/Modal";
import AddReviewForm from "./AddReviewForm";

function AddReviewFormModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <button onClick={() => setShowModal(true)}>Add Review</button>
    {showModal && (
      <Modal onClose={()=> setShowModal(false)}>
        <AddReviewForm/>
      </Modal>
    )}
    </>
  );
}

export default AddReviewFormModal;
