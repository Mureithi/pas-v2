import { loginRequests } from '../login/data'; // Ensure this path is correct
import { useUserStore } from '../../store/userStore'; // Import the user store
import useLoginStore from '../../store/loginStore'; // Import the login store

// import { startProcessing, processingError, setUser } from './utils'; // Import relevant utility functions
import { encrypt, decryptID } from '../../utils/encryption'; // Import encryption function


/**
 * System login with OTP
 * @param params The login parameters
 * @param actions Additional actions
 */
export const loginOtp = async (params: any, actions: any) => {
  const { browser, lookup, reset } = actions;
  const setLoginParams = useLoginStore.getState().setLoginParams;
  const setError = useLoginStore.getState().setError;
  const setUserId = useLoginStore.getState().setUserId;
  const setShowSpinner = useLoginStore.getState().setShowSpinner;
  const setShowOtpForm = useLoginStore.getState().setShowOtpForm;
  const setRememberMe = useLoginStore.getState().setRememberMe;

  setLoginParams(params);

  try {
    const isProductionEnv = ['production', 'staging', 'develop', 'uat'].includes(process.env.NEXT_PUBLIC_ENV || '');
    const pa = isProductionEnv ? { ...params, browser, lookup } : params;

    const response = await loginRequests.loginOtp(pa);

    if (response.data.data.status === 'inactive') {
      setError({ message: 'Sorry, your account is temporarily suspended' });
    } else {
      setUserId(response.data.data.user_id);

      if (response.data.data.verified) {
        if (decryptID(process.env.NEXT_PUBLIC_HASHING_SALT || '', response.data.data.verified) === 'true') {
          appLogin(pa, { browser, lookup, reset });
        } else {
          setUserId(response.data.data.user_id);
          setShowSpinner(false);
          setShowOtpForm(true);
          setRememberMe(pa.remember_me);
          reset();
        }
      }
    }
  } catch (error) {
    //   processingError(error);
    setError({ message: 'Error occured' });
  }
};

export const appLogin = async (params: any, actions: any) => {
  const { browser, lookup } = actions;
  const setUser = useUserStore.getState().setUser;
  const setLoggedIn = useLoginStore.getState().setLoggedIn;


  try {
    const isProductionEnv = ['production', 'staging', 'develop', 'uat'].includes(process.env.NEXT_PUBLIC_ENV || '');
    const requestData = isProductionEnv ? { ...params, browser, lookup } : params;

    await loginRequests.apiLogin(); // Ensure CSRF token is set

    const { data } = await loginRequests.login(requestData);

    const user = {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      secondary_email: data.secondary_email,
      company: data.company,
      website: data.website,
      role_id: data.role_id,
      tos_check: data.tos_check,
      licensee: data.licensee,
      onboarding: data.onboarding,
      monthly_income: data.monthly_income,
      meeting_url: data.meeting_url,
      calendarurls: data.calendarurls,
      annual_income: data.annual_income,
      show_tour: data.show_tour,
      prospects_notify: data.prospects_notify,
      trainings: data.trainings,
      integrations: data.integrations,
      module_sets: data.module_sets,
      profile_pic: data.profile_pic,
      title: data.title,
      location: data.location,
      time_zone: data.time_zone,
      phone_number: data.phone_number,
      birthday: data.birthday,
      facebook: data.facebook,
      twitter: data.twitter,
      linkedin: data.linkedin,
      status: data.status,
      created_at: data.created_at,
      pas_token: data.access_token,
    };

    setUser(user);
    localStorage.setItem('pas-token', data.access_token);

    const salt = process.env.NEXT_PUBLIC_HASHING_SALT || '';
    if (salt) {
      const encryptedUser = encrypt(window.btoa(JSON.stringify(user)), salt);
      if (encryptedUser) {
        localStorage.setItem('pas-user', encryptedUser);
      } else {
        throw new Error('Failed to encrypt user data');
      }
    } else {
      throw new Error('Encryption salt is not defined');
    }

    setLoggedIn(true);

    // Return the user data after a successful login
    return user;

  } catch (error) {
    setLoggedIn(false);
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      console.error('Login error:', error);
      console.log('error :>> ', error);
    }
  }
};
