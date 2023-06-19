import style from "./profileSettings.module.css";

const settings = [
  {
    title: "Full Name",
    content: "Isaac Hussain",
    buttonTitle: "Edit",
  },
  {
    title: "Email",
    content: "isaac@email.com",
    buttonTitle: "Edit",
  },
  {
    title: "Password Settings",
    content: "000000000",
    buttonTitle: "Reset",
  },
  {
    title: "Profile Image",
    content: "",
    buttonTitle: "Edit",
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
      <div className={style["grid-wrapper"]}>
        {settings.map((setting, index) => (
          <div className={style["grid-items"]} key={index}>
            <div className={style["text-container"]}>
              <h3 className={style["item-titles"]}>{setting.title}</h3>
              <p>{setting.content}</p>
            </div>
            <button className={style.btn}>{setting.btnTitle}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSettings;
