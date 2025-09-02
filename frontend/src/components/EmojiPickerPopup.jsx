import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    onSelect(emojiData?.imageUrl || emojiData?.emoji || ""); // Prefer image URL if available, fallback to emoji
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-600 rounded-lg">
          {icon ? (
            icon.startsWith("http") ? (
              <img src={icon} alt="Icon" className="w-10 h-10" />
            ) : (
              icon
            )
          ) : (
            <LuImage />
          )}
        </div>
        <p className="text-sm">{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>

      {isOpen && (
        <div className="relative z-50  w-40 h-40 rounded-xl">
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-48 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            height={400}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
