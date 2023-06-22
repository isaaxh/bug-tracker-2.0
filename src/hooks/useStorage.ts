import { storage } from "../firebase";
import { ref, uploadBytes } from 'firebase/storage';
// import useAuth from "./useAuth";
import uuid from "react-uuid";
import { User } from "firebase/auth";
import { useState } from "react";

interface uploadImgPropsType {
    currentUser: User;
    imgUpload: File;
}


const useStorage = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // const { currentUser } = useAuth()

    const uploadImg = ({ currentUser, imgUpload }: uploadImgPropsType) => {
        setLoading(true)
        setError('')

        const imgRef = ref(storage, `${currentUser.uid}/${imgUpload.name} + ${uuid()}`)

        uploadBytes(imgRef, imgUpload).then(() => {
            alert("image uploaded")
        }).catch((err) => {
            console.log(err);
            setError(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return { uploadImg, error, loading };
}

export default useStorage;