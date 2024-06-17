import ShowDebtOwesListGroupCard from "../ShowDebtOwesListCard/ShowDebtOwesListGroupCard";
import styles from "./ShowDebtOwesList.module.scss";
import { Document, Types } from 'mongoose';
import ChartModal from "../ChartVisuals/ChartModal";
import { useState } from "react";
import groupIcon from "../../../public/images/groupIcon.png";
import groupIcon1 from "../../../public/images/groupIcon1.png";



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
  groupExpense?: Expense[] | null;
}

const ShowDebtOwesGroupList: React.FC<Props> = ({groupExpense}) => {

    const groupList = groupExpense?.[0]?.groupInvolved || [];
    const [isModalVisible, setModalVisible] = useState(false);

    console.log('groupList');
    console.log(groupList);

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
                    <div className={styles.label}>
                        You Owe
                    </div>
                    {groupList.map((group) => (
            <ShowDebtOwesListGroupCard
              key={group.group.toString()} 
              imgSrc={groupIcon} 
              username={`${group.group_name}`} 
              you_lent={''} 
              you_paid={210} 
            />
          ))}
        </div>
        <div className={styles.flexChild}>
          <div className={styles.label}>You are owed</div>
          {groupList.map((group) => (
            <ShowDebtOwesListGroupCard
            key={group.group.toString()} 
            imgSrc={groupIcon1} 
            username={`${group.group_name}`} 
            you_lent={120} 
            you_paid={''}  
            />
          ))}
                </div>
            </div>
        </div>
    );
}

export default ShowDebtOwesGroupList;
