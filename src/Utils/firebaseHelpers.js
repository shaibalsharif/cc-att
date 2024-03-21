import { ref as dbRef, push  } from 'firebase/database';
import {getDownloadURL,ref, getStorage, uploadBytes} from 'firebase/storage'
import { realtime_db } from './firebaseConfig';
export const handleAddUser = async (user) => {
    const db = realtime_db
    const storage = getStorage();
    
    try {
        const photoRef = ref(storage, `userPhotos/${user.photo.name}`);
        
        await uploadBytes(photoRef, user.photo);
   
        // Get the download URL of the uploaded photo
        const photoUrl = await getDownloadURL(photoRef);
        const newUserData = await push(dbRef(db, 'users'), {...user,photoUrl:photoUrl });
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
        console.error('Error adding user: ', error);
    }
}