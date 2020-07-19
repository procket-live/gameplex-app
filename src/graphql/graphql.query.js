import { gql } from 'apollo-boost';

export const UserQuery = gql`
query {
    me {
        id
        name
        username
        email
        wallet {
            wallet_win_balance
            wallet_cash_balance
            wallet_bonous_balance
        }
        mobile
        is_mobile_verified
        profile_image
    }
}
`

export const UserIdQuery = gql`
query {
    me {
        id
    }
}
`


export const UserProfileImageQuery = gql`
query {
    me {
        profile_image
    }
}
`

export const OffersQuery = gql`
query {
    offers {
        message
        image
        name
        route
        params
    }
}
`

export const GetPlayground = gql`
    query {
        getPlayground {
            id
            game {
                name
                id
                thumbnail
            }
    }
}
`

export const GetPlaygroundDetail = gql`
    query($playground_id: String!) {
    getPlaygroundDetail(playground_id: $playground_id) {
        id
        tournaments {
            id
            name
            game {
                id
                name
                wallpaper
            }
            status
            tournament_start
            tournament_end
            registration_start
            registration_end
            min_size
            max_size
            team_size
            tournament_meta {
                key
                value
            }
            game_type {
                key
            }
            tournament_payment {
                entry_fee
                prize_pool
                tournament_reward_payment {
                    key {
                        key
                    }
                    amount
                }
                tournament_rank_payment {
                    amount
                    rank
                }
            },
            organizer {
                organizer_name
                organizer_logo
                verified
            }
        }
    },
    }
`;

export const GetOrganizerProfile = gql`
query {
    organizer {
        id
        verified
        organizer_name
        organizer_logo
        upi_address
        is_profile_set
    }
}
`
export const GetOrganizerTournamentCount = gql`
query($id: String!) {
	countTournament(id: $id) {
        active
        draft
        completed
        pending
}
}
`;

export const GetGameList = gql`
query {
  getGamesList {
    id
    name
    thumbnail
  }
}
`
export const GetOrganizerTournamentList = gql`
query($id: ID!, $status: String!) {
  getOrganizerTournamentList(organizer_id: $id, status: $status) {
    id
    name
    status
    tournament_start
    registration_start
    game{
        name
      thumbnail
    }
  }
}
`

export const GetTournamentQuery = gql`
query($id: ID!) {
    getTournament(id: $id) {
        id
        name
        game {
            id
            name
            thumbnail
        }
        status
        tournament_start
        tournament_end
        registration_start
        registration_end 
        min_size
        tournament_room {
            room_id
            room_password
        }
        max_size
        team_size
        tournament_meta {
            key
            value
        }
        game_type {
            id
        }
        tournament_payment {
            id
        }
    }
}
`;

export const GetFullTournamentQuery = gql`
query($id: ID!) {
    getTournament(id: $id) {
            id
            name
            game {
                id
                name
                wallpaper
            }
            status
            tournament_start
            tournament_end
            registration_start
            registration_end
            min_size
            max_size
            team_size
            tournament_meta {
                key
                value
            }
            game_type {
                key
            }
            tournament_payment {
                entry_fee
                prize_pool
                tournament_reward_payment {
                    key {
                        key
                    }
                    amount
                }
                tournament_rank_payment {
                    amount
                    rank
                }
            },
            organizer {
                organizer_name
                organizer_logo
                verified
            }
    }
}
`

export const GetGameMetaQuery = gql`
query($id: ID!) {
    game(id: $id) {
            game_meta {
                key
                lookup_type { 
                    name
                    values {
                        value
                        name
                }
            }
        }
    }
}
`;

export const GetGameTypeQuery = gql`
query($game_id: ID!) {
game(id: $game_id) {
    game_type {
        id
        key
        payment_make {
        rank_based
        prize_pool_calculation
        reward_keys {
            id
            key
        }
        rank_calculation 
        }
    }
    }
}
`;

export const GetGameInstructionQuery = gql`
query($game_id: ID!, $category: String) {
    gameInstruction(game_id:$game_id, category: $category) {
        image
        name
        note
        message
    }
}
`;

export const GetGameUserIdQuery = gql`
query($game_id: ID!) {
    getGameUserId(game_id: $game_id) {
        game_username
    }
}
`;

export const GetWalletQuery = gql`
query {
    me {
        id
        wallet {
            wallet_win_balance
            wallet_cash_balance
            wallet_bonous_balance
        }
    }
}
`;

export const GetUserBasicDetailsQuery = gql`
query {
    me {
        id
        name
        email
        mobile
    }
}
`;

export const FetchOrdersQuery = gql`
query {
    fetchOrders {
        id
        status
        amount
        order_id
        payment_sorce
        created_at
    }
}
`;

export const GetBankAccountQuery = gql`
query {
    getBankAccount {
        ifsc
        user_name
        account_number
    }
}
`;