import { IconButton, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';

type Props = {
    onCreate: () => void;
};

export default function AdListToolbar({ onCreate }: Props) {
    return (
        <div className="w-full bg-[#fafafa] flex flex-col justify-center items-start">
            <div>
                <Tooltip title="Dodaj" placement="top">
                    <IconButton edge="end" aria-label="add" onClick={onCreate}>
                        <Add />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}
