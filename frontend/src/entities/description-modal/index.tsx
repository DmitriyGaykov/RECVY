import {FC, useEffect, useState} from "react";
import {useGetUserQuery} from "../../store";
import {User} from "../../models";
import {PhotoSlider} from "../photo-slider";
import {TextBlock} from "../../components";
import {ImageButton} from "../../components/buttons";
import crossSvg from './../../assets/images/cross.svg';
import {useGetUser} from "../../utils";

export type DescriptionModalProps = {
  userid: string;
  onCross: string;
  _user?: User;
}

export const DescriptionModal: FC<DescriptionModalProps> = ({userid, onCross, _user}) => {
  const user = _user || useGetUser(userid);

  return (
    <div
      className="position-fixed height-100vh min-vw-100 h-100 bg-black top-0 bg-opacity-75 d-flex justify-content-center align-items-center"
      style={{left: '0', zIndex: 100}}>
      <div className="p-2 light-purple rounded-2 d-flex gap-2 position-relative">
        <ImageButton src={crossSvg} onClick={typeof onCross === 'function' && onCross}
                     className="width-height-15 position-absolute" style={{right: '10px', top: '10px'}}/>
        <PhotoSlider photos={user?.photos}/>
        <div className="d-flex flex-column justify-content-center max-width-250 w-100 gap-1">
          <TextBlock className="fs-17px fw-semibold">{user?.firstname + " " + user?.lastname}</TextBlock>
          <TextBlock className="fs-14px">{user?.aboutme || "Здесь могла быть ваша реклама!"}</TextBlock>
        </div>
      </div>
    </div>
  )
}