import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const mapModals = {
  add: AddChannel,
  rename: RenameChannel,
  remove: RemoveChannel,
};

const getModal = (type) => mapModals[type];

export default getModal;
