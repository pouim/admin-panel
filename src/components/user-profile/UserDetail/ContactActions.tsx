import React from 'react';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AppsStarredIcon from '../../../@crema/core/AppsStarredIcon';
import {makeStyles} from '@material-ui/core/styles';



const useStyles = makeStyles(() => ({
  pointer: {
    cursor: 'pointer',
  },
}));

const ContactActions: React.FC<any> = ({
  onOpenEditUser,
}) => {
  const classes = useStyles();
  return (
    <Box display='flex' justifyContent='flex-end' alignItems='center'>
      <Box ml={2}>
        <EditIcon
          className={classes.pointer}
          onClick={onOpenEditUser}
        />
      </Box>
    </Box>
  );
};

export default ContactActions;
