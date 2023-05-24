import { nanoid } from 'nanoid'
import { stringify } from 'query-string'

export default function Login() {
	// console.log("Outgoing OIDC login...");
	const authParams = stringify({
		'client_id': 'b6738de0-b3d7-0138-44d8-0ab92fbd89cc167174',
		'redirect_uri': 'http://localhost:3000/auth', // PR:'https://tidsengagementapp.ml/auth'
		'response_type': 'id_token token',
		scope: 'openid profile',
		state: nanoid(32),
		nonce: nanoid(32)
	})
	const authUrl = `${'https://telusinternational.onelogin.com/oidc/2/auth'}?${authParams}`
	window.location.assign(authUrl)
	return null
}