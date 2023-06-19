import style from "./profileSettings.module.css";

const ProfileSettings = () => {
  return (
    <div className={style.container}>
      <div>
        <h3 className='item-titles'>Full name</h3>
        <p>isaac hussain</p>
        <button>Edit</button>
      </div>
      <div>
        <h3 className='item-titles'>Email</h3>
        <p>isaaclearns@mail.com</p>
        <button>Edit</button>
      </div>
      <div>
        <h3 className='item-titles'>Password settings</h3>
        <p>0000000</p>
        <button>Reset</button>
      </div>
      <div>
        <h3 className='item-titles'>Profile Image</h3>
        <p>Edit</p>
      </div>
      <div>
        <h3 className='item-titles'>Notifications settings</h3>
        <button>enable / disable</button>
      </div>
    </div>
  );
};

export default ProfileSettings;
