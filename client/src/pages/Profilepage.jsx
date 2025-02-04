import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { User, Mail, Phone, Calendar, UserCircle, Heart } from 'lucide-react';

const Profilepage = () => {
  const [profile, setProfile] = useState({
    username: '',
    name: '',
    gender: '',
    age: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          credentials: 'include'
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ msg: 'Error fetching profile' }));
          console.error('Error fetching profile:', errorData);
          toast.error(errorData.msg);
          return;
        }

        const data = await response.json();
        console.log('Fetched profile data:', data);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ msg: 'Error updating profile' }));
        console.error('Error updating profile:', errorData);
        toast.error(errorData.msg);
        return;
      }

      const result = await response.json();
      console.log('Update result:', result);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  const getIcon = (key) => {
    switch (key) {
      case 'username': return <UserCircle className="w-5 h-5" />;
      case 'name': return <User className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'phone': return <Phone className="w-5 h-5" />;
      case 'age': return <Calendar className="w-5 h-5" />;
      case 'gender': return <Heart className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Header and Info */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2">Your Profile</h2>
            <p className="text-blue-100 mb-4">Manage your personal information</p>
            <div className="hidden md:block">
              <p className="mb-2 text-sm">✓ View your details</p>
              <p className="mb-2 text-sm">✓ Update information</p>
              <p className="text-sm">✓ Keep your profile current</p>
            </div>
          </div>

          {/* Right Side - Profile Form */}
          <div className="p-6">
            <div className="space-y-4">
              {Object.keys(profile).map((key) => (
                <div key={key} className="relative">
                  <div className="flex items-center space-x-3 mb-1">
                    {getIcon(key)}
                    <span className="text-sm font-medium text-gray-600 capitalize">{key}</span>
                  </div>
                  {isEditing ? (
                    <input
                      type={key === 'age' ? 'number' : 'text'}
                      name={key}
                      value={profile[key]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder={`Enter your ${key}`}
                    />
                  ) : (
                    <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm">
                      {profile[key]}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 mt-6"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profilepage;