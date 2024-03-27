import { ref as dbRef, push, get, query, equalTo, set } from 'firebase/database';
import { getDownloadURL, ref as storageRef, getStorage, uploadBytes } from 'firebase/storage';
import { realtime_db } from './firebaseConfig';

export const handleAddUser = async (user) => {
    const db = realtime_db;
    const storage = getStorage();

    try {
        const existingUserRef = dbRef(db, 'users/' + user.email.split(".").join("_"))
        const existingUserSnapshot = await get(existingUserRef);
        if (existingUserSnapshot.exists()) {
            console.log(`User with email ${user.email} already exists.`);
            return; // Don't proceed further if the user already exists
        }

        const photoRef = storageRef(storage, `userPhotos/${user.photo.name}`);
        await uploadBytes(photoRef, user.photo);
        // Get the download URL of the uploaded photo
        const photoUrl = await getDownloadURL(photoRef);
        delete user.photo;

        // Add user data with email as key

        const newUserData = await set(dbRef(db, 'users/' + user.email.split(".").join("_")), {
            ...user,
            photoUrl: photoUrl
        });
        console.log('New user added with ID: ', newUserData.key);
        // Reset form after submission
        // setFormData({
        //     name: '',
        //     email: '',
        //     gender: '',
        //     dob: '',
        //     branch: '',
        //     photo: null
        // });
    } catch (error) {
        console.log('Error adding user: ', error);
    }
}
