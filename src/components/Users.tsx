import { User } from '@/types';
import Image from 'next/image';
import React, { Fragment } from 'react'

interface UsersProps {
  users: User[];
}

const Users = ({users}:UsersProps) => {
  return (
  <Fragment>
    {users && users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.login.uuid}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    width={64}
                    height={64}
                    src={user.picture.medium}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="w-16 h-16 rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {user.name.first} {user.name.last}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) :  (
          <div className="text-center flex items-center justify-center flex-col py-12 w-full">
            <svg className="w-24 h-24 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <p className="text-gray-500 dark:text-gray-400 mb-4">No users found</p>
          </div>
        )}
  </Fragment>
  )
}

export default Users