import { gql } from 'apollo-boost';

export const GenerateOtpMutation = gql`
mutation($mobile: String!) {
    generateOtp(input: { mobile: $mobile }) {
        id
    }
}
`

export const LogoutMutation = gql`
mutation {
    logout
}
`

export const ResendOtp = gql`
mutation($id: String!) {
    resendOtp(
        input:{
            id: $id
        }
    ) {
        id
    }
}
`

export const SetFirebaseToken = gql`
mutation($firebaseToken: String!) {
    setFirebaseToken(firebaseToken: $firebaseToken) {
        firebase_token
    }
}
`

export const VerifyOtpMutation = gql`
mutation($mobile: String!, $otp: String!) {
    verifyOtp(input: { mobile: $mobile, otp: $otp }) {
        token
        user {
            id
        }
    }
}
`;

export const AddOrganizerMutation = gql`
    mutation($organizer_name: String!, $organizer_logo: String, $upi_address: String) {
        addOrganizer(
            input : {
                organizer_name: $organizer_name,
                organizer_logo: $organizer_logo,
                upi_address: $upi_address
            }
        ) {
            organizer_name
            organizer_logo
            upi_address
        }
    }
`;

export const AddTournamentMutation = gql`
mutation($name: String!, $game_id: ID!, $description: String!,  $team_size: Int!, $min_size: Int!, $max_size: Int!, $registration_start: String!, $registration_end: String!, $tournament_start: String!, $tournament_end: String!, $organizer_id: ID!) {
    createTournament(
        input: {
            name: $name
            game_id: $game_id
            description: $description
            team_size: $team_size
            min_size: $min_size
            max_size: $max_size
            registration_start: $registration_start
            registration_end: $registration_end
            tournament_start: $tournament_start
            tournament_end: $tournament_end
        },
        organizer_id: $organizer_id
    ) {
        id
        name
    }
}
`;

export const AddTournamentMetaMutation = gql`
mutation($input: [TournamentMetaInput!], $tournament_id: ID! ) {
    setTournamentMeta(input: $input, tournament_id: $tournament_id)
}
`

export const AddTournamentPaymentMutation = gql`
mutation($entry_fee: String!, $prize_pool: String!, $game_type_id: ID!, $tournament_rank_payment: [TournamentRankPaymentInput], $tournament_reward_payment: [TournamentRewardPaymentInput], $tournament_id: ID!) {
    addTournamentPayment(
        input: {
            entry_fee: $entry_fee,
            prize_pool: $prize_pool,
            game_type_id: $game_type_id,
            tournament_rank_payment: $tournament_rank_payment,
            tournament_reward_payment: $tournament_reward_payment,
        },
        tournament_id: $tournament_id
    )
}
`

export const PublishTournamentMutation = gql`
mutation($id: ID!) {
    publishTournament(tournament_id: $id)
}
`

export const DeleteTournamentMutation = gql`
mutation($id: ID!) {
    deleteTournament(tournament_id: $id)
}
`

export const AddTournamentRoomMutation = gql`
mutation($room: TournamentRoomInput!, $tournament_id: ID!) {
    addTournamentRoom(
        input: $room
        tournament_id: $tournament_id
    )
}
`

export const AddGameUserIdMutation = gql`
mutation($game_id: ID!, $game_username: String!) {
    addGameUserId(game_id: $game_id, game_username: $game_username) {
        game_username
    }
}
`;

export const GenerateOrderMutation = gql`
mutation($amount: Int!, $source: String!) {
    generatePaymentOrder(amount:$amount, source: $source) {
        id
        status
        amount
        order_id
        payment_sorce
        error_response
        success_response
        generate_response
    }
}
`

export const VerifyOrderMutation = gql`
mutation($payment_response: String!, $source: String!) {
    validatePaymentOrder(payment_response: $payment_response, source: $source) {
        id
        status
        amount
    }
}
`;

export const AddBankAccountMutation = gql`
mutation($ifsc: String, $user_name: String, $account_number: String) {
    updateBankDetails(input: {
        ifsc: $ifsc,
        user_name: $user_name,
        account_number: $account_number
    }) {
        bank_account {
        ifsc
        user_name
        account_number
        }
    }
}
`;