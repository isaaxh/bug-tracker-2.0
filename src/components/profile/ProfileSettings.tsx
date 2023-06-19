import style from "./profileSettings.module.css";

const ProfileSettings = () => {
  return (
    <div className={style.container}>
      <div className={style["grid-wrapper"]}>
        <div className={style["grid-item"]}>
          <div className={style["text-container"]}>
            <h3 className='item-titles'>Full name</h3>
            <p>isaac hussain</p>
          </div>
          <button>Edit</button>
        </div>
        <div className={style["grid-item"]}>
          <div className={style["text-container"]}>
            <h3 className='item-titles'>Email</h3>
            <p>isaaclearns@mail.com</p>
          </div>
          <button>Edit</button>
        </div>
        <div className={style["grid-item"]}>
          <div className={style["text-container"]}>
            <h3 className='item-titles'>Password settings</h3>
            <p>0000000</p>
          </div>
          <button>Reset</button>
        </div>
        <div className={style["grid-item"]}>
          <div className={style["text-container"]}>
            <h3 className='item-titles'>Profile Image</h3>
            <p>Edit</p>
          </div>
        </div>
        <div className={style["grid-item"]}>
          <div className={style["text-container"]}>
            <h3 className='item-titles'>Notifications settings</h3>
            <button>enable / disable</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
