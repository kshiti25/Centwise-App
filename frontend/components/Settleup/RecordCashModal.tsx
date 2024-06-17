import React, { useEffect, useState } from "react";
import styles from "./Settleup.module.css";
import flightIcon from "../../../public/images/AeroplaneIcon.png";
import UserListModal from "./UserListModal";
import RecipientListModal from "./RecipientListModal";
import "react-datepicker/dist/react-datepicker.css";
import FriendListModal from "../ListModals/FriendListModal";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface RecordCashModalProps {
  onClose: (e?: React.MouseEvent) => void;
}

const RecordCashModal: React.FC<RecordCashModalProps> = ({ onClose }) => {
  const [amount, setAmount] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date()); // Set initial value to today's date
  const [userListModalOpen, setUserListModalOpen] = useState<boolean>(false);
  const [recipientListModalOpen, setRecipientListModalOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [selectedPayer, setSelectedPayer] = useState("You");
  const [recipient, setRecipient] = useState("...");

  const navigate = useNavigate();
  const toggleModal = () => {
    onClose();

    setUserListModalOpen(false);
    setRecipientListModalOpen(false);
  };

  const toggleUserListModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUserListModalOpen(!userListModalOpen);
    setRecipientListModalOpen(false);
    //setOpenModal(userListModalOpen ? null : 'user');
  };

  const toggleRecipientListModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecipientListModalOpen(!recipientListModalOpen);
    setUserListModalOpen(false);
    //setOpenModal(recipientListModalOpen ? null : 'recipient');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest(`.${styles.recordCashModalContent}`)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose, toggleModal]);

  const handlePayerChange = (payer: string[]) => {
    setSelectedPayer(payer[0]);
  }

  const handleRecipientChange = (recipient: string[]) => {
    setRecipient(recipient[0]);
  }


  const handleSave = async () => {
    try {
      // Make an Axios GET request to your API endpoint
      const response = await axios.get("/api/user/settleup", {
        params: {
          payer: selectedPayer,
          recipient: recipient,
          amount: amount,
        },
      });

      // Handle the response as needed (e.g., show a success message)
      console.log("Save successful", response.data);

      // Close the modal or perform other actions
      onClose();

      navigate('/dashboard');
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error saving data", error);

      // Close the modal or perform other actions
      onClose();
    }
  };

  return (
    <>
      <div className={styles.overlay2}></div>
      <div className={styles.recordCashModalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Settle Up</h2>
        <hr className={styles.hr}></hr>
        <button className={styles.closeModal} onClick={toggleModal}>
          X
        </button>
        <div className={styles.contentContainer}>
        <div className={styles.imageSet}>
        <img className={styles.icon} src={flightIcon} alt="Flight Icon" />
        <div>----------|</div>
        <img className={styles.icon} src={flightIcon} alt="Flight Icon" />
        </div>
        <br/>
        <hr/>
        <div className={styles.buttonGroup}>
          Payer 
          <button className={styles.btn} onClick={(e) => toggleUserListModal(e)}>
            { selectedPayer }
          </button>
          <span className={styles.paid}>and Receipient </span>
          <button className={styles.btn} onClick={(e) => toggleRecipientListModal(e)}>
            { recipient }
          </button>
          <br/> <br/>
          <label className={styles.currency}>
                  $:
                  <input type="text" value={amount} onChange={(e) => setAmount((e.target as HTMLInputElement).value)} onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9.]/g,"");}}/>
                </label>
          <br />
          <hr/>
          {/*<DatePicker
            className={styles.date}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            popperPlacement="right-start"
            onFocus={() => setOpenModal(null)} // Close other modals on date picker focus
          />*/}
         <br />
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
        </div>
        </div>
        {userListModalOpen && <FriendListModal onClose={() => setUserListModalOpen(false)} onClick={handlePayerChange} />}
        {recipientListModalOpen && <FriendListModal onClose={() => setRecipientListModalOpen(false)} onClick={handleRecipientChange} />}
      </div>
    </>
  );
};

export default RecordCashModal;
