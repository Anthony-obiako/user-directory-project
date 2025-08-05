import { User } from "@/types";
import { Mail, MapPin } from "lucide-react";
import Image from "next/image";

export const UserCard = ({ user, onClick }: { user: User; onClick: () => void; }) => {
  return (
    <div 
      className={`rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer p-6 border dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-xl dark:shadow-gray-700/10 bg-white border-gray-100`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <Image
          width={80}
          height={80}
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
          loading="lazy"
          className={`w-20 h-20 rounded-full mb-4 object-cover ring-2 dark:ring-gray-600 ring-gray-100`}
        />
        <h3 className={`text-lg font-semibold mb-2 transition-colors duration-200 dark:text-gray-100 text-gray-900`}>
          {user.name.first} {user.name.last}
        </h3>
        <p className={`text-sm mb-2 flex items-center transition-colors duration-200 dark:text-gray-300 text-gray-600`}>
          <Mail className={`w-4 h-4 mr-1 dark:text-gray-400 text-gray-400`} />
          {user.email}
        </p>
        <p className={`text-sm flex items-center transition-colors duration-200 dark:text-gray-300 text-gray-600`}>
          <MapPin className={`w-4 h-4 mr-1 dark:text-gray-400 text-gray-400`} />
          {user.location.city}, {user.location.country}
        </p>
      </div>
    </div>
  );
};