export const USER = 'user';
export const GENERATE_OTP = 'user/generate-otp';
export const VERIFY_OTP = 'user/verify-otp';
export const RESEND_OTP = 'user/resend-otp';
export const GENERATE_EMAIL_OTP = 'user/ganerate-email-otp';
export const VERIFY_EMAIL_OTP = 'user/verify-email-otp';
export const DASHBOARD = 'dashboard';
export const TOURNAMENT = 'tournament';
export const UPCOMING_TOURNAMENT = `${TOURNAMENT}/upcoming`;
export const JOINED_TOURNAMENT = `${TOURNAMENT}/joined`;
export const GAME = 'game';
export const PAYMENT = 'payment';
export const INITIATE_PAYMENT = `${PAYMENT}/initiate`;
export const VALIDATE_PAYMENT = `${PAYMENT}/validate`;
export const TRANSACTIONS = `${PAYMENT}/transactions`;
export const ADD_GAME_USER_ID = `${USER}/add-game-user-id`;
export const JOIN_TOURNAMENT = `${TOURNAMENT}/join`;
export const TOURNAMENT_PARTICIPENTS = 'participents';
export const WALLET_TANSACTIONS = `${USER}/wallet/transactions`;
export const ORGANIZER = 'organizer';
export const NOTIFICATION = 'notification';
export const RANKING = `${TOURNAMENT}/ranking`;
export const OFFER = 'offer';
export const MY_TOURNAMENT = `${TOURNAMENT}/my`;
export const BATTLE = 'battle';
export const JOIN_BATTLE = `${BATTLE}/join`;
export const BANK = `${USER}/bank`;
export const GET_LATEST_VERSION = 'getApp/latest';
export const SCORECARD = 'scorecard';
export const COMPLETED = 'completed';