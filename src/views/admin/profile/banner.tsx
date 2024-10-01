import { KEY_USER_COOKIE } from '@/variables/constants';
import VBanner from '@/components/views/profiles/customer/v-banner';
import Cookies from 'js-cookie';

const Banner = () => {
	let user: any = Cookies.get(KEY_USER_COOKIE);
	user = user ? JSON.parse(user) : {};

	return <VBanner user={user} />;
};

export default Banner;
