import { useNavigate } from "react-router";
import style from "./profileSettings.module.css";

const settings = [
  {
    title: "Full Name",
    content: "Isaac Hussain",
    btnTitle: "Edit",
  },
  {
    title: "Email",
    content: "isaac@email.com",
  },
  {
    title: "Password Settings",
    content: "000000000",
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

const ProfileSettings = () => {
  const navigate = useNavigate();

  const handleBtnResetClick = () => {
    console.log("funtion");

    navigate("/resetpass");
  };
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
              {setting.btnTitle ? (
                <button className={style.btn}>{setting.btnTitle}</button>
              ) : setting.title === "Password Settings" ? (
                <button className={style.btn} onClick={handleBtnResetClick}>
                  Reset
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSettings;
