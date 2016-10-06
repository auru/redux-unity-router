import queryString from 'query-string';

const parseLocation = location => {
    const query = queryString.parse(location.search);
    const state = location.state || {};

    return {
        ...location,
        query,
        state
    }
};

export default parseLocation;