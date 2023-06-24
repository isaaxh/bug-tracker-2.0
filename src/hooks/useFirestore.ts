import { setDoc, doc, getDoc, updateDoc, DocumentData } from "firebase/firestore";
import { db } from "../firebase";
import { User, updateProfile } from "firebase/auth";
import { useState } from "react";

export interface writeDataProps {
    collectionName: string,
    uid: string,
    data: object
}

export interface readDataProps {
    collectionName: string,
    uid: string,
}

export interface updateDataPropsType {
    currentUser: User,
    collectionName: string,
    data: { [x: string]: any; },
    docId: string,
}

const useFirestore = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const writeData = async (collectionName: string, uid: string, data: object) => {
        setLoading(true)
        setError("")

        try {
            const docRef = setDoc(doc(db, collectionName, uid), data)

            console.log('Document written with ID: ', docRef);
            setLoading(false)

        } catch (error) {
            console.log('Error adding document: ', error);
            setError("Failed to save data...")
        }
    }

    const readData = async ({ collectionName, uid }: readDataProps): Promise<DocumentData | undefined> => {
        setLoading(true)
        setError("")

        const docRef = doc(db, collectionName, uid);
        const docSnap = await getDoc(docRef);


        if (docSnap.exists()) {
            const documentData = await docSnap.data()
            // console.log(documentData);

            setLoading(false)
            return documentData;
        } else {
            // console.log('No such documents!');
            setError("Failed to load data")
        }
    }

    const updateData = async ({ currentUser, collectionName, data, docId }: updateDataPropsType) => {
        setLoading(true)
        setError("")

        if (!currentUser) {
            setError("Document ID invalid")
            return;
        }
        if (data.displayName === "") {
            setError("Invalid name");
            return;
        }

        try {
            await updateProfile(currentUser, {
                displayName: data.displayName,
            });
            await updateDoc(doc(db, collectionName, docId), data)

            setLoading(true)
        } catch (error) {
            // console.log(error);
            setError('Failed to update information')
        }
    }


    return { writeData, readData, updateData, error, loading, setError, setLoading };
}

export default useFirestore;