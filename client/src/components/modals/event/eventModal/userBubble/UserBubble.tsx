import React from "react";

interface Props {
  image_url: string;
  display_name: string;
}
// on hover, display name
const UserBubble: React.FC<Props> = ({ image_url, display_name }: Props) => {
  return (
    <>
      <img
        className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
        src={image_url}
        title={display_name}
        alt=""
      />
    </>
  );
};

export default UserBubble;
