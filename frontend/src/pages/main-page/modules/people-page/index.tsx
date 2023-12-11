import {ImageButton} from "../../../../components";
import searchSvg from './../../../../assets/images/search.svg';
import {usePeopleFind} from "../../../../utils";
import {useEffect, useState} from "react";
import {PeopleWrapper} from "../../../../entities";

export const PeoplePage = () => {
  const {people, onSubs, onAll, onFriends, onEnter, getYet, isAll} = usePeopleFind();
  const [searchText, setSearchText] = useState<string>('');

  return (
    <div className="w-100 flex-1 d-flex gap-3 flex-column p-3 justify-content-start align-items-start">
      <div className="d-flex gap-5 flex-wrap">
        <div className="d-flex gap-2 align-items-center">
          <ImageButton src={searchSvg} className="width-height-30" onClick={() => onEnter(searchText)}/>
          <input className="form-text text-black w-100 min-width-300" placeholder="Поиск..."
                 onChange={(e) => setSearchText(e.target.value)}/>
        </div>
        <div className="d-flex gap-4 align-items-center">
          <div className="d-flex align-items-center gap-1 fs-14px">
            <span className="text-white">Только друзья: </span>
            <input type="radio" name="people-choice" onChange={onFriends}/>
          </div>
          <div className="d-flex align-items-center gap-1 fs-14px">
            <span className="text-white">Только подпищики: </span>
            <input type="radio" name="people-choice" onChange={onSubs}/>
          </div>
          <div className="d-flex align-items-center gap-1 fs-14px">
            <span className="text-white">Все: </span>
            <input type="radio" name="people-choice" onChange={onAll}/>
          </div>
        </div>
      </div>
      <PeopleWrapper people={people}/>
      {
        !isAll &&
        <button className="btn pink-color text-white" onClick={getYet}>Еще...</button>
      }
    </div>
  )
}