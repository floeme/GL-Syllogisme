import Modal from "react-modal"

// Style personnalisé pour la modal
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        height: "80%",
    },
}

Modal.setAppElement("#root")

const PolyModal = ({ isOpen, onRequestClose, path }: { isOpen: boolean; onRequestClose: () => void; path: string }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Guide PDF"
        >
            <button onClick={onRequestClose} style={{ marginBottom: "10px" }}>
                Close
            </button>
            <iframe
                src={path}
                style={{ width: "100%", height: "90%", border: "none" }}
                title="Guide PDF"
            />
        </Modal>
    )
}

export default PolyModal
