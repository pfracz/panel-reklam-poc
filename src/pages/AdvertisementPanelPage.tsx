import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AdList from '../components/AdList';
import CreateAdvertisementModal from '../components/CreateAdvertisementModal';
import AdListToolbar from '../components/AdListToolbar';
import Advertisement from '../types/Advertisement';
import {
    createAdvertisement,
    editAdvertisement,
    getAdvertisement,
    getAdvertisements,
    removeAdvertisement,
    resetAdvertisements,
    saveAdvertisements,
} from '../helpers/advertisements';
import EditAdvertisementModal from '../components/EditAdvertisementModal';
import PreviewAdvertisementModal from '../components/PreviewAdvertisementModal';

function AdvertisementPanelPage() {
    const [advertisementList, setAdvertisementList] = useState<Advertisement[]>([]);
    const [selectedAdvertisement, setSelectedAdvertisement] = useState<Advertisement | null>(null);

    const [showAdvertisementCreate, setShowAdvertisementCreate] = useState(false);
    const [showAdvertisementEdit, setShowAdvertisementEdit] = useState(false);
    const [showAdvertisementPreview, setShowAdvertisementPreview] = useState(false);

    useEffect(() => {
        setAdvertisementList(getAdvertisements());
    }, []);

    useEffect(() => {
        saveAdvertisements(advertisementList);
    }, [advertisementList]);

    const handleAdvertisementPreview = (id: string) => {
        const advertisement = getAdvertisement(id);

        if (advertisement) {
            setSelectedAdvertisement(advertisement);
            setShowAdvertisementPreview(true);
            console.log('preview');
        }
    };

    const handleAdvertisementCreate = (name: string, content: string, startDate: Date, endDate: Date) => {
        createAdvertisement(name, content, startDate, endDate);
        setShowAdvertisementCreate(false);
        setAdvertisementList(getAdvertisements());
    };

    const handleAdvertisementEdit = (id: string) => {
        const advertisement = getAdvertisement(id);

        if (advertisement) {
            setSelectedAdvertisement(advertisement);
            setShowAdvertisementEdit(true);
        }
    };

    const handleAdvertisementEditSave = (advertisement: Advertisement) => {
        editAdvertisement(
            advertisement.id,
            advertisement.name,
            advertisement.content,
            advertisement.startDate,
            advertisement.endDate
        );

        setShowAdvertisementEdit(false);
        setAdvertisementList(getAdvertisements());
    };

    const handleAdvertisementRemove = (id: string) => {
        removeAdvertisement(id);
        setAdvertisementList(getAdvertisements());
    };

    const handleReset = () => {
        resetAdvertisements();
        setAdvertisementList(getAdvertisements());
    };

    return (
        <>
            <section className="w-screen h-screen flex flex-col items-center justify-center px-5">
                <article className="w-full max-w-[700px] flex flex-col">
                    <div>
                        <AdListToolbar onCreate={() => setShowAdvertisementCreate(true)} />
                        <AdList
                            advertisements={advertisementList}
                            onPreview={handleAdvertisementPreview}
                            onEdit={handleAdvertisementEdit}
                            onRemove={handleAdvertisementRemove}
                        />
                    </div>

                    <div className="flex justify-between mt-5">
                        <Button component={Link} to="/advertisements/new" variant="text">
                            Dodaj z osobnej strony
                        </Button>

                        <Button variant="text" onClick={handleReset}>
                            Zresetuj dane
                        </Button>
                    </div>
                </article>
            </section>

            <CreateAdvertisementModal
                open={showAdvertisementCreate}
                onClose={() => setShowAdvertisementCreate(false)}
                onSave={handleAdvertisementCreate}
            />

            {selectedAdvertisement && (
                <>
                    <EditAdvertisementModal
                        open={showAdvertisementEdit}
                        onClose={() => setShowAdvertisementEdit(false)}
                        onSave={handleAdvertisementEditSave}
                        advertisement={selectedAdvertisement}
                    />
                    <PreviewAdvertisementModal
                        open={showAdvertisementPreview}
                        onClose={() => setShowAdvertisementPreview(false)}
                        advertisement={selectedAdvertisement}
                    />
                </>
            )}
        </>
    );
}

export default AdvertisementPanelPage;
