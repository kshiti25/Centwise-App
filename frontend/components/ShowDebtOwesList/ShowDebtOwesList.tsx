import React, { useState } from 'react';
import ShowDebtOwesListCard from "../ShowDebtOwesListCard/ShowDebtOwesListCard";
import styles from "./ShowDebtOwesList.module.scss";
import ChartModal from "../ChartVisuals/ChartModal";
import { Document, Types } from 'mongoose';
import userIcon1 from "../../../public/images/userIcon1.png";
import userIcon2 from "../../../public/images/userIcon2.png";

interface UserInvolved {
  user: Types.ObjectId;
  paidShare: number;
  owedShare: number;
  user_first_name: string;
  user_last_name: string;
}

interface GroupInvolved {
  group: Types.ObjectId;
  group_name: string;
}

interface Partition {
  type: string;
}

interface Expense extends Document {
  Payer: Types.ObjectId;
  description: string;
  usersInvolved: UserInvolved[];
  groupInvolved: GroupInvolved[];
  amount: number;
  currency: string;
  created_by: Types.ObjectId;
  created_date: Date;
  partition: Partition[];
  expenseType: string;
}

interface Props {
  friendExpense?: Expense[] | null;
}

const ShowDebtOwesList: React.FC<Props> = ({ friendExpense }) => {
  const friendsList = friendExpense?.[0]?.usersInvolved || [];
  const [isModalVisible, setModalVisible] = useState(false);

  console.log('friendsList');
  console.log(friendsList);

  const viewChartHandler = () => {
    setModalVisible(true);
  };

  const closeModalHandler = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.viewChartbtn} onClick={viewChartHandler}>View Chart</button>
      </div>
      {isModalVisible && <ChartModal isVisible={isModalVisible} onClose={closeModalHandler} />}
      <div className={styles.flexContainer}>
        <div className={styles.flexChild}>
          <div className={styles.label}>You Owe</div>
          {friendsList.map((friend) => (
            friend.owedShare >= 0 && (
              <ShowDebtOwesListCard
                key={friend.user.toString()}
                imgSrc={userIcon2}
                username={`${friend.user_first_name}`}
                lastname={`${friend.user_last_name}`}
                amount={`$${Math.abs(friend.owedShare).toFixed(2)}`}
              />
            )
            ))}
        </div>
        <div className={styles.flexChild}>
          <div className={styles.label}>You are owed</div>
            {friendsList.map((friend) => (
               friend.paidShare >= 0 && (
              <ShowDebtOwesListCard
                key={friend.user.toString()}
                imgSrc={userIcon1}
                username={`${friend.user_first_name}`}
                lastname={`${friend.user_last_name}`}
                amount={`$${friend.paidShare.toFixed(2)}`}
              />
               )
            ))}
        </div>
      </div>
    </div>
  );
}

export default ShowDebtOwesList;
