import { useNavigate } from "react-router";
import style from "./profileSettings.module.css";
import { GlobalContext, GlobalContextType } from "../../contexts/GlobalContext";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";

const ProfileSettings = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext) as AuthContextType;
    const { toggleModalOpen, setModalTitle } = useContext(
        GlobalContext
    ) as GlobalContextType;

    const handleBtnResetClick = () => {
        navigate("/resetpass");
    };

    const handleEditClick = (btnName: string) => {
        setModalTitle(btnName);
        toggleModalOpen();
    };

    const settings = [
        {
            title: "Full Name",
            content: currentUser?.displayName,
            btnTitle: "Edit",
            onClickFunction: () => handleEditClick("Edit Full Name"),
        },
        {
            title: "Email",
            content: currentUser?.email,
        },
        {
            title: "Password Settings",
            content: "********",
            btnTitle: "Reset",
            onClickFunction: handleBtnResetClick,
        },
        {
            title: "Profile Image",
            content: "",
            btnTitle: "Edit",
            onClickFunction: () => handleEditClick("Edit Profile Photo"),
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
                            {setting.btnTitle ? (
                                <button className={style.btn} onClick={setting.onClickFunction}>
                                    {setting.btnTitle}
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
