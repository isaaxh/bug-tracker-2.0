import style from './roleAssignment.module.css';
import MoonLoader from "react-spinners/MoonLoader";
import { DocumentData } from 'firebase/firestore';
import { userDataType } from '../../contexts/AuthContext';

interface SelectUserPropsTypes {
    loading: boolean;
    unAssignedUsers: DocumentData;
    selectedUsers: string[];
}

const roles = ["admin", "manager", "developer"];

const SelectUser = ({ loading, unAssignedUsers, selectedUsers }: SelectUserPropsTypes) => {


    const handleUsersSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValues = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );

        console.log(selectedValues);

        // setSelectedUsers(selectedValues);
    };

    const handleRoleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValues = e.target.options;
        // Array.from(  e.target.selectedOptions,(option) => option.value);

        console.log(e.target);

        // setSelectedRole(selectedValues);
    };

    const handleMultiUsersClick = (value: string) => {
        if (selectedUsers.includes(value)) {
            // setSelectedUsers(selectedUsers.filter((user) => user != value));
        } else {
            // setSelectedUsers([...selectedUsers, value]);
        }
    };


    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <div className={style["input-container"]}>
            <form action='#' onSubmit={handleSubmitForm} className={style.form}>
                <div className={style["select-user-container"]}>
                    <label className={style["user-list-label"]} htmlFor='user-list'>
                        Select 1 or more unassigned users
                    </label>
                    {loading && loading ? (
                        <MoonLoader
                            className={style.spinner}
                            loading={loading}
                            aria-label='Loading Spinner'
                            data-testid='loader'
                            size={20}
                        />
                    ) : (
                        <select
                            className={style["user-list"]}
                            name='user-list'
                            id='user-list'
                            multiple
                            size={3}
                            required
                            autoFocus
                            onChange={handleUsersSelectChange}
                        >
                            {unAssignedUsers.map((userData: userDataType, index: number) => (
                                <option
                                    className={style["select-items"]}
                                    key={index}
                                    value={userData.displayName}
                                >
                                    {userData.displayName}
                                </option>
                            ))}
                        </select>
                    )}
                    <div>CTRL + Select multiple users</div>
                </div>
                <hr className={style.hr} />
                <div className={style["select-role-container"]}>
                    <label className={style["user-list-label"]} htmlFor='role-list'>
                        Select the Role to assign
                    </label>
                    <select
                        className={style["role-list"]}
                        name="role-list"
                        id='role-list'
                        required
                        autoFocus
                        onChange={handleRoleSelectChange}
                    >
                        <option disabled value=''>
                            --Choose one please--
                        </option>
                        {roles.map((role, index) => (
                            <option
                                className={style["select-items"]}
                                key={index}
                                value={role}
                            >
                                {role}
                            </option>
                        ))}
                    </select>
                </div>
                <button className={style["btn-submit"]}>Submit</button>
            </form>
        </div>
    )
}

export default SelectUser;
