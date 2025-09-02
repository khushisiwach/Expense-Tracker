import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveFile = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className='flex justify-center mb-6'>
            <input 
                type='file' 
                ref={inputRef}
                className='hidden'
                accept='*/*' 
                onChange={handleFileChange} 
            />

            {!image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full relative'>
                    <LuUser className='text-4xl text-blue-700' />
                    <button 
                        type='button'
                        onClick={onChooseFile}
                        className='w-8 h-8 flex items-center justify-center bg-blue-700 text-white rounded-full absolute -bottom-1 right-0'
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img 
                        src={previewUrl} 
                        alt='Uploaded File' 
                        className='h-20 w-20 rounded-full object-cover'
                    />
                    <button 
                        onClick={handleRemoveFile}
                        className='h-8 w-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;