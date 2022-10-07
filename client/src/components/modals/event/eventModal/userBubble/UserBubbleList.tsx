import { IUserBubble } from "../../../../../types";
import UserBubble from "./UserBubble";
import { UseUser } from "../../../../../contexts/UserContext";
interface Props {
  users: IUserBubble[];
}

const UserBubbleList: React.FC<Props> = ({ users }: Props) => {
  // add more users
  const numBubbles = 2;
  const [user] = UseUser();
  const numPrivate = users.filter((user) => !user.is_public).length;
  return (
    <>
      {users.map((profile, index) => {
        if (index > numBubbles || !user || !profile.is_public) return null;
        return (
          <UserBubble
            key={profile._id + index}
            image_url={profile.profile_picture}
            display_name={profile.username}
          />
        );
      })}
      <div className="flex flex-row justify-center items-center">
        <h3 className="text-gray-500 text-sm font-semibold">
          {numPrivate === users.length || !user
            ? `${users.length} ${users.length === 1 ? "signup" : "signups"}`
            : users.length > numBubbles
            ? `+${users.length - numBubbles - 1 + numPrivate}`
            : ""}
        </h3>
      </div>
    </>
  );
};

export default UserBubbleList;
