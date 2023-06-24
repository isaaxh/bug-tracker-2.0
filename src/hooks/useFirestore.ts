import { setDoc, doc, getDoc, updateDoc, DocumentData, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { User, updateProfile } from "firebase/auth";
import { useState } from "react";

export interface writeDataPropsType {
    collectionName: string,
    uid: string,
    data: object
}

export interface readDocPropsType {
    collectionName: string,
    uid: string,
}

export interface readAllDocsPropType {
    collectionName: string;
}

export interface docType {
    displayName: string;
    email: string;
    role: roleType;
    uid: string;
}

export interface roleType {
    manager: boolean;
    developer: boolean;
    admin: boolean;
}

// interface conditionPropType {
//     property: string;
//     condition: WhereFilterOp;
//     value: boolean;

// }

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

    const readDoc = async ({ collectionName, uid }: readDocPropsType): Promise<DocumentData | undefined> => {
        setLoading(true)
        setError("")

        const docRef = doc(db, collectionName, uid);
        const docSnap = await getDoc(docRef);


        if (docSnap.exists()) {
            const documentData = await docSnap.data()
            setLoading(false)
            return documentData;
        } else {
            setError("Failed to load data")
            setLoading(false)
        }
    }

    const condtion = {
        property: 'developers',
        condition: '==',
        value: true
    }

    const readAllDocs = async ({ collectionName }: readAllDocsPropType) => {

        // const q = query(collection(db, collectionName), where(condition.property, condition.condition, condition.value))

        let docArray: Array<DocumentData> = []
        const querySnapshot = await getDocs(collection(db, collectionName));
        await querySnapshot.forEach((doc) => {
            docArray.push(doc.data())
        })

        return docArray
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
            setError('Failed to update information')
        }

    }


    return { writeData, readDoc, readAllDocs, updateData, error, loading, setError, setLoading };
}

export default useFirestore;