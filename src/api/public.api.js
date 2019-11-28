import { Post, Get } from "../service/http.service"
import { GENERATE_OTP, VERIFY_OTP, RESEND_OTP, GAME } from "../constant/api.constant"

class PublicApi {
    static GenerateOTP = (mobile) => {
        return Post({ url: GENERATE_OTP, body: { mobile } });
    }

    static VerifyOTP = (mobile, otp) => {
        return Post({ url: VERIFY_OTP, body: { mobile, otp } });
    }

    static ResendOTP = (id) => {
        return Get({ url: `${RESEND_OTP}/${id}` });
    }

    static GetGames = () => {
        return Get({ url: GAME });
    }
}

export default PublicApi;