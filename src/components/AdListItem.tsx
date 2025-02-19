import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from '@material-ui/icons';
import { createStyles, makeStyles, Tooltip } from '@material-ui/core';

type Props = {
    id: string;
    name: string;
    onClick: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            height: '50px',
        },
    })
);

export default function AdListItem({ id, name, onClick, onEdit, onDelete }: Props) {
    const classes = useStyles();

    return (
        <ListItem dense button className={classes.root} onClick={() => onClick(id)}>
            <ListItemText id={id} primary={name} />
            <ListItemSecondaryAction>
                <Tooltip title="Edytuj" placement="right">
                    <IconButton edge="end" aria-label="edit" onClick={() => onEdit(id)}>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Usuń" placement="right">
                    <IconButton edge="end" aria-label="delete" onClick={() => onDelete(id)}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
