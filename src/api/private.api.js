import { Post, Get, Put } from "../service/http.service"
import { USER, GENERATE_EMAIL_OTP, VERIFY_EMAIL_OTP, DASHBOARD, TOURNAMENT, UPCOMING_TOURNAMENT, INITIATE_PAYMENT, VALIDATE_PAYMENT, TRANSACTIONS, ADD_GAME_USER_ID, JOIN_TOURNAMENT, TOURNAMENT_PARTICIPENTS, WALLET_TANSACTIONS, ORGANIZER, JOINED_TOURNAMENT, NOTIFICATION, RANKING } from "../constant/api.constant"

class PrivateApi {
    static GetUser = () => {
        return Get({ url: USER });
    }

    static SetUser = (params) => {
        return Put({ url: USER, body: params });
    }

    static GenerateEmailOTP = () => {
        return Get({ url: GENERATE_EMAIL_OTP })
    }

    static VerifyEmailOTP = (otp) => {
        return Post({ url: VERIFY_EMAIL_OTP, body: { otp } });
    }

    static DashboardMeta = () => {
        return Get({ url: DASHBOARD });
    }

    static CreateTournament = (params) => {
        return Post({ url: TOURNAMENT, body: params });
    }

    static GetDashboardTournaments = (query) => {
        return Get({ url: `${TOURNAMENT}${query}` });
    }

    static GetTournament = (id) => {
        return Get({ url: `${TOURNAMENT}/${id}` })
    }

    static GetJoinedTournaments = () => {
        return Get({ url: JOINED_TOURNAMENT });
    }

    static UpdateTournament = (id, params) => {
        return Put({ url: `${TOURNAMENT}/${id}`, body: params });
    }

    static UpcomingTournament = () => {
        return Get({ url: UPCOMING_TOURNAMENT });
    }

    static InitiatePayment = (body) => {
        return Post({ url: INITIATE_PAYMENT, body })
    }

    static ValidatePayment = (body) => {
        return Post({ url: VALIDATE_PAYMENT, body });
    }

    static GetTransactions = () => {
        return Get({ url: TRANSACTIONS });
    }

    static AddGameUserId = (gameId, body) => {
        return Post({ url: `${ADD_GAME_USER_ID}/${gameId}`, body })
    }

    static JoinTournament = (id, body) => {
        return Post({ url: `${JOIN_TOURNAMENT}/${id}`, body });
    }

    static GetParticipents = (id) => {
        return Get({ url: `${TOURNAMENT}/${id}/${TOURNAMENT_PARTICIPENTS}` })
    }

    static GetWalletTransactions = () => {
        return Get({ url: WALLET_TANSACTIONS })
    }

    static GetOrganizerProfile = () => {
        return Get({ url: ORGANIZER })
    }

    static CreateOrganizerProfile = (body) => {
        return Post({ url: ORGANIZER, body })
    }

    static SetOrganizerProfile = (body) => {
        return Post({ url: ORGANIZER, body })
    }

    static GetNotifications = () => {
        return Get({ url: NOTIFICATION })
    }

    static SetRanking = (id, body) => {
        return Post({ url: `${RANKING}/${id}`, body })
    }
}

export default PrivateApi;