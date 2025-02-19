import AdListItem from './AdListItem';
import List from '@material-ui/core/List';
import { createStyles, makeStyles } from '@material-ui/core';
import Advertisement from '../types/Advertisement';

type Props = {
    advertisements: Advertisement[];
    onPreview: (id: string) => void;
    onEdit: (id: string) => void;
    onRemove: (id: string) => void;
};

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            backgroundColor: '#fafafa',
        },
    })
);

export default function AdList({ advertisements, onPreview, onEdit, onRemove }: Props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {advertisements.map((ad: Advertisement) => {
                return (
                    <AdListItem
                        key={ad.id}
                        id={ad.id}
                        name={ad.name}
                        onClick={onPreview}
                        onEdit={onEdit}
                        onDelete={onRemove}
                    />
                );
            })}
        </List>
    );
}
