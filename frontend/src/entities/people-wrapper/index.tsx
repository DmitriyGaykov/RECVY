import {User} from "../../models";
import {FC} from "react";
import {PersonBlock} from "../person-block";
import styles from './people.wrapper.module.scss';
import {BlockedPersonBlock} from "../blocked-person-block";

export type PeopleWrapperProps = {
  people?: User[];
  blockedPeople?: User[];
}

export const PeopleWrapper: FC<PeopleWrapperProps> = ({people, blockedPeople}) => {
  return (
    <div className="flex-1 pt-2 pb-2 w-100 scroll-container " style={{maxHeight: '70vh'}}>
      <div className={styles?.gridColumns2}>
        {
          people ?
            people?.map(person => <PersonBlock key={person?.id} {...person}/>) :
            blockedPeople?.map(person => <BlockedPersonBlock key={person.id} {...person} />)
        }
      </div>
    </div>
  )
}