const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            userSelections: {
                cultura: 0,
                naturaleza: 0,
                gastronomia: 0,
                playa: 0,
                entretenimiento: 0,
                aventura: 0
            },
        },
        actions: {
            addUserSelection: (category, value) => {
                const store = getStore();

                const updatedUserSelection = {
                    ...store.userSelections,
                    [category]: store.userSelections[category] + value
                };

                setStore({ userSelections: updatedUserSelection });
            },
            resetUserSelections: () => {
                const initialUserSelections = {
                    cultura: 0,
                    naturaleza: 0,
                    gastronomia: 0,
                    playa: 0,
                    entretenimiento: 0,
                    aventura: 0
                };

                setStore({ userSelections: initialUserSelections });
            },
        }
    };
};

export default getState;