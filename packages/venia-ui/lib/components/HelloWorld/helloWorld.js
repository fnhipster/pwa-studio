import React, { useEffect, useMemo } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useTypePolicies } from '@magento/peregrine';

const GET_TEXT = gql`
    query getText {
        message @client
    }
`;

const HelloWorld = () => {
    useTypePolicies({
        Query: {
            fields: {
                message: {
                    read() {
                        return 'Hello World';
                    }
                }
            }
        }
    });

    const [runQuery, { data, loading, error }] = useLazyQuery(GET_TEXT);

    useEffect(() => {
        runQuery();
    }, [runQuery]);

    useEffect(() => {
        console.log(`Received`);
        console.log(`DATA: ${JSON.stringify(data, null, 2)}`);
        console.log(`LOADING: ${loading}`);
        console.log(`ERROR: ${error}`);
    }, [data, error, loading]);

    const text = useMemo(() => {
        return data ? data.message : '';
    }, [data]);

    return <div>{text}</div>;
};

export default HelloWorld;
