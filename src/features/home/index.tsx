import React from 'react';
import classNames from 'classnames';
import { NamedLink } from '@routes/config';
import routeNames from '@features/profile/route.names';
import stylesEle from '@styles/_elements.scss';
import stylesHome from './home.scss';

const Home: React.FC = () => (
    <>
        <div>Home</div>
        <NamedLink
            to={ routeNames.profile }
            className={ classNames(stylesEle.textUppercase, stylesHome.home) }
        >
            Go to Profile
        </NamedLink>
    </>
);

export default Home;
