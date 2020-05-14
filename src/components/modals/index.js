import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import ErrorMessage from './ErrorMessage';

const mapModals = {
  add: AddChannel,
  rename: RenameChannel,
  remove: RemoveChannel,
  error: ErrorMessage,
};

const getModal = (type) => mapModals[type];

export default getModal;
