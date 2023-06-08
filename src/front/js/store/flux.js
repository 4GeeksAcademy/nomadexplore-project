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
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
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
                    compras: 0,
                    gastronomia: 0,
                    enologia: 0,
                    urban: 0,
                    relax: 0,
                    vidaNocturna: 0,
                    museos: 0
                };

                setStore({ userSelections: initialUserSelections });
            },

            // getMessage: async () => {
            //     try {
            //         const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
            //         const data = await resp.json();
            //         setStore({ message: data.message });
            //         return data;
            //     } catch (error) {
            //         console.log("Error loading message from backend", error);
            //     }
            // },

        }
    };
};

export default getState;