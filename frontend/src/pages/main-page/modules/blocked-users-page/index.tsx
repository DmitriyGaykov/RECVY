import {FC, useState} from "react";
import {ImageButton} from "../../../../components";
import searchSvg from "../../../../assets/images/search.svg";
import {PeopleWrapper} from "../../../../entities";
import {useBlockedUsers} from "../../../../utils";

export const BlockedUsersPage: FC = () => {
  const [searchText, setSearchText] = useState("");
  const { getYet, users, isAllData, onEnter } = useBlockedUsers();
  return (
    <div className="w-100 flex-1 d-flex gap-3 flex-column p-3 justify-content-start align-items-start">
      <div className="d-flex gap-5 flex-wrap">
        <div className="d-flex gap-2 align-items-center">
          <ImageButton src={searchSvg} className="width-height-30" onClick={() => onEnter(searchText)}/>
          <input className="form-text text-black w-100 min-width-300" placeholder="Поиск..."
                 onChange={(e) => setSearchText(e.target.value)}/>
          {
            !isAllData &&
            <button className="btn pink-color text-white" onClick={getYet}>Еще...</button>
          }
        </div>
      </div>
      <PeopleWrapper blockedPeople={users}/>
    </div>
  )
}