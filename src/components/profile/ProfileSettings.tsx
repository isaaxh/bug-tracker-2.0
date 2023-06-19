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
    // btnTitle: "Edit",
  },
  {
    title: "Password Settings",
    content: "000000000",
    btnTitle: "Reset",
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
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSettings;
