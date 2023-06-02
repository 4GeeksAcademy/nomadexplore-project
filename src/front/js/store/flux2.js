const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userSelections: {
			cultura: 0,
			compras: 0,
			gastronomia: 0,
			enologia: 0,
			urban: 0,
			relax: 0,
			vidaNocturna: 0,
			museos: 0,
			},
		},
		actions: {
			// Use getActions to call a function within a fuction

			
		}
	};
};

export default getState;
