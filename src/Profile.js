import React from "react";
import DailyChecklist from "./DailyChecklist";
import ProfileBadge from "./ProfileBadge";

const Profile = () => {
  return (
    <div>
      <ProfileBadge />
      <DailyChecklist />
    </div>
  );
};

export default Profile;
