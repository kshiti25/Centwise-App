import React, { useState } from "react";
import GroupNameCard from "./GroupNameCard";
import styles from "./GroupCmp.module.scss";
import AddGroupModal from "./AddGroupsModal";

const GroupCmp: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={styles.mainGroupDiv}>
                <p className={styles.GroupsYouAreIn}>Groups you are in</p>
                <button className={styles.addGroupBtn} onClick={openModal}>
                + Add Group
                </button>
            </div>
            <div>
                <GroupNameCard />
            </div>
            <AddGroupModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default GroupCmp;
