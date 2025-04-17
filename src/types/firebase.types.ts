import { UserCredential } from 'firebase/auth';

export interface ExtendedUserCredential extends UserCredential {
  _tokenResponse: {
    isNewUser: boolean;
  };
}
