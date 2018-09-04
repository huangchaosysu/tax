import React from 'react';
import { connect } from 'dva';
import Tax from '../components/Example'

function IndexPage() {
    return (
        <Tax></Tax>
    );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
