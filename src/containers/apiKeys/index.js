import React from "react";
import {
    Button,
    Table,
    Card
} from "react-bootstrap";
import {
    connect
} from "react-redux";
import PartnerAPIKeyService from "./../../services/PartnerAPIKeyService";

import {
    API_KEYS_LOADING,
    API_KEYS_DATA,
    API_KEYS_ERROR,
    API_KEYS_GENERATING,
    API_KEYS_ADD,
    API_KEYS_DELETE
} from "../../reducers/apiKeys";
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import PropTypes from 'prop-types';

class ApiKeys extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        const { dispatch, user } = this.props;

        dispatch({ type: API_KEYS_LOADING, isLoading: true });
        dispatch(showLoading());

        PartnerAPIKeyService.getApiKeys(user.id)
            .then(result => {
                if (result.apiKeys) {
                    let keys = result.apiKeys.filter(k => {
                        if (k.deletedAt === null) {
                            return k;
                        }
                    });
                    dispatch({ type: API_KEYS_DATA, data: keys });
                }
            }).catch(error => {
                dispatch({ type: API_KEYS_ERROR, error: error.toString() });
            }).finally(() => {
                dispatch({ type: API_KEYS_LOADING, isLoading: false });
                dispatch(hideLoading());
            });
    }

    handleApiKeyGeneration () {
        const { dispatch, user } = this.props;

        dispatch({ type: API_KEYS_GENERATING, isGenerating: true });
        dispatch(showLoading());

        PartnerAPIKeyService.generateApiKey(user.id)
            .then(result => {
                dispatch({ type: API_KEYS_ADD, newKey: result.apiKey });
            }).catch(error => {
                dispatch({ type: API_KEYS_ERROR, error: error.toString() });
            }).finally(() => {
                dispatch({ type: API_KEYS_GENERATING, isGenerating: false });
                dispatch(hideLoading());
            });
    }

    handleApiKeyDeletion (key) {
        const { dispatch, user } = this.props;
        dispatch(showLoading());

        PartnerAPIKeyService.deleteApiKey(user.id, key.id)
            .then(result => {
                dispatch({ type: API_KEYS_DELETE, deletedKey: key });
            }).catch(error => {
                dispatch({ type: API_KEYS_ERROR, error: error.toString() });
            }).finally(() => {
                dispatch(hideLoading());
            });
    }

    render () {
        const headings = ["API Keys", "Actions"];
        const { apiKeys } = this.props;
        return (
            <Card>
                <h1>Api Keys</h1>
                <Button variant="primary" type="submit" onClick={this.handleApiKeyGeneration.bind(this)}
                    disabled={apiKeys.isGenerating}>
                    Generate
                </Button>
                <Table>
                    <thead>
                        <tr>
                            {headings.map(h => (<th key={h}>{h}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {apiKeys.data.map(apiKey => (
                            <tr key={apiKey.apiKey}>
                                <td >{apiKey.apiKey}</td>
                                <td onClick={this.handleApiKeyDeletion.bind(this, apiKey)}>Delete</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        );
    }
}

ApiKeys.propTypes = {
    apiKeys: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        ...state.appState,
        apiKeys: state.apiKeys
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiKeys);
