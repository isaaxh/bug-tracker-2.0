import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import useAuth from "./useAuth";
import uuid from "react-uuid";
import { User, updateProfile } from "firebase/auth";
import { useState } from "react";

interface uploadImgPropsType {
    currentUser: User;
    imgUpload: File;
}

const useStorage = () => {
    const [error, setError] = useState<unknown | string>('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)


    const uploadImg = async ({ currentUser, imgUpload }: uploadImgPropsType) => {
        setLoading(true)
        setError('')
        setSuccess('')

        const imgRef = ref(storage, `${currentUser.uid}/${imgUpload.name} + ${uuid()}`)


        try {
            await uploadBytes(imgRef, imgUpload)
            const photoURL = await getDownloadURL(imgRef)
            updateProfile(currentUser, { photoURL })
            setSuccess('Successful')
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }




        // uploadBytes(imgRef, imgUpload).then(() => {
        //     getDownloadURL(imgRef).then((photoURL) => {
        //         updateProfile(currentUser, { photoURL }).then(() => {
        //             console.log(currentUser.photoURL)
        //         })
        //     }).catch((error) => {
        //         setError(error.message)
        //     });
        //     setSuccess('Successful')
        // }).catch((error) => {
        //     setError(error.message)
        // }).finally(() => {
        //     setLoading(false)
        // })


    }


    return { uploadImg, error, setError, success, setSuccess, loading };
}

export default useStorage;