import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import {
  ComputerIcon,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  SearchCheck,
  User,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { Select } from 'antd';

const SignUpPage = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchkey, setSearchkey] = useState('');
  const [searchInfo, setSearchInfo] = useState([]);
  const [productSearch, setProductSearch] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [isCompletRegistration, setIsCompleteRegistration] = useState(false)

  const inputRef = useRef([]);

  const { signup, isSigningUp,userIdforOtp,VerifyEmail } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error('Full name is required');
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error('Invalid email format');
    if (!formData.password) return toast.error('Password is required');
    if (formData.password.length < 6)
      return toast.error('Password must be at least 6 characters');

    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const success = validateForm();

    if (success) {
      const updatedFormData = {
        ...formData,
        field: selectedSkills,
      };
      signup(updatedFormData,setIsCompleteRegistration);
      
    }
  };

  const searchQuery = async () => {
    try {
      const result = await axiosInstance.get(
        `/userdash/searchtecStack/${searchkey}`
      );
      console.log('result...', result);

      UpdateProductSearch(searchkey, result.data.searchResult || []);
      setSearchInfo(result.data.searchResult || []);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong!';
      console.log(errorMessage);
    }
  };
  const UpdateProductSearch = function (key, value) {
    setProductSearch({
      ...productSearch,
      [key]: value,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchkey === '') {
        setSearchInfo([]);
      } else {
        if (productSearch[searchkey]) {
          setSearchInfo(productSearch[searchkey]);
          console.log(true);
        } else {
          searchQuery();
          console.log(false);
        }
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchkey,isCompletRegistration]);

  const department = [
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Data Science', value: 'data-science' },
  ];
  const handleRemoveSkill = index => {
    setSelectedSkills(prev => prev.filter((_, i) => i !== index));
  };

  const onsubmitEmailverify = async (e) => {
    try {
      e.preventDefault()
      const otp = (inputRef.current.map(e => e.value)).join('')
      VerifyEmail(otp,userIdforOtp)
    } catch (error) {
      console.log(error);
      
      //toast.error(error.response.data.message || error.message);
    }
  }

  const handlePast = (e) => {
    const past = e.clipboardData.getData('text');
    const pastarray = past.split('')
    pastarray.forEach((cha, index) => {
      inputRef.current[index].value = cha;
    })
  }

  const handileInput = (e, index) => {
    if (e.target.value > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRef.current[index - 1].focus()
    }
  }


  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
          {
            !isCompletRegistration && <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full pl-10`}
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={e =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    className={`input input-bordered w-full pl-10`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-control ">
                <label className="label">
                  <span className="label-text font-medium">Area of interest</span>
                </label>
                {selectedSkills.length !== 0 && (
                  <div className="flex flex-wrap gap-4  pb-2">
                    {selectedSkills.map((item, index) => (
                      <div
                        key={index}
                        className="relative bg-gray-800 py-2 px-5 rounded-lg"
                      >
                        <X
                          size={12}
                          className="absolute text-white bg-gray-600 rounded-full top-1 right-1"
                          onClick={() => handleRemoveSkill(index)}
                        />
                        <h1 className="text-white">{item}</h1>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="relative "
                  onMouseEnter={() => {
                    setShowSearchBar(true);
                    if (searchkey === '') setSearchInfo([]);
                  }}
                >
                  <div className="relative  mt-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                      <SearchCheck className="size-5 text-base-content/40" />
                    </div>
                    <input
                      type=""
                      className={`input input-bordered w-full pl-10`}
                      placeholder="Serach here"
                      value={searchkey}
                      onChange={e => setSearchkey(e.target.value)}
                    />
                  </div>
                  {showSearchBar && (
                    <div
                      onMouseLeave={() => setShowSearchBar(false)}
                      className="absolute w-full h-auto max-h-[200px] bg-[#2e2e30] z-10 rounded-b-xl mt-2 overflow-y-scroll hide-scrollbar  "
                    >
                      {searchInfo &&
                        searchInfo.length != 0 &&
                        searchInfo.map(item => (
                          <div
                            key={item}
                            className="border-b border-gray-700 py-2 pl-4 rounded-md text-white hover:bg-gray-800 cursor-pointer"
                            onClick={() => {
                              if (!selectedSkills.includes(item)) {
                                setSelectedSkills([...selectedSkills, item]);
                              }
                            }}
                          >
                            <p>{item}</p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`input input-bordered w-full pl-10`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40" />
                    ) : (
                      <Eye className="size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          }


          {
            isCompletRegistration && <div>
              <form onSubmit={onsubmitEmailverify} className='bg-gray-100 p-8 rounded-lg shadow-lg w-full text-sm'>
                <h1 className='text-center text-gray-900 text-2xl font-semibold mb-4'>Email Verify OTP</h1>
                <p className='text-center mb-4 text-gray-500'>Enter the 6-digit code send to your email id.</p>
                <div className='flex justify-between mb-8' onPaste={handlePast}>
                  {
                    Array(6).fill(0).map((_, index) => {
                      return (
                        <div>
                          <input ref={e => inputRef.current[index] = e}
                            onInput={e => handileInput(e, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                            className='rounded-md w-9 sm:w-12 h-9 sm:h-12 bg-gray-300 hover:bg-gray-400 outline-none text-black text-center text-xl' type="text" maxLength={1} key={index} required />
                        </div>
                      )
                    })
                  }
                </div>
                <button className='w-full py-3 bg-gray-300 hover:bg-gray-400 hover:text-white rounded-full text-gray-900 text-lg'>Verify email</button>
              </form>
            </div>
          }



          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUpPage;

