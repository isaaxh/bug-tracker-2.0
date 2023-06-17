import { collection, addDoc, setDoc, doc, getDoc, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import useId from "@mui/material/utils/useId";

interface writeDataProps {
    collectionName: string,
    uid: string,
    data: object
}

interface readDataProps {
    collectionName: string,
    uid: string,
}


const useFirestore = () => {


    const writeData = async (collectionName: string, uid: string, data: object) => {
        try {
            const docRef = setDoc(doc(db, collectionName, uid), data)

            console.log('Document written with ID: ', docRef);

        } catch (error) {
            console.log('Error adding document: ', error);

        }
    }

    const readData = async ({ collectionName, uid }: readDataProps): Promise<DocumentData | undefined> => {

        const docRef = doc(db, collectionName, uid);
        const docSnap = await getDoc(docRef);


        if (docSnap.exists()) {
            const documentData = docSnap.data()

            return documentData;
        } else {
            console.log('No such documents!');
        }
    }


    return { writeData, readData };
}

export default useFirestore;