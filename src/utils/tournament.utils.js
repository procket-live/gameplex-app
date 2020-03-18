import moment from 'moment';
import { AccessNestedObject } from "./common.util";

/**
 * 
 * @param {Object} tournament 
 * 
 * @returns pending|registration_open|slot_full|registration_will_start|registration_closed|tournament_started
 */
export function GetTournamentStatus(tournament) {
  const status = AccessNestedObject(tournament, 'status');
  const registrationStartTime = AccessNestedObject(tournament, 'registration_opening');
  const registrationEndTime = AccessNestedObject(tournament, 'registration_closing');
  const tournamentStartTime = AccessNestedObject(tournament, 'tournament_start_time');
  const participents = AccessNestedObject(tournament, 'participents', []);
  const size = AccessNestedObject(tournament, 'size', 0);

  if (status == "pending") {
    return "pending";
  }

  if (participents.length == size) {
    return "slot_full"
  }

  if (moment().isBetween(moment(registrationStartTime), moment(registrationEndTime))) {
    return "registration_open"
  }

  if (moment(registrationStartTime).isAfter(moment())) {
    return "registration_will_start"
  }

  if (moment().isAfter(moment(registrationEndTime))) {
    return "registration_closed"
  }

  if (moment().isAfter(tournamentStartTime)) {
    return "tournament_started"
  }
}

export function GetUserGameId(user = {}, gameId = '') {
  const gameIds = AccessNestedObject(user, 'game_ids', []);

  const record = gameIds.find((item, index) => AccessNestedObject(item, 'game') == gameId);
  if (record && typeof record == 'object') {
    return {
      success: true,
      response: record.user_id
    }
  }

  return { success: false }
}

export function IsJoined(list = [], userId) {
  for (let i = 0; i < list.length; i++) {
    if (AccessNestedObject(list, `${i}.user`) == userId || AccessNestedObject(list, `${i}.user._id`) == userId) {
      return true;
    }
  }

  return false;
}