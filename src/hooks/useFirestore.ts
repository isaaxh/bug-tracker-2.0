import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";


const useFirestore = () => {


    const writeData = async (collectionName: string, data: object) => {
        try {
            const docRef = await addDoc(collection(db, collectionName), data)

            console.log('Document written with ID: ', docRef.id);

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