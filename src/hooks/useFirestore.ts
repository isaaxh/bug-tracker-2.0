import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import useId from "@mui/material/utils/useId";


const useFirestore = () => {


    const writeData = async (collectionName: string, uid: string, data: object) => {
        try {
            console.log(data);

            const docRef = setDoc(doc(db, collectionName, uid), data)

            // console.log('Document written with ID: ', docRef);

        } catch (error) {
            console.log('Error adding document: ', error);

        }
    }


    // useEffect(() => {
    //     return () => {
    //     };
    // }, []);

    return { writeData };
}

export default useFirestore;