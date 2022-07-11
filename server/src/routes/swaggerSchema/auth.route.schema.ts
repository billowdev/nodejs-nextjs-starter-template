export const loginRouteSchema = {
	tags: ["auth"],
	body: {
		type: 'object',
		properties: {
			email: {
				type: 'string',
				format:'email',
			},
			password: {
				type: 'string',
			},
		}
	},
	response: {
		200: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					format: 'id'
				},
				email: {
					type: 'string',
					format: 'email',
				},
				name: {
					type: 'string',
					format: 'string',
				},
				surname: {
					type: 'string',
					format: 'id',
				},
				phone: {
					type: 'string',
					format: 'string',
				},
				accessToken: {
					type: 'string',
					format: 'string',
				}
			}
		}
	},
}

export const registerRouteSchema = {
	tags: ["auth"],
	body: {
		type: 'object',
		properties: {
			email: {
				type: 'string',
				format:'email',
			},
			password: {
				type: 'string',
			},
			name: {
				type: 'string',
			},
			surname: {
				type: 'string',
			},
			phone: {
				type: 'string',
			},
		}
	},
	response: {
		200: {
			type: 'object',
			properties: {
				email: {
					type: 'string',
					format: 'email'
				},
				password: {
					type: 'string',
					format: 'password',
				},
				name: {
					type: 'string',
					format: 'string',
				},
				surname: {
					type: 'string',
					format: 'id',
				},
				phone: {
					type: 'string',
					format: 'string',
				}
			}
		}
	},
}


export const isAuthenticatedRouteSchema = {
	tags: ["auth"],
	security: [{ apiKey: [] }],
	response: {
		200: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					format: 'id'
				},
				email: {
					type: 'string',
					format: 'email',
				},
				name: {
					type: 'string',
					format: 'string',
				},
				phone: {
					type: 'string',
					format: 'string',
				},
				surname: {
					type: 'string',
					format: 'id',
				},
				accessToken: {
					type: 'string',
					format: 'jwt',
				}
			}
		}
	},
}




export default {
	loginRouteSchema,
	isAuthenticatedRouteSchema,
	registerRouteSchema
}