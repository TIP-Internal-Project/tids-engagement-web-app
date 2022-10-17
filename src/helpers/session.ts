import jwtDecode from 'jwt-decode'
import OIDCResponse from '../interfaces/OIDCResponse'
import UserProfile from '../interfaces/UserProfile'
// import { featureApi } from '../services/featureApi'
// import { teamMemberApi } from '../services/teamMemberApi'
import { useAppDispatch } from '../redux/hooks'
import {
	storeAccessToken,
	storeEmail,
	storeFamilyName,
	storeGivenName,
	storeIdToken,
	storeName,
	storeNonce,
	storePreferredUsername,
	storeRole,
	storeState,
	storeWorkdayId,
} from '../redux/userSessionSlice'

export function extractSessionDetails(response: OIDCResponse) {
	const dispatch = useAppDispatch()
	const userProfile = jwtDecode<UserProfile>(response.id_token)
	dispatch(storeNonce(userProfile.nonce))
	dispatch(storeEmail(userProfile.email))
	dispatch(storeFamilyName(userProfile.family_name))
	dispatch(storeGivenName(userProfile.given_name))
	dispatch(storeName(userProfile.name))
	dispatch(storePreferredUsername(userProfile.preferred_username))
	dispatch(storeAccessToken(response.access_token))
	dispatch(storeIdToken(response.id_token))
	dispatch(storeState(response.state))
	
	/*
	* Once backend API is available, we'll need to look for user role.
	*/
	// console.log('userProfile',userProfile);
	// (async () => {
	// 	let userWorkdayId = '00000000'
	// 	let userRole = 'TEAM_MEMBER'

	// 	try {
	// 		const teamMemberInfos = await teamMemberApi.getIndividualTeamMember(userProfile.email)
	// 		if (teamMemberInfos.length > 0) userWorkdayId = teamMemberInfos[0].workdayId
	// 	} catch (error) {
	// 		console.log(`Error fetching Workday ID for ${userProfile.email}`, error)
	// 	}

	// 	if (userWorkdayId) {
	// 		try {
	// 			const featureInfos = await featureApi.getFeatureInfo('SupOrgAssignment', userWorkdayId)
	// 			if (featureInfos.length > 0) userRole = featureInfos?.[0]?.feature?.[0]?.code ?? ''
	// 		} catch (error) {
	// 			console.log(`Error fetching user role for Workday ID ${userWorkdayId}`, error)
	// 		}
	// 	}
	// 	console.log(`User Workday ID: ${userWorkdayId}`)
	// 	dispatch(storeWorkdayId(userWorkdayId))

	// 	console.log(`User Role: ${userRole}`)
	// 	dispatch(storeRole(userRole))
	// })()
	dispatch(storeWorkdayId('00000000'))
	dispatch(storeRole('team_member'))
}
