import { useNavigate } from "react-router";
import style from "./profileSettings.module.css";
import { GlobalContext, GlobalContextType } from "../../contexts/GlobalContext";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const { toggleModalOpen } = useContext(GlobalContext) as GlobalContextType;

  const handleBtnResetClick = () => {
    navigate("/resetpass");
  };

  const handleEditFullNameClick = () => {
    toggleModalOpen();
  };

  let settings = [
    {
      title: "Full Name",
      content: currentUser?.displayName,
      btnTitle: "Edit",
    },
    {
      title: "Email",
      content: currentUser?.email,
    },
    {
      title: "Password Settings",
      content: "********",
    },
    {
      title: "Profile Image",
      content: "",
      btnTitle: "Edit",
    },
    {
      title: "Notification Settings",
      content: "",
      btnTitle: "Enable",
    },
  ];

  return (
    <div className={style.container}>
      {/* <h1>Profile Settings</h1> */}
      <div className={style["grid-wrapper"]}>
        {settings.map((setting, index) => (
          <div className={style["grid-items"]} key={index}>
            <div className={style["text-container"]}>
              <h3 className={style["item-titles"]}>{setting.title}</h3>
              <p>{setting.content}</p>
            </div>
            <div className={style["btn-container"]}>
              {setting.title === "Password Settings" ? (
                <button className={style.btn} onClick={handleBtnResetClick}>
                  Reset
                </button>
              ) : setting.title === "Full Name" ? (
                <button className={style.btn} onClick={handleEditFullNameClick}>
                  Edit
                </button>
              ) : setting.btnTitle ? (
                <button className={style.btn}>{setting.btnTitle}</button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSettings;
