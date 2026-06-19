import axios from "axios";

export const getAllCharacters = (page) => {

    return async (dispatch) => {

        const response = await axios.get(
            `https://rickandmortyapi.com/api/character?page=${page}`
        );

        dispatch({
            type: "GET_CHARACTERS",
            payload: {
                characters: response.data.results,
                totalPages: response.data.info.pages
            }
        });
    };
};