import { User } from "@/types";
import { Mail, MapPin, Shield, X } from "lucide-react";
import { useEffect, useLayoutEffect } from "react";

export const UserDetailsModal = ({ user, onClose }: { user: User; onClose: () => void }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            User Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
                className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
              />
            </div>
            
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</span>
                    <p className="text-gray-900 dark:text-gray-100">
                      {user.name.title} {user.name.first} {user.name.last}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</span>
                    <p className="text-gray-900 dark:text-gray-100 capitalize">{user.gender}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Age</span>
                    <p className="text-gray-900 dark:text-gray-100">{user.dob.age} years old</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</span>
                    <p className="text-gray-900 dark:text-gray-100">{formatDate(user.dob.date)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</span>
                    <p className="text-gray-900 dark:text-gray-100">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</span>
                    <p className="text-gray-900 dark:text-gray-100">{user.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Cell</span>
                    <p className="text-gray-900 dark:text-gray-100">{user.cell}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Location
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</span>
                    <p className="text-gray-900 dark:text-gray-100">
                      {user.location.street.number} {user.location.street.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">City</span>
                    <p className="text-gray-900 dark:text-gray-100">{user.location.city}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">State</span>
                    <p className="text-gray-900 dark:text-gray-100">{user.location.state}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</span>
                    <p className="text-gray-900 dark:text-gray-100">{user.location.country}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Postcode</span>
                    <p className="text-gray-900 dark:text-gray-100">{user.location.postcode}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Timezone</span>
                    <p className="text-gray-900 dark:text-gray-100">{user.location.timezone.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Account Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</span>
                    <p className="text-gray-900 dark:text-gray-100">{user.login.username}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Nationality</span>
                    <p className="text-gray-900 dark:text-gray-100">{user.nat}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Registered</span>
                    <p className="text-gray-900 dark:text-gray-100">{formatDate(user.registered.date)}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Member for</span>
                    <p className="text-gray-900 dark:text-gray-100">{user.registered.age} years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};