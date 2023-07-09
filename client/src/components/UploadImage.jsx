import React, { useState, useEffect } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebase';

const UploadImage = ({ userID, username, quizId, getData, type, height, selectedURL = '' }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
  });
  const [image, setImage] = useState({ name: 'Choose a file' });
  const [imageUrl, setImageUrl] = useState(selectedURL);
  let folderName;
  const uploadFile = (img) => {
    if (img == null) return;
    // if (fileName != img.name || fileName == '') {
    //   fileName = img.name;
    // }
    switch (type) {
      case 'quiz':
        folderName = `${userID}-${username}/${type}/${img.name}`;
        break;
      case 'question':
        folderName = `${userID}-${username}/${type}/${quizId} - ${img.name}`;
        break;
      case 'avatar':
        folderName = `${userID}-${username}/${type}/${img.name}`;
        break;
      default:
        break;
    }

    const imageRef = ref(storage, folderName);
    uploadBytes(imageRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        getData(url);
        setImageUrl(url);
      });
    });
  };

  useEffect(() => {
    if (selectedURL != imageUrl) {
      setImageUrl(selectedURL);
    }
  }, [selectedURL]);
  return (
    <>
      <Dropzone>
        {({ getRootProps, getInputProps }) => (
          <>
            <div {...getRootProps()}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px dashed',
                  width: 'inherit',
                  height: 'fit-content',
                }}
              >
                <input
                  {...getInputProps()}
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    uploadFile(e.target.files[0]);
                  }}
                  accept="image/*"
                />
                {imageUrl !== '' ? (
                  <img style={{ width: '-webkit-fill-available' }} src={imageUrl} />
                ) : (
                  <AddPhotoAlternateOutlinedIcon sx={{ margin: `calc(${height}/2.5)` }} fontSize="large" />
                )}
              </div>
            </div>
            <aside>
              <p>{image.name}</p>
            </aside>
          </>
        )}
      </Dropzone>
    </>
  );
};

export default UploadImage;
