import React from 'react';
import { NamedLink } from '@routes/config';
import routeNames from '@features/home/route.names';

const Profile: React.FC = () => (
    <NamedLink to={ routeNames.home }>Go to Home</NamedLink>
);

export default Profile;
