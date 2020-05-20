import faker from 'faker';
import Cookies from 'js-cookie';

export default () => {
  const userName = faker.name.findName();
  Cookies.set('username', userName);
  return userName;
};
