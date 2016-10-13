import enhancer from './store-enhancer';
import reducer from './reducer';
import middleware from './middleware';

import createLocationParser from './parsers/locationToState';
import createRouteParser from './parsers/routeToLocation';
import { DEFAULT_SLICE } from './constants';

const createRouter = ({
    history,
    routes,
    slice = DEFAULT_SLICE,
    immutable = false
}) => {
    const locationParser = createLocationParser(routes);
    const routeParser = createRouteParser(routes);

    return {
        reducer: reducer({ locationParser, immutable }),
        enhancer: enhancer({ history, slice, locationParser, immutable }),
        middleware: middleware({ history, routeParser })
    };
};

export default createRouter;