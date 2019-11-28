import { Post, Get, Put } from "../service/http.service"
import { USER, GENERATE_EMAIL_OTP, VERIFY_EMAIL_OTP, DASHBOARD, TOURNAMENT, UPCOMING_TOURNAMENT } from "../constant/api.constant"

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

    static UpdateTournament = (id, params) => {
        return Put({ url: `${TOURNAMENT}/${id}`, body: params });
    }

    static UpcomingTournament = () => {
        return Get({ url: UPCOMING_TOURNAMENT });
    }
}

export default PrivateApi;